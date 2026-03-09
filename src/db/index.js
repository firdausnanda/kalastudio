import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema.js';

// Singleton connection pool for Next.js to prevent connection exhaustion
const poolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT || 3306),
};

console.log('--- DB Config Debug ---');
console.log('HOST:', process.env.DB_HOST);
console.log('USER:', process.env.DB_USERNAME);
console.log('DB:', process.env.DB_DATABASE);
if (!process.env.DB_HOST) console.error('❌ DB_HOST IS MISSING!');
console.log('-----------------------');

// Use globalThis to keep the connection across HMR (Hot Module Replacement)
const globalForDb = globalThis;
const poolConnection = globalForDb.poolConnection ?? mysql.createPool(poolOptions);

if (process.env.NODE_ENV !== 'production') {
  globalForDb.poolConnection = poolConnection;
}

export const db = drizzle(poolConnection, { schema, mode: 'default' });
