
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const brevoKey = process.env.BREVO_API_KEY;
    
    // Determine the source/brand for the email
    const source = body.game || body.brand || 'New Lead';
    const clientEmail = body.email || body.customer_email;
    const clientName = body.name || body.customer_name || 'Nuevo Cliente';

    // 1. If we have a real Brevo key, send to Brevo
    if (brevoKey && !brevoKey.includes('your_brevo_v3_key')) {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': brevoKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: "Genes Marketing System", email: "genesmarketingllc@gmail.com" },
          to: [{ email: "genesmarketingllc@gmail.com" }],
          subject: `🎯 [${source.toUpperCase()}] Nuevo Lead: ${clientEmail}`,
          htmlContent: `
            <div style="font-family: sans-serif; padding: 20px; background: #0f172a; color: white; border-radius: 12px;">
              <h1 style="color: #fbbf24; margin-bottom: 20px;">Nuevo Lead Capturado</h1>
              <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                <table border="0" cellpadding="10" cellspacing="0" width="100%">
                  ${Object.entries(body).map(([k, v]) => `
                    <tr>
                      <td width="30%" style="font-weight: bold; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.05);">${k.toUpperCase()}</td>
                      <td style="color: white; border-bottom: 1px solid rgba(255,255,255,0.05);">${v}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #64748b;">Enviado automáticamente desde el sistema de marketing.</p>
            </div>
          `
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Brevo Error: ${JSON.stringify(error)}`);
      }
    } else {
      console.log('🚀 LEAD RECEIVED (MOCK MODE - No Brevo Key):', body);
    }

    return NextResponse.json({ success: true, message: 'Lead sent successfully' });
  } catch (error) {
    console.error('Error in Lead API:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
