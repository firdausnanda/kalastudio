import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { db } from '@/db';
import { userDetails, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback_kalastudio_secret_key_change_me_in_prod'
);

export async function POST(request) {
  try {
    // 1. Verifikasi session
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

    // 2. Ambil data dari body
    const body = await request.json();
    const { businessName, businessType, phone, address } = body;

    if (!businessName || !businessType) {
      return NextResponse.json({ error: 'Nama dan jenis bisnis wajib diisi' }, { status: 400 });
    }

    const userId = session.id;

    // 3. Cek apakah sudah ada baris user_details
    const existing = await db.select().from(userDetails).where(eq(userDetails.userId, userId)).limit(1);

    if (existing.length > 0) {
      // Update
      await db.update(userDetails)
        .set({ businessName, businessType, phone: phone || null, address: address || null })
        .where(eq(userDetails.userId, userId));
    } else {
      // Insert baru
      await db.insert(userDetails).values({
        id: crypto.randomUUID(),
        userId,
        businessName,
        businessType,
        phone: phone || null,
        address: address || null,
      });
    }

    // 4. Kirim data ke endpoint eksternal, lalu simpan token ke tabel users
    try {
      const externalPayload = {
        nama: session.name || '',
        nama_bisnis: businessName,
        email: session.email || '',
        password: 'password123',
        nomor_wa: phone || '',
        kategori_bisnis: businessType,
        plan: 'Trial',
      };

      const APP_SERVICE = process.env.APP_SERVICE || 'https://kalastudio-prod.up.railway.app';
      const externalRes = await fetch(`${APP_SERVICE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(externalPayload),
      });

      if (externalRes.ok) {
        const externalData = await externalRes.json();
        console.log('[External API Response]', JSON.stringify(externalData, null, 2));
        const externalToken = externalData?.token || externalData?.data?.token || null;
        console.log('[External Token]', externalToken);

        if (externalToken) {
          await db.update(users)
            .set({ token: externalToken })
            .where(eq(users.id, userId));
        }
      } else {
        const errText = await externalRes.text();
        console.warn('External register warning. Attempting token refresh (login)...', externalRes.status, errText);

        // Jika registrasi gagal (mungkin user sudah ada), coba login untuk "refresh" token
        const loginRes = await fetch(`${APP_SERVICE}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: session.email,
            password: 'password123', // Default password used in register
          }),
        });

        if (loginRes.ok) {
          const loginData = await loginRes.json();
          const refreshedToken = loginData?.token || loginData?.data?.token || null;
          if (refreshedToken) {
            await db.update(users)
              .set({ token: refreshedToken })
              .where(eq(users.id, userId));
          }
        } else {
          const loginErrText = await loginRes.text();
          console.error('Failed to refresh token via login:', loginRes.status, loginErrText);
        }
      }
    } catch (extErr) {
      console.warn('Gagal mengirim ke endpoint eksternal:', extErr.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /profil/detail error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
