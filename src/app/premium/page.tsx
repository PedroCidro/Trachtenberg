'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Storage from '@/lib/storage';
import { getStripe } from '@/lib/stripe-client';

export default function PremiumPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async () => {
        setIsLoading(true);

        try {
            const deviceId = Storage.getDeviceId();

            const response = await fetch('/api/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ deviceId }),
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

                <div className="premium-card">
                    <div className="premium-card__price">R$ 14,90</div>
                    <div className="premium-card__period">acesso por 30 dias</div>

                    <ul className="premium-card__features">
                        <li>Exercícios ilimitados por dia</li>
                        <li>Treino a qualquer hora</li>
                        <li>Progresso sem interrupções</li>
                        <li>Apoie o projeto</li>
                    </ul>

                    <button
                        className="btn btn--primary btn--lg premium-card__cta"
                        onClick={handleSubscribe}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processando...' : 'Assinar Agora'}
                    </button>
                </div>

                <section className="premium-faq">
                    <h2 className="premium-faq__title">Perguntas Frequentes</h2>

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

                    <div className="premium-faq__item">
                        <h3 className="premium-faq__question">
                            Quantos exercícios posso fazer sem premium?
                        </h3>
                        <p className="premium-faq__answer">
                            Usuários gratuitos podem fazer até 15 exercícios por dia.
                            O contador reseta à meia-noite.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
