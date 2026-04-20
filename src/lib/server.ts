import { z } from 'zod';

const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().startsWith('re_'),
  ADMIN_EMAIL: z.string().email(),
});

const result = serverEnvSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ Invalid server env:', result.error.format());
  throw new Error('Invalid server environment variables');
}

export const serverEnv = result.data;
