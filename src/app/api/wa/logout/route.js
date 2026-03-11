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

    const userRecord = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (userRecord.length === 0) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    const token = userRecord[0].token;

    if (!token) {
      return NextResponse.json({ error: 'Data token eksternal belum tersedia.' }, { status: 400 });
    }

    const APP_SERVICE = process.env.APP_SERVICE || 'https://kalastudio-prod.up.railway.app';
    const externalUrl = `${APP_SERVICE}/api/wa/logout`;

    const externalRes = await fetch(externalUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!externalRes.ok) {
      const errorText = await externalRes.text();
      console.warn('Gagal fetch WA logout eksternal:', externalRes.status, errorText);
      return NextResponse.json({ error: 'Gagal melakukan logout di server eksternal' }, { status: externalRes.status });
    }

    const externalData = await externalRes.json();
    return NextResponse.json({ success: true, data: externalData });

  } catch (error) {
    console.error('API /wa/logout error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
