'use server';

import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback_kalastudio_secret_key_change_me_in_prod'
);

import { roles } from '@/db/schema';
import crypto from 'crypto';

export async function loginAction(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const remember = formData.get('remember');

  if (!email || !password) {
    return { error: 'Email dan kata sandi wajib diisi' };
  }

  try {
    // Cari user berdasarkan email
    const userResult = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = userResult[0];

    if (!user) {
      return { error: 'Email tidak ditemukan' };
    }

    // Validasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: 'Kata sandi salah' };
    }

    // JWT Payload
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      avatar: user.avatar,
    };

    // Buat JWT Session Token
    const expirationTime = remember ? '30d' : '1d';
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expirationTime)
      .sign(JWT_SECRET);

    // Set HTTP-Only Cookie
    const cookieStore = await cookies();
    cookieStore.set('kalastudio_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 hari atau 1 hari
    });

    return { success: true };
  } catch (error) {
    console.error('Login action error:', error);
    return { error: 'Terjadi kesalahan pada server. Silakan coba lagi.' };
  }
}

export async function registerAction(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const terms = formData.get('terms');

  if (!name || !email || !password) {
    return { error: 'Semua bidang wajib diisi' };
  }

  if (!terms) {
    return { error: 'Anda harus menyetujui syarat dan ketentuan' };
  }

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser[0]) {
      return { error: 'Email sudah terdaftar' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cari role 'USER'
    const roleResult = await db.select().from(roles).where(eq(roles.name, 'USER')).limit(1);
    const userRole = roleResult[0];

    if (!userRole) {
      return { error: 'Konfigurasi sistem salah (Role USER tidak ditemukan)' };
    }

    // Simpan user baru
    const userId = crypto.randomUUID();
    await db.insert(users).values({
      id: userId,
      name,
      email,
      password: hashedPassword,
      roleId: userRole.id,
    });

    // Otomatis login setelah register
    const payload = {
      id: userId,
      name,
      email,
      roleId: userRole.id,
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
      maxAge: 60 * 60 * 24,
    });

    return { success: true };
  } catch (error) {
    console.error('Register action error:', error);
    return { error: 'Terjadi kesalahan saat pendaftaran. Silakan coba lagi.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('kalastudio_session');
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('kalastudio_session')?.value;

  if (!sessionToken) return null;

  try {
    const { payload } = await jwtVerify(sessionToken, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}
