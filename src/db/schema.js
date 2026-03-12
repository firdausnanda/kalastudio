import { mysqlTable, varchar, int, timestamp, text, float } from 'drizzle-orm/mysql-core';

// Roles Table
export const roles = mysqlTable('roles', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(), // e.g., 'ADMIN', 'USER'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Example Users Table
export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  username: varchar('username', { length: 50 }).unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }),
  googleId: varchar('google_id', { length: 255 }).unique(),
  avatar: text('avatar'),
  token: text('token'),
  tokenPayment: text('token_payment'),
  roleId: varchar('role_id', { length: 36 }).references(() => roles.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User Details Table
export const userDetails = mysqlTable('user_details', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).references(() => users.id).notNull().unique(),
  phone: varchar('phone', { length: 50 }),
  address: text('address'),
  businessName: varchar('business_name', { length: 255 }),
  businessType: varchar('business_type', { length: 150 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

// Example Transactions Table
export const transactions = mysqlTable('transactions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'income', 'expense'
  amount: float('amount').notNull(),
  category: varchar('category', { length: 100 }),
  note: text('note'),
  date: timestamp('date').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
