'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RuleHint from '@/components/RuleHint';
import Trachtenberg, { Multiplier } from '@/lib/trachtenberg';
import useTraining from '@/hooks/useTraining';

function TrainingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    const mParam = searchParams.get('m');
    const minParam = searchParams.get('min');
    const maxParam = searchParams.get('max');

    const multiplier: Multiplier | 'all' = mParam && mParam !== 'all' ? parseInt(mParam, 10) as Multiplier : 'all';
    const minDigits = minParam ? parseInt(minParam, 10) : 2;
    const maxDigits = maxParam ? parseInt(maxParam, 10) : 4;

    const {
        problem,
        inputValue,
        setInputValue,
        feedback,
        correctCount,
        incorrectCount,
        elapsedTime,
        startSession,
        submitAnswer,
        skipProblem,
        isActive
    } = useTraining();

    // Start on mount
    useEffect(() => {
        startSession(multiplier, minDigits, maxDigits);
    }, []); // Only on mount

    // Focus input when problem changes
    useEffect(() => {
        if (problem && inputRef.current) {
            inputRef.current.focus();
        }
    }, [problem]);

    // Handle keyboard submission
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            submitAnswer(multiplier, minDigits, maxDigits);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            skipProblem(multiplier, minDigits, maxDigits);
        } else if (e.key === 'Escape') {
            router.push('/');
        }
    };

    if (!isActive || !problem) return <div className="flex-center" style={{ height: '100vh' }}>Carregando...</div>;

    return (
        <div className="container page-training">
            <header className="training-header">
                <Link href="/" className="training-header__back">
                    <span>←</span>
                    <span>Voltar</span>
                </Link>
                <div className="training-header__info">
                    Multiplicando por <strong>{multiplier === 'all' ? 'Todos' : `×${multiplier}`}</strong>
                </div>
                <Link href="/estatisticas" className="training-header__back">
                    <span>Estatísticas</span>
                </Link>
            </header>

            <main className="training-area">
                <div className="problem">
                    <div className="problem__number">
                        {Trachtenberg.formatNumber(problem.number)}
                    </div>
                    <div className="problem__operator">
                        × <span>{problem.multiplier}</span>
                    </div>
                </div>

                <div className="answer-section">
                    <div className="answer-input-wrapper">
                        <input
                            ref={inputRef}
                            type="text"
                            className={`input input--training ${feedback ? `is-${feedback}` : ''}`}
                            placeholder="?"
                            autoComplete="off"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={feedback !== null}
                        />
                    </div>
                </div>

                <div className="feedback">
                    {feedback === 'correct' && (
                        <div className="feedback__message feedback__message--correct">
                            Correto!
                        </div>
                    )}
                    {feedback === 'incorrect' && (
                        <>
                            <div className="feedback__message feedback__message--incorrect">
                                Incorreto
                            </div>
                            <div className="feedback__correct-answer">
                                Resposta correta: <strong>{problem.answer}</strong>
                            </div>
                        </>
                    )}
                </div>

                <div className="training-stats">
                    <div className="training-stats__item">
                        <span className="training-stats__icon training-stats__icon--correct">✓</span>
                        <span className="training-stats__value">{correctCount}</span>
                    </div>
                    <div className="training-stats__item">
                        <span className="training-stats__icon training-stats__icon--incorrect">✗</span>
                        <span className="training-stats__value">{incorrectCount}</span>
                    </div>
                    <div className="training-stats__item">
                        <span className="training-stats__icon">⏱</span>
                        <span className="training-stats__value">{Trachtenberg.formatTime(elapsedTime * 1000)}</span>
                    </div>
                </div>
            </main>

            <div className="shortcuts-hint" style={{ paddingBottom: 'var(--space-4)' }}>
                <div className="shortcuts-hint__item">
                    <kbd className="kbd">Enter</kbd>
                    <span>Responder</span>
                </div>
                <div className="shortcuts-hint__item">
                    <kbd className="kbd">Tab</kbd>
                    <span>Pular</span>
                </div>
                <div className="shortcuts-hint__item">
                    <kbd className="kbd">Esc</kbd>
                    <span>Sair</span>
                </div>
            </div>

            <RuleHint multiplier={multiplier} />
        </div>
    );
}

export default function TrainingPage() {
    return (
        <Suspense fallback={<div className="flex-center" style={{ height: '100vh' }}>Carregando...</div>}>
            <TrainingContent />
        </Suspense>
    );
}
