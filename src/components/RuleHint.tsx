'use client';

import { useState } from 'react';
import { Multiplier } from '@/lib/trachtenberg';
import { getMultiplierRule } from '@/lib/rules';

interface RuleHintProps {
    multiplier: Multiplier | 'all';
}

export default function RuleHint({ multiplier }: RuleHintProps) {
    const [isVisible, setIsVisible] = useState(true);
    const rule = getMultiplierRule(multiplier);

    if (!rule) return null;

    return (
        <aside className={`rule-hint ${isVisible ? '' : 'rule-hint--hidden'}`}>
            <button
                className="rule-hint__toggle"
                onClick={() => setIsVisible(!isVisible)}
                title={isVisible ? 'Esconder dica' : 'Mostrar dica'}
            >
                {isVisible ? '👁' : '👁‍🗨'}
            </button>

            <div className="rule-hint__content">
                <h3 className="rule-hint__title">{rule.title}</h3>
                <p className="rule-hint__rule">{rule.rule}</p>
                <ul className="rule-hint__steps">
                    {rule.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
