import React from 'react';
import { Multiplier } from '@/lib/trachtenberg';

interface MultiplierGridProps {
    selectedMultiplier: Multiplier | 'all';
    onSelect: (m: Multiplier | 'all') => void;
}

const multipliers: (Multiplier | 'all')[] = [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 'all'];

export default function MultiplierGrid({ selectedMultiplier, onSelect }: MultiplierGridProps) {
    return (
        <div className="multiplier-grid">
            {multipliers.map((m) => (
                <button
                    key={m}
                    className={`multiplier-btn ${m === 'all' ? 'multiplier-btn--all' : ''} ${selectedMultiplier === m ? 'multiplier-btn--selected' : ''
                        }`}
                    onClick={() => onSelect(m)}
                    data-multiplier={m}
                >
                    {m === 'all' ? (
                        'TODOS'
                    ) : (
                        `×${m}`
                    )}
                </button>
            ))}
        </div>
    );
};
