'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Storage from '@/lib/storage';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (sessionId) {
            // Mark user as subscribed in localStorage
            // In production, you'd verify this with a webhook or API call
            Storage.setSubscription({
                isSubscribed: true,
                // Set expiration to 30 days from now for one-time payment
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            });
            setStatus('success');
        } else {
            setStatus('error');
        }
    }, [sessionId]);

    if (status === 'loading') {
        return (
            <div className="flex-center" style={{ height: '100vh' }}>
                <p>Processando...</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
                <Header />
                <h1>Ops!</h1>
                <p>Algo deu errado. Por favor, tente novamente.</p>
                <Link href="/premium" className="btn btn--primary">
                    Voltar
                </Link>
                <Footer />
            </div>
        );
    }

    return (
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
            <Header />

            <main style={{ padding: 'var(--space-12) 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🎉</div>
                <h1 style={{ marginBottom: 'var(--space-4)' }}>Parabéns!</h1>
                <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>
                    Você agora tem acesso <strong style={{ color: 'var(--accent)' }}>ilimitado</strong> aos exercícios!
                </p>

                <div style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-6)',
                    maxWidth: '400px',
                    margin: '0 auto var(--space-8)'
                }}>
                    <h3 style={{ marginBottom: 'var(--space-4)' }}>Seu acesso Premium</h3>
                    <ul style={{ textAlign: 'left', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                        <li style={{ padding: 'var(--space-2) 0' }}>✓ Exercícios ilimitados por dia</li>
                        <li style={{ padding: 'var(--space-2) 0' }}>✓ Válido por 30 dias</li>
                        <li style={{ padding: 'var(--space-2) 0' }}>✓ Sem interrupções no treino</li>
                    </ul>
                </div>

                <Link href="/" className="btn btn--primary btn--lg">
                    Começar a Treinar
                </Link>
            </main>

            <Footer />
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="flex-center" style={{ height: '100vh' }}>Carregando...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
