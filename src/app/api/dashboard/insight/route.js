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

    // 2. Ambil data user (Token & Nomor WA)
    const userRecord = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    const detailRecord = await db.select().from(userDetails).where(eq(userDetails.userId, userId)).limit(1);

    if (userRecord.length === 0) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    const token = userRecord[0].token;
    const phone = detailRecord.length > 0 ? detailRecord[0].phone : null;

    if (!token || !phone) {
      return NextResponse.json({
        error: 'Data profil (token/WA) belum lengkap.'
      }, { status: 400 });
    }

    // 3. Konfigurasi Endpoint Insight & Anomali
    const APP_SERVICE = process.env.APP_SERVICE || 'https://kalastudio-prod.up.railway.app';
    // URL disesuaikan ke endpoint /api/anomali/{phone}/insight
    const externalUrl = `${APP_SERVICE}/api/anomali/${phone}/insight`;

    // 4. Fetch ke API Eksternal
    const externalRes = await fetch(externalUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 3600 } // Opsional: Cache selama 1 jam
    });

    if (!externalRes.ok) {
      const errorText = await externalRes.text();
      console.error('Gagal fetch insight:', externalRes.status, errorText);
      return NextResponse.json(
        { error: 'Gagal mengambil analisis data dari server AI' },
        { status: externalRes.status }
      );
    }

    const dataInsight = await externalRes.json();

    // 5. Kembalikan data (Struktur: periode, anomali[], insight[])
    return NextResponse.json({
      success: true,
      ...dataInsight
    });

  } catch (error) {
    console.error('API /dashboard/insight error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan sistem internal' }, { status: 500 });
  }
}