import { db } from './src/db/index.js';
import { users } from './src/db/schema.js';
import { eq } from 'drizzle-orm';

async function testConnection() {
  console.log('--- Database Diagnostic Start ---');
  console.log('Testing connection to:', process.env.DB_HOST);

  try {
    const result = await db.select().from(users).where(eq(users.email, 'admin@kalastudio.com')).limit(1);
    console.log('✅ Query Successful!');
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Query Failed!');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    if (error.cause) {
      console.error('Error Cause:', error.cause.message || error.cause);
      if (error.cause.code) console.error('Cause Code:', error.cause.code);
    }
  }
  console.log('--- Database Diagnostic End ---');
  process.exit(0);
}

testConnection();
