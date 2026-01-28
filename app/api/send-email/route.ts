import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { to, subject, content } = data;

        const resendKey = process.env.RESEND_API_KEY;

        if (!resendKey) {
            console.error('RESEND_API_KEY is not set');
            return NextResponse.json({ error: 'Mail service not configured' }, { status: 500 });
        }

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendKey}`,
            },
            body: JSON.stringify({
                from: 'Genes Marketing Forms <onboarding@resend.dev>',
                to: [to],
                subject: subject || 'Nueva consulta desde la web',
                html: content,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to send email');
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Email API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
