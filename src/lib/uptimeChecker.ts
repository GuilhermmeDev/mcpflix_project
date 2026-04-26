import { Resend } from 'resend';
import { clientEnv } from './client.ts';
import { serverEnv } from './server.ts';

const resend = new Resend(serverEnv.RESEND_API_KEY);
async function checkSupabase() {
  const url = `${clientEnv.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/movies?select=*`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        apikey: clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Prefer': 'count=exact'
      },
    });
    if (response.ok) {
      console.log('Supabase is on!');

      await resend.emails.send({
        from: 'Uptime <onboarding@resend.dev>',
        to: serverEnv.ADMIN_EMAIL,
        subject: 'Status do Sistema: ✅',
        html: '<p>O ping diário no Supabase foi um sucesso e todos os serviços <strong>operam normalmente</strong>.</p>',
      });
    } else {
      throw new Error(`Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Erro ao acessar o Supabase: ', error);
    await resend.emails.send({
      from: 'Uptime <onboarding@resend.dev>',
      to: serverEnv.ADMIN_EMAIL,
      subject: 'Status do Sistema: ❌',
      html: '<p>O ping diário no Supabase não ocorreu como o esperado e os serviços <strong>podem estar fora!</strong></p>',
    });
  }
}

checkSupabase();
