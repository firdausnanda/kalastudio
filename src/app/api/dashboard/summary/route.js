import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { db } from '@/db';
import { users, userDetails } from '@/db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback_kalastudio_secret_key_change_me_in_prod'
);

export async function GET(request) {
  try {
    // 1. Verifikasi Session Internal
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

    // 2. Ambil data user beserta token dan nomor WA
    const userRecord = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    const detailRecord = await db.select().from(userDetails).where(eq(userDetails.userId, userId)).limit(1);

    if (userRecord.length === 0) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    const token = userRecord[0].token;
    const phone = detailRecord.length > 0 ? detailRecord[0].phone : null;

    if (!token || !phone) {
      return NextResponse.json({
        error: 'Data token eksternal atau nomor WA belum tersedia. Pastikan profil sudah dilengkapi.'
      }, { status: 400 });
    }

    // 4. Fetch API Eksternal
    const APP_SERVICE = process.env.APP_SERVICE || 'https://kalastudio-prod.up.railway.app';
    const externalUrl = `${APP_SERVICE}/api/transaksi/${phone}/summary`;

    const externalRes = await fetch(externalUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!externalRes.ok) {
      const errorText = await externalRes.text();
      console.warn('Gagal fetch summary eksternal:', externalRes.status, errorText);
      return NextResponse.json({ error: 'Gagal mengambil data summary dari server eksternal' }, { status: externalRes.status });
    }

    const externalData = await externalRes.json();

    // Kembalikan data as-is untuk diproses di client
    return NextResponse.json({ success: true, data: externalData });

  } catch (error) {
    console.error('API /dashboard/summary error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
