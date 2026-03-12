import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback_kalastudio_secret_key_change_me_in_prod'
);

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('kalastudio_session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
    }

    let session;
    try {
      const { payload } = await jwtVerify(sessionToken, JWT_SECRET);
      session = payload;
    } catch {
      return NextResponse.json({ error: 'Session tidak valid' }, { status: 401 });
    }

    const userId = session.id;
    const { password_lama, password_baru } = await request.json();

    if (!password_lama || !password_baru) {
      return NextResponse.json({ error: 'Password lama dan baru wajib diisi' }, { status: 400 });
    }

    // Ambil token eksternal user
    const userRecord = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (userRecord.length === 0 || !userRecord[0].token) {
      return NextResponse.json({ error: 'Token eksternal tidak ditemukan' }, { status: 404 });
    }

    const token = userRecord[0].token;
    const APP_SERVICE = process.env.APP_SERVICE || 'https://kalastudio-prod.up.railway.app';

    const externalRes = await fetch(`${APP_SERVICE}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password_lama, password_baru }),
    });

    if (!externalRes.ok) {
      const errorData = await externalRes.json();
      return NextResponse.json({ 
        error: errorData.message || 'Gagal mengubah password di server eksternal' 
      }, { status: externalRes.status });
    }

    return NextResponse.json({ success: true, message: 'Password berhasil diubah' });

  } catch (error) {
    console.error('API /dashboard/user/change-password error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
