import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-01-27.acacia' as any,
});

export async function POST(req: Request) {
    try {
        const { items, locale } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
        }

        // Origin for redirect URLs
        const origin = req.headers.get('origin') || 'https://instintosaludable.com';

        // Create Line Items for Stripe
        const line_items = items.map((item: any) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image.startsWith('http') ? item.image : `${origin}${item.image}`],
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects cents
            },
            quantity: item.quantity,
        }));

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${origin}/${locale}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/${locale}/shop/canceled`,
            locale: locale === 'es' ? 'es' : (locale === 'pt' ? 'pt' : 'en'),
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
