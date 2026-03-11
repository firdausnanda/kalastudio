import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { db } from '@/db';
import { users, roles, userDetails } from '@/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

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
    } else {
      const byEmail = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (byEmail[0]) {
        // User sudah ada via email/password → hubungkan akun Google-nya
        user = byEmail[0];
        await db.update(users)
          .set({ googleId, avatar: avatar || user.avatar })
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

      const newUserId = crypto.randomUUID();
      await db.insert(users).values({
        id: newUserId,
        name,
        email,
        googleId,
        avatar,
        roleId: userRole.id,
        // password: null — user Google tidak punya password
      });

      user = { id: newUserId, name, email, roleId: userRole.id, avatar };
    }

    // 5. Buat JWT session (sama seperti login email/password)
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      avatar: user.avatar,
    };

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(JWT_SECRET);

    const cookieStore = await cookies();
    cookieStore.set('kalastudio_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 hari
    });

    // 6. Hit endpoint eksternal login & simpan token-nya
    try {
      const APP_SERVICE = process.env.APP_SERVICE || 'https://kalastudio-prod.up.railway.app';
      const externalLoginRes = await fetch(`${APP_SERVICE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: user.email, password: 'password123' }),
      });

      if (externalLoginRes.ok) {
        const externalData = await externalLoginRes.json();
        console.log('[Google External Login Response]', JSON.stringify(externalData, null, 2));
        const externalToken = externalData?.token || externalData?.data?.token || null;
        console.log('[Google External Token]', externalToken);

        if (externalToken) {
          await db.update(users).set({ token: externalToken }).where(eq(users.id, user.id));
        }
      } else {
        const errText = await externalLoginRes.text();
        console.warn('[Google External Login Warning]', externalLoginRes.status, errText);
      }
    } catch (extErr) {
      console.warn('[Google External Login Error]', extErr.message);
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
