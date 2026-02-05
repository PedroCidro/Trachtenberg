import { NextRequest, NextResponse } from 'next/server';
import { getStripeServer } from '@/lib/stripe';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { deviceId, planType, amount, planName, duration } = body;

        if (!deviceId) {
            return NextResponse.json(
                { error: 'Device ID is required' },
                { status: 400 }
            );
        }

        // Default to monthly if not specified
        const finalAmount = amount || 1490;
        const finalPlanName = planName || 'Mensal';
        const finalDuration = duration || 30;

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        const stripe = getStripeServer();
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: `Trachtenberg Premium - ${finalPlanName}`,
                            description: `Acesso ilimitado aos exercícios de multiplicação mental (${finalDuration} dias)`,
                        },
                        unit_amount: finalAmount,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                deviceId: deviceId,
                planType: planType || 'monthly',
                duration: String(finalDuration),
            },
            success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&duration=${finalDuration}`,
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
