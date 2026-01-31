'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Storage, { SessionResult } from '@/lib/storage';
import Trachtenberg from '@/lib/trachtenberg';

export default function StatisticsPage() {
    const [sessionResults, setSessionResults] = useState<SessionResult[]>([]);
    const [lastN, setLastN] = useState(20);

    useEffect(() => {
        setSessionResults(Storage.getStats());
    }, []);

    const clearAll = () => {
        if (confirm('Tem certeza que deseja limpar todas as estatísticas?')) {
            Storage.clearAll();
            setSessionResults([]);
        }
    };

    const exportStats = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sessionResults));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "trachtenberg_stats.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    // Filter last N
    const recentResults = sessionResults.slice(-lastN);

    return (
        <div className="container page-stats">
            <Header />

            <section className="stats-header">
                <h1 className="stats-header__title">📊 Suas Estatísticas</h1>
                <p className="stats-header__subtitle">Acompanhe seu progresso no Método Trachtenberg</p>
            </section>

            <div className="flex-center" style={{ marginBottom: 'var(--space-8)' }}>
                <div className="last-n-selector">
                    <label className="last-n-selector__label" htmlFor="last-n-input">
                        Últimas tentativas:
                    </label>
                    <input
                        type="number"
                        className="last-n-selector__input"
                        id="last-n-input"
                        min={1}
                        max={1000}
                        value={lastN}
                        onChange={(e) => setLastN(parseInt(e.target.value, 10))}
                    />
                </div>
            </div>

            {recentResults.length === 0 ? (
                <div className="text-center text-muted">
                    <p>Nenhuma estatística encontrada. Comece a treinar!</p>
                    <Link href="/" className="btn btn--primary" style={{ marginTop: 'var(--space-4)' }}>
                        Ir para Treino
                    </Link>
                </div>
            ) : (
                <>
                    <section className="stats-overview">
                        <div className="stat-card stat-card--accent">
                            <div className="stat-card__value">{recentResults.length}</div>
                            <div className="stat-card__label">Sessões</div>
                        </div>
                        {/* Add more aggregate stats here if needed */}
                    </section>

                    <section className="multiplier-stats">
                        {/* Render per-multiplier stats logic here */}
                        {/* For simplicity in this migration, just showing raw recent sessions list or summary */}

                        {/* Detailed list (simplified) */}
                        <div className="card">
                            <h3>Histórico Recente</h3>
                            <ul style={{ marginTop: 'var(--space-4)' }}>
                                {recentResults.reverse().map((res, i) => (
                                    <li key={i} className="flex-between" style={{ padding: 'var(--space-2) 0', borderBottom: '1px solid var(--bg-hover)' }}>
                                        <span>×{res.multiplier === 'all' ? 'Todos' : res.multiplier}</span>
                                        <span>{res.correct} ✓  {res.incorrect} ✗</span>
                                        <span className="text-muted">{Trachtenberg.formatTime(res.time)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <div className="flex-center gap-4" style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
                        <button className="btn btn--secondary" onClick={exportStats}>
                            Exportar
                        </button>
                        <button className="btn btn--ghost" onClick={clearAll}>
                            Limpar Tudo
                        </button>
                    </div>
                </>
            )}

            <Footer />
        </div>
    );
}
