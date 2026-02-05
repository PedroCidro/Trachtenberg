'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTimeUntilReset, FREE_DAILY_LIMIT } from '@/lib/usageLimit';

interface PaywallProps {
    onClose?: () => void;
    dailyUsage: number;
}

export default function Paywall({ onClose, dailyUsage }: PaywallProps) {
    const [timeUntilReset, setTimeUntilReset] = useState(getTimeUntilReset());

    // Update countdown every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeUntilReset(getTimeUntilReset());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="paywall-overlay">
            <div className="paywall">
                <div className="paywall__header">
                    <span className="paywall__icon">🔒</span>
                    <h2 className="paywall__title">Limite Diário Atingido</h2>
                </div>

                <p className="paywall__message">
                    Você completou <strong>{dailyUsage}</strong> exercícios hoje!
                    <br />
                    O limite gratuito é de <strong>{FREE_DAILY_LIMIT} exercícios por dia</strong>.
                </p>

                <div className="paywall__reset-info">
                    <span className="paywall__clock">⏰</span>
                    <span>
                        Limite reseta em <strong>{timeUntilReset.hours}h {timeUntilReset.minutes}min</strong>
                    </span>
                </div>

                <div className="paywall__divider">
                    <span>ou</span>
                </div>

                <div className="paywall__upgrade">
                    <h3>Desbloqueie Exercícios Ilimitados</h3>
                    <ul className="paywall__benefits">
                        <li>✓ Treino ilimitado, sem restrições</li>
                        <li>✓ Pratique quanto quiser, quando quiser</li>
                        <li>✓ Apoie o desenvolvimento do projeto</li>
                    </ul>

                    <Link href="/premium" className="btn btn--primary btn--lg paywall__cta">
                        Ver Plano Premium
                        <span className="paywall__price">R$ 14,90/mês</span>
                    </Link>
                </div>

                <Link href="/" className="paywall__back">
                    ← Voltar ao início
                </Link>
            </div>
        </div>
    );
}
