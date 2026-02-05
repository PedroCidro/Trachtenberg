'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Storage from '@/lib/storage';

type PlanType = 'monthly' | 'lifetime';

const plans = {
    monthly: {
        name: 'Mensal',
        price: 'R$ 10',
        period: 'por mês',
        amount: 1000,
        duration: 30, // days
        popular: false,
    },
    lifetime: {
        name: 'Vitalício',
        price: 'R$ 40',
        period: 'pagamento único',
        amount: 4000,
        duration: 36500, // 100 years
        popular: true,
        badge: '🏆 Melhor Valor',
    },
};

export default function PremiumPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<PlanType>('lifetime');

    const handleSubscribe = async (planType: PlanType) => {
        setIsLoading(true);

        try {
            const deviceId = Storage.getDeviceId();
            const plan = plans[planType];

            const response = await fetch('/api/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deviceId,
                    planType,
                    amount: plan.amount,
                    planName: plan.name,
                    duration: plan.duration,
                }),
            });

            const data = await response.json();

            if (data.error) {
                alert('Erro ao processar pagamento. Tente novamente.');
                setIsLoading(false);
                return;
            }

            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Erro ao processar pagamento. Tente novamente.');
            setIsLoading(false);
        }
    };

    return (
        <div className="container premium-page">
            <Header />

            <main className="premium-hero">
                <span className="premium-hero__badge">
                    ⭐ Premium
                </span>

                <h1 className="premium-hero__title">
                    Treine Sem Limites
                </h1>

                <p className="premium-hero__subtitle">
                    Desbloqueie acesso ilimitado ao treino de multiplicação mental
                    e domine o Método Trachtenberg.
                </p>

                <div className="pricing-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '600px' }}>
                    {/* Monthly */}
                    <div
                        className={`pricing-card ${selectedPlan === 'monthly' ? 'pricing-card--selected' : ''}`}
                        onClick={() => setSelectedPlan('monthly')}
                    >
                        <div className="pricing-card__header">
                            <h3 className="pricing-card__name">{plans.monthly.name}</h3>
                        </div>
                        <div className="pricing-card__price">{plans.monthly.price}</div>
                        <div className="pricing-card__period">{plans.monthly.period}</div>
                    </div>

                    {/* Lifetime */}
                    <div
                        className={`pricing-card ${selectedPlan === 'lifetime' ? 'pricing-card--selected' : ''}`}
                        onClick={() => setSelectedPlan('lifetime')}
                    >
                        <div className="pricing-card__badge pricing-card__badge--gold">🏆 Melhor Valor</div>
                        <div className="pricing-card__header">
                            <h3 className="pricing-card__name">{plans.lifetime.name}</h3>
                        </div>
                        <div className="pricing-card__price">{plans.lifetime.price}</div>
                        <div className="pricing-card__period">{plans.lifetime.period}</div>
                    </div>
                </div>

                <div className="premium-features">
                    <h3>Todos os planos incluem:</h3>
                    <ul className="premium-features__list">
                        <li>✓ Exercícios ilimitados por dia</li>
                        <li>✓ Treino a qualquer hora</li>
                        <li>✓ Progresso sem interrupções</li>
                        <li>✓ Apoie o desenvolvimento do projeto</li>
                    </ul>
                </div>

                <button
                    className="btn btn--primary btn--lg premium-cta"
                    onClick={() => handleSubscribe(selectedPlan)}
                    disabled={isLoading}
                >
                    {isLoading ? 'Processando...' : `Assinar Plano ${plans[selectedPlan].name}`}
                </button>

                <section className="premium-faq">
                    <h2 className="premium-faq__title">Perguntas Frequentes</h2>

                    <div className="premium-faq__item">
                        <h3 className="premium-faq__question">
                            Qual a diferença entre os planos?
                        </h3>
                        <p className="premium-faq__answer">
                            Todos os planos oferecem acesso ilimitado. A diferença é apenas na duração:
                            mensal (30 dias), anual (1 ano) ou vitalício (para sempre).
                        </p>
                    </div>

                    <div className="premium-faq__item">
                        <h3 className="premium-faq__question">
                            Como funciona o pagamento?
                        </h3>
                        <p className="premium-faq__answer">
                            O pagamento é processado de forma segura pelo Stripe.
                            Você será redirecionado para uma página segura para inserir seus dados.
                        </p>
                    </div>

                    <div className="premium-faq__item">
                        <h3 className="premium-faq__question">
                            Quais formas de pagamento são aceitas?
                        </h3>
                        <p className="premium-faq__answer">
                            Aceitamos cartões de crédito e débito (Visa, Mastercard, Amex, etc.)
                            através do Stripe.
                        </p>
                    </div>

                    <div className="premium-faq__item">
                        <h3 className="premium-faq__question">
                            O que acontece com meu progresso?
                        </h3>
                        <p className="premium-faq__answer">
                            Seu progresso e estatísticas são salvos localmente no seu
                            navegador, independente da assinatura.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
