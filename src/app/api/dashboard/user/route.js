import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { db } from '@/db';
import { users, userDetails } from '@/db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback_kalastudio_secret_key_change_me_in_prod'
);

export async function GET() {
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

    // Ambil token dan phone
    const userRecord = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    const detailRecord = await db.select().from(userDetails).where(eq(userDetails.userId, userId)).limit(1);

    if (userRecord.length === 0) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    const token = userRecord[0].token;
    const phone = detailRecord.length > 0 ? detailRecord[0].phone : null;

    if (!token || !phone) {
      return NextResponse.json({
        error: 'Data token eksternal atau nomor WA belum tersedia.'
      }, { status: 400 });
    }

    const APP_SERVICE = process.env.APP_SERVICE || 'https://kalastudio-prod.up.railway.app';
    const externalUrl = `${APP_SERVICE}/api/users/${phone}`;

    const externalRes = await fetch(externalUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!externalRes.ok) {
      return NextResponse.json({ error: 'Gagal mengambil data user dari server eksternal' }, { status: externalRes.status });
    }

    const externalData = await externalRes.json();
    return NextResponse.json({ success: true, data: externalData });

  } catch (error) {
    console.error('API /dashboard/user error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
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
    const body = await request.json();

    // Ambil token dan phone
    const userRecord = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    const detailRecord = await db.select().from(userDetails).where(eq(userDetails.userId, userId)).limit(1);

    if (userRecord.length === 0) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    const token = userRecord[0].token;
    const phone = detailRecord.length > 0 ? detailRecord[0].phone : null;

    if (!token || !phone) {
      return NextResponse.json({
        error: 'Data token eksternal atau nomor WA belum tersedia.'
      }, { status: 400 });
    }

    const APP_SERVICE = process.env.APP_SERVICE || 'https://kalastudio-prod.up.railway.app';
    const externalUrl = `${APP_SERVICE}/api/admin/user/${phone}`;

    const externalRes = await fetch(externalUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!externalRes.ok) {
      const errorData = await externalRes.json();
      return NextResponse.json({ error: errorData.message || 'Gagal memperbarui data user ke server eksternal' }, { status: externalRes.status });
    }

    const externalData = await externalRes.json();
    return NextResponse.json({ success: true, data: externalData });

  } catch (error) {
    console.error('API /dashboard/user (POST) error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
