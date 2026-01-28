import { NextResponse } from 'next/server';

/**
 * Brevo API Implementation for Multi-Brand Lead Management
 * Handles:
 * 1. Admin Notification (Lead Alert)
 * 2. Customer Autoresponder (Branded Thank You)
 */
export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { to, subject, content, customer_email, customer_name, brand } = data;

        const brevoKey = process.env.BREVO_API_KEY;

        if (!brevoKey) {
            console.error('BREVO_API_KEY is not set');
            return NextResponse.json({ error: 'Mail service not configured' }, { status: 500 });
        }

        // 1. SEND NOTIFICATION TO THE BUSINESS OWNER (LEAD ALERT)
        // We use the verified 'Instinto' email as the technical sender for system alerts 
        // to ensure the lead is delivered even if 'ventas@genesmarketing.com' isn't verified in Brevo yet.
        const technicalSender = "instintosaludableusa@gmail.com";
        console.log(`Sending lead notification to ${to} for brand: ${brand}`);

        const leadResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': brevoKey,
            },
            body: JSON.stringify({
                sender: { name: `Web Leads [${brand.toUpperCase()}]`, email: technicalSender },
                to: [{ email: to }],
                subject: subject || `Nueva consulta: ${brand}`,
                htmlContent: content,
                replyTo: customer_email ? { email: customer_email, name: customer_name } : undefined
            }),
        });

        const leadResult = await leadResponse.json();
        if (!leadResponse.ok) {
            console.error('Brevo Lead Error:', leadResult);
            throw new Error(`Lead notification failed: ${leadResult.message || 'Unknown error'}`);
        }
        console.log('Lead notification sent successfully:', leadResult.messageId);

        // 2. SEND AUTORESPONDER TO THE CUSTOMER (IF EMAIL PROVIDED)
        if (customer_email) {
            const branding = getBranding(brand, to);
            console.log(`Sending autoresponder to ${customer_email} using brand: ${branding.name}`);

            const autoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': brevoKey,
                },
                body: JSON.stringify({
                    sender: { name: branding.name, email: branding.email },
                    to: [{ email: customer_email, name: customer_name }],
                    subject: branding.subject,
                    htmlContent: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 8px; overflow: hidden;">
                            <div style="background-color: ${branding.color}; padding: 30px; text-align: center;">
                                <h1 style="color: white; margin: 0;">¡Gracias por contactarnos!</h1>
                            </div>
                            <div style="padding: 30px; color: #333; line-height: 1.6;">
                                <p>Hola <strong>${customer_name || 'amigo(a)'}</strong>,</p>
                                <p>Hemos recibido tu mensaje correctamente. Un especialista de <strong>${branding.name}</strong> revisará tu solicitud y se pondrá en contacto contigo muy pronto (normalmente en menos de 24 horas hábiles).</p>
                                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                                <p style="font-size: 14px; color: #666;">Este es un mensaje automático, pero estaremos encantados de hablar contigo pronto.</p>
                                <div style="margin-top: 30px; text-align: center;">
                                    <a href="${branding.url}" style="background-color: ${branding.color}; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visitar nuestra web</a>
                                </div>
                            </div>
                            <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                                © 2026 ${branding.name}. Todos los derechos reservados.
                            </div>
                        </div>
                    `,
                }),
            });

            const autoResult = await autoResponse.json();
            if (!autoResponse.ok) {
                console.error('Brevo Autoresponder Error:', autoResult);
                // We don't throw here to avoid failing the whole request if only the customer email fails
            } else {
                console.log('Autoresponder sent successfully:', autoResult.messageId);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Critical Mailer Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

function getBranding(brand: string, targetEmail: string) {
    // Determine brand based on explicit brand param OR target email address
    const isUnica = brand === 'unica' || targetEmail.includes('radiounica');
    const isGenes = brand === 'genes' || targetEmail.includes('genesmarketing');

    if (isUnica) {
        return {
            name: "Radio Única",
            email: "ventas@radiounica.com",
            color: "#EAB308",
            subject: "¡Hemos recibido tu solicitud de canción/mensaje! - Radio Única",
            url: "https://genesmarketing.com/es/radiounica"
        };
    }

    if (isGenes) {
        return {
            name: "Genes Marketing",
            email: "ventas@genesmarketing.com",
            color: "#0B1220",
            subject: "Confirmación de contacto - Genes Marketing",
            url: "https://genesmarketing.com"
        };
    }

    // Default to Instinto Saludable
    return {
        name: "Instinto Saludable",
        email: "instintosaludableusa@gmail.com",
        color: "#059669",
        subject: "¡Confirmación de mensaje recibido! - Instinto Saludable",
        url: "https://genesmarketing.com"
    };
}
