import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { db } from '@/db';
import { users, roles, userDetails } from '@/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state'); // 'login' atau 'register'
  const error = searchParams.get('error');

  // Jika user membatalkan di Google
  if (error || !code) {
    const redirectTo = state === 'register' ? '/register' : '/login';
    return Response.redirect(`${APP_URL}${redirectTo}?error=google_cancelled`);
  }

  try {
    // 1. Tukar authorization code dengan access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${APP_URL}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      throw new Error('Gagal mendapatkan access token dari Google');
    }

    // 2. Ambil info user dari Google
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await profileRes.json();
    const { id: googleId, email, name, picture: avatar } = profile;

    if (!email) {
      throw new Error('Tidak dapat mengambil email dari akun Google');
    }

    // 3. Cari user berdasarkan googleId atau email
    let user = null;

    const byGoogleId = await db.select().from(users).where(eq(users.googleId, googleId)).limit(1);
    if (byGoogleId[0]) {
      user = byGoogleId[0];
      // Jika user Google sebelumnya tidak memiliki password tersimpan, update dan berikan default hash password
      if (!user.password) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await db.update(users).set({ password: hashedPassword }).where(eq(users.id, user.id));
        user.password = hashedPassword;
      }
    } else {
      const byEmail = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (byEmail[0]) {
        // User sudah ada via email/password → hubungkan akun Google-nya
        user = byEmail[0];
        const updateData = { googleId, avatar: avatar || user.avatar };

        // Cek jika password kosong set password default
        if (!user.password) {
          const hashedPassword = await bcrypt.hash('password123', 10);
          updateData.password = hashedPassword;
          user.password = hashedPassword;
        }

        await db.update(users)
          .set(updateData)
          .where(eq(users.id, user.id));
      }
    }

    // 4. Jika user belum ada → buat akun baru
    if (!user) {
      const roleResult = await db.select().from(roles).where(eq(roles.name, 'USER')).limit(1);
      const userRole = roleResult[0];

      if (!userRole) {
        throw new Error('Role USER tidak ditemukan di database');
      }

      const hashedPassword = await bcrypt.hash('password123', 10);
      const newUserId = crypto.randomUUID();
      await db.insert(users).values({
        id: newUserId,
        name,
        email,
        googleId,
        avatar,
        roleId: userRole.id,
        password: hashedPassword, // password default ketika register
      });

      user = { id: newUserId, name, email, roleId: userRole.id, avatar, password: hashedPassword };
    }

    // 5. Buat JWT session (sama seperti login email/password)
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      avatar: user.avatar,
    };

    const internalToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(JWT_SECRET);

    const cookieStore = await cookies();
    cookieStore.set('kalastudio_session', internalToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 hari
    });

    // 6. Hit endpoint eksternal login untuk mendapatkan token
    try {
      const APP_SERVICE = process.env.APP_SERVICE || 'https://kalastudio-prod.up.railway.app';
      const externalLoginRes = await fetch(`${APP_SERVICE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });

      if (externalLoginRes.ok) {
        const externalData = await externalLoginRes.json();
        console.log('[Google External Login Response]', JSON.stringify(externalData, null, 2));
        const externalToken = externalData?.token || externalData?.data?.token || null;
        console.log('[Google External Token]', externalToken);

        if (externalToken) {
          // Update database lokal dengan token eksternal agar bisa digunakan oleh /api/dashboard/transaksi
          await db.update(users).set({ token: externalToken }).where(eq(users.id, user.id));
        }
      } else {
        const errText = await externalLoginRes.text();
        console.warn('[Google External Login Warning] User potentially not registered. Attempting registration...', externalLoginRes.status, errText);
      }
    } catch (extErr) {
      console.warn('[Google External Auth Error]', extErr.message);
    }

    // Cek apakah profil bisnis sudah dilengkapi
    const detailResult = await db.select().from(userDetails).where(eq(userDetails.userId, user.id)).limit(1);
    const profileComplete = detailResult.length > 0;

    const redirectPath = profileComplete ? '/dashboard' : '/lengkapi-profil';
    return Response.redirect(`${APP_URL}${redirectPath}`);

  } catch (err) {
    console.error('Google OAuth callback error:', err);
    const redirectTo = state === 'register' ? '/register' : '/login';
    return Response.redirect(`${APP_URL}${redirectTo}?error=google_failed`);
  }
}
