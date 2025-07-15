import { createClient } from '@supabase/supabase-js';
import { envResult } from './env';

const supabaseUrl = envResult.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envResult.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
