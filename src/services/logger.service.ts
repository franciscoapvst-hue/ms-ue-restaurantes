import { appendFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { supabase } from '../config/database';

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  service: string;
  level: LogLevel;
  event: string;
  metadata?: Record<string, unknown>;
  ip?: string;
  duration_ms?: number;
}

const LOG_DIR = join(process.cwd(), 'logs');
const LOG_FILE = join(LOG_DIR, 'app.log');

mkdirSync(LOG_DIR, { recursive: true });

function writeLocalLog(entry: LogEntry): void {
  const line = JSON.stringify({
    timestamp: new Date().toISOString(),
    ...entry,
  });
  appendFileSync(LOG_FILE, line + '\n');
}

export async function log(entry: LogEntry): Promise<void> {
  writeLocalLog(entry);

  try {
    const { error } = await supabase.from('logs').insert({
      service: entry.service,
      level: entry.level,
      event: entry.event,
      metadata: entry.metadata ?? null,
      ip: entry.ip ?? null,
      duration_ms: entry.duration_ms ?? null,
    });
    if (error) throw error;
  } catch (err) {
    writeLocalLog({ service: entry.service, level: 'error', event: 'supabase-log-failed', metadata: { err: String(err) } });
  }
}
