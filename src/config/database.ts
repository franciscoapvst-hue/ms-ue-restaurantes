import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.SUPABASE_DB_HOST,
  port: Number(process.env.SUPABASE_DB_PORT) || 5432,
  database: process.env.SUPABASE_DB_NAME,
  user: process.env.SUPABASE_DB_USER,
  password: process.env.SUPABASE_DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});

export async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS logs (
      id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
      timestamp   TIMESTAMPTZ DEFAULT NOW(),
      service     VARCHAR(50)  NOT NULL,
      level       VARCHAR(10)  NOT NULL,
      event       VARCHAR(100) NOT NULL,
      metadata    JSONB,
      ip          VARCHAR(45),
      duration_ms INTEGER
    )
  `);
  console.log('Tabla logs lista en Supabase');
}
