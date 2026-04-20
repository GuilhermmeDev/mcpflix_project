import { createClient } from '@supabase/supabase-js';
import { clientEnv } from './client';

const supabaseUrl = clientEnv.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
