/**
 * Centralized form utility to handle business-specific emails and form submissions.
 * Replaces Formspree with a direct API call to our internal mailer.
 */

export const TARGET_EMAILS = {
    INSTINTO: "instintosaludable@gmail.com",
    RADIO_UNICA: "ventas@radiounica.com",
    GENES: "ventas@genesmarketing.com",
};

/**
 * Gets the correct target email based on the current hostname.
 */
export function getTargetEmail() {
    if (typeof window === "undefined") return TARGET_EMAILS.INSTINTO;

    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    // Check for Radio Unica
    if (hostname.includes("radiounica.com") || pathname.includes("/radiounica")) {
        return TARGET_EMAILS.RADIO_UNICA;
    }

    // Check for Genes Marketing domains
    if (
        hostname.includes("genesmarketing.com") ||
        hostname.includes("genes-marketing") ||
        (hostname === "localhost" && pathname.includes("marketing"))
    ) {
        return TARGET_EMAILS.GENES;
    }

    // Default to Instinto Saludable
    return TARGET_EMAILS.INSTINTO;
}

/**
 * Submits form data to our internal API route which handles email sending.
 */
export async function submitToFormspree(data: Record<string, any>, _ignoredId?: string) {
    const targetEmail = getTargetEmail();

    // Format the email content as HTML
    const htmlContent = `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #0b1220;">Nueva Sumisión de Formulario</h2>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
                ${Object.entries(data).map(([key, value]) => `
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #f9f9f9; font-weight: bold; text-transform: capitalize; width: 150px;">
                            ${key.replace(/_/g, ' ')}:
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #f9f9f9;">
                            ${value}
                        </td>
                    </tr>
                `).join('')}
            </table>
            <p style="margin-top: 30px; font-size: 12px; color: #999;">
                Enviado desde: ${typeof window !== 'undefined' ? window.location.href : 'Servidor'}
            </p>
        </div>
    `;

    const response = await fetch('/api/send-email', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            to: targetEmail,
            subject: `Formulario: ${data.name || 'Nueva Consulta'}`,
            content: htmlContent
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
    }

    return response.json();
}
