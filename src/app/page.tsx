'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MultiplierGrid from '@/components/MultiplierGrid';
import RangeSlider from '@/components/RangeSlider';
import Storage from '@/lib/storage';
import { Multiplier } from '@/lib/trachtenberg';

export default function Home() {
    const router = useRouter();
    const [selectedMultiplier, setSelectedMultiplier] = useState<Multiplier | 'all'>('all');
    const [minDigits, setMinDigits] = useState(2);
    const [maxDigits, setMaxDigits] = useState(4);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const prefs = Storage.getPreferences();
        if (prefs) {
            setMinDigits(prefs.minDigits);
            setMaxDigits(prefs.maxDigits);
        }
    }, []);

    const handleStart = () => {
        Storage.updatePreferences({ minDigits, maxDigits });
        router.push(`/treino?m=${selectedMultiplier}&min=${minDigits}&max=${maxDigits}`);
    };

    if (!isClient) return null; // Avoid hydration mismatch on initial render

    return (
        <div className="container page-home">
            <Header />

            <main className="hero">
                <h1 className="hero__title">
                    Método <span>Trachtenberg</span>
                </h1>
                <p className="hero__subtitle">
                    Treine multiplicação mental rápida. Escolha um multiplicador e pratique.
                </p>

                <section className="home-section">
                    <h2 className="home-section__title">Escolha o Multiplicador</h2>
                    <MultiplierGrid
                        selectedMultiplier={selectedMultiplier}
                        onSelect={setSelectedMultiplier}
                    />
                </section>

                <section className="home-section">
                    <h2 className="home-section__title">Configurações</h2>
                    <div className="settings-panel">
                        <div className="settings-panel__item">
                            <RangeSlider
                                id="min-digits"
                                label="Dígitos Mínimos"
                                min={1}
                                max={10}
                                value={minDigits}
                                onChange={(val) => {
                                    setMinDigits(val);
                                    if (maxDigits < val) setMaxDigits(val);
                                }}
                            />
                        </div>
                        <div className="settings-panel__item">
                            <RangeSlider
                                id="max-digits"
                                label="Dígitos Máximos"
                                min={1}
                                max={10}
                                value={maxDigits}
                                onChange={(val) => {
                                    setMaxDigits(val);
                                    if (minDigits > val) setMinDigits(val);
                                }}
                            />
                        </div>
                    </div>
                </section>

                <section className="start-section">
                    <button className="btn btn--primary btn--lg" onClick={handleStart}>
                        Começar Treino
                    </button>
                </section>

                <div className="shortcuts-hint" style={{ marginTop: 'var(--space-8)' }}>
                    <div className="shortcuts-hint__item">
                        <kbd className="kbd">1-9</kbd>
                        <span>Multiplicador</span>
                    </div>
                    <div className="shortcuts-hint__item">
                        <kbd className="kbd">0</kbd>
                        <span>Todos</span>
                    </div>
                    <div className="shortcuts-hint__item">
                        <kbd className="kbd">Enter</kbd>
                        <span>Iniciar</span>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
