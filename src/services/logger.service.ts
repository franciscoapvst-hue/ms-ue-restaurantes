import { pool } from '../config/database';

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  service: string;
  level: LogLevel;
  event: string;
  metadata?: Record<string, unknown>;
  ip?: string;
  duration_ms?: number;
}

export async function log(entry: LogEntry): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO logs (service, level, event, metadata, ip, duration_ms)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        entry.service,
        entry.level,
        entry.event,
        entry.metadata ? JSON.stringify(entry.metadata) : null,
        entry.ip ?? null,
        entry.duration_ms ?? null,
      ]
    );
  } catch (err) {
    // El log nunca debe romper el flujo principal
    console.error('Error al guardar log:', err);
  }
}
