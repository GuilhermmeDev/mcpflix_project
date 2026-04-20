import { z } from 'zod';

const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().startsWith('re_'),
  ADMIN_EMAIL: z.string().email(),
});

const result = serverEnvSchema.safeParse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
});

if (!result.success) {
  console.error('❌ Invalid server env:', result.error.format());
  throw new Error('Invalid server environment variables');
}

export const serverEnv = result.data;
