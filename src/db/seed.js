import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from './index.js';
import { users, roles } from './schema.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // 1. Seed Roles
    const adminRoleId = crypto.randomUUID();
    const userRoleId = crypto.randomUUID();

    // Check if roles exist
    const existingRoles = await db.select().from(roles);

    if (existingRoles.length === 0) {
      console.log('Inserting default roles...');
      await db.insert(roles).values([
        { id: adminRoleId, name: 'ADMIN' },
        { id: userRoleId, name: 'USER' }
      ]);
      console.log('✅ Roles inserted successfully.');
    } else {
      console.log('ℹ️ Roles already exist. Skipping role insertion.');
    }

    // 2. Seed Admin User
    const existingUsers = await db.select().from(users);

    if (existingUsers.length === 0) {
      console.log('Inserting default admin user...');

      // Get the admin role ID that was just inserted, or find it if it existed
      const allRoles = await db.select().from(roles);
      const adminRole = allRoles.find(r => r.name === 'ADMIN');

      if (!adminRole) {
        throw new Error('Admin role not found!');
      }

      // Hash password using bcryptjs
      const hashedPassword = await bcrypt.hash('password123', 10);

      await db.insert(users).values({
        id: crypto.randomUUID(),
        name: 'Admin KalaStudio',
        username: 'admin',
        email: 'admin@kalastudio.com',
        password: hashedPassword,
        roleId: adminRole.id,
      });
      console.log('✅ Admin user inserted successfully.');
    } else {
      console.log('ℹ️ Users already exist. Skipping user insertion.');
    }

    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } process.exit(0);
}

seed();
