import { Resend } from 'resend';
import { clientEnv } from './client.ts';
import { serverEnv } from './server.ts';

const resend = new Resend(serverEnv.RESEND_API_KEY);

function buildErrorEmail(errorMessage: string) {
  const timestamp = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
  <div style="margin:0;padding:24px;background-color:#0b0b0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background-color:#16161d;border:1px solid #2a2a35;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:32px 32px 24px;border-bottom:1px solid #2a2a35;">
          <div style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#e50914;font-weight:700;">MCPFlix · Uptime</div>
          <h1 style="margin:12px 0 0;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">⚠️ O ping ao Supabase falhou</h1>
          <p style="margin:8px 0 0;font-size:15px;line-height:1.6;color:#a0a0ad;">O monitoramento diário não recebeu uma resposta saudável. Os serviços <strong style="color:#ffffff;">podem estar fora do ar</strong>.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px;">
          <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#6b6b78;font-weight:600;margin-bottom:8px;">Detalhe do erro</div>
          <div style="background-color:#0b0b0f;border:1px solid #2a2a35;border-radius:10px;padding:16px;font-family:'SF Mono',Menlo,Consolas,monospace;font-size:13px;line-height:1.5;color:#ff6b6b;word-break:break-word;">${errorMessage}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:0 32px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #2a2a35;">
            <tr>
              <td style="padding-top:20px;font-size:13px;color:#6b6b78;">
                Verificado em<br />
                <span style="color:#a0a0ad;">${timestamp}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="max-width:520px;margin:16px auto 0;text-align:center;font-size:12px;color:#4a4a55;">Esta é uma mensagem automática do monitor de uptime do MCPFlix.</p>
  </div>`;
}

async function checkSupabase() {
  const url = `${clientEnv.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/movies?select=id&limit=1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        apikey: clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    });
    if (response.ok) {
      console.log('Supabase is on!');
    } else {
      throw new Error(`Status: ${response.status}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Erro ao acessar o Supabase: ', error);
    await resend.emails.send({
      from: 'Uptime <onboarding@resend.dev>',
      to: serverEnv.ADMIN_EMAIL,
      subject: 'Status do Sistema: ❌ Supabase fora do ar',
      html: buildErrorEmail(errorMessage),
    });
  }
}

checkSupabase();
