import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const db = drizzle(sql);

export async function executeQuery(query: string, values: any[] = []) {
  try {
    const result = await sql.query(query, values);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
} 