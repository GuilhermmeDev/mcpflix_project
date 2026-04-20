import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
});

const result = clientEnvSchema.safeParse(process.env);

if (!result.success) {
  throw new Error('Invalid client environment variables');
}

export const clientEnv = result.data;
