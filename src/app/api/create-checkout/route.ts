import { NextRequest, NextResponse } from 'next/server';
import { getStripeServer } from '@/lib/stripe';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { deviceId } = body;

        if (!deviceId) {
            return NextResponse.json(
                { error: 'Device ID is required' },
                { status: 400 }
            );
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        // Create a Stripe Checkout session with payment mode (one-time for simplicity)
        // To enable PIX: activate it in Stripe Dashboard -> Settings -> Payment Methods
        const stripe = getStripeServer();
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'], // Add 'pix' after enabling in Dashboard
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: 'Trachtenberg Premium',
                            description: 'Acesso ilimitado aos exercícios de multiplicação mental',
                        },
                        unit_amount: 1490, // R$ 14,90 in centavos
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                deviceId: deviceId,
            },
            success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/premium`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
