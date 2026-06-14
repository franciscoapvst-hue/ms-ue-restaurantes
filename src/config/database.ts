import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = (process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY)!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function initDatabase() {
  // Verifica la conexión insertando y comprobando acceso a la tabla logs
  const { error } = await supabase.from('logs').select('id').limit(1);
  if (error && error.code !== 'PGRST116') {
    throw new Error(`Supabase connection error: ${error.message}`);
  }
  console.log('Conexión a Supabase lista');
}
