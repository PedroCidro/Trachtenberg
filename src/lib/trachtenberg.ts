export type Multiplier = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 12;

export interface Problem {
    number: number;
    multiplier: Multiplier;
    answer: number;
    display: string;
}

export interface RuleStep {
    title: string;
    summary: string;
    steps: string[];
    example: {
        problem: string;
        solution: string;
    }
}

const Trachtenberg = {
    // Available multipliers
    MULTIPLIERS: [2, 3, 4, 5, 6, 7, 8, 9, 11, 12] as const,

    /**
     * Generate a random number with specified digit count
     */
    generateNumber(minDigits: number, maxDigits: number): number {
        const digits = Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits;
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Generate a training problem
     */
    generateProblem(multiplier: Multiplier | 'all', minDigits: number, maxDigits: number): Problem {
        // If multiplier is all, pick a random one
        const selectedMultiplier = multiplier === 'all'
            ? this.MULTIPLIERS[Math.floor(Math.random() * this.MULTIPLIERS.length)]
            : multiplier;

        const number = this.generateNumber(minDigits, maxDigits);

        return {
            number,
            multiplier: selectedMultiplier as Multiplier,
            answer: number * (selectedMultiplier as number),
            display: `${number} × ${selectedMultiplier}`,
        };
    },

    /**
     * Validate user answer
     */
    validateAnswer(userInput: string, correctAnswer: number): boolean {
        const parsed = parseInt(userInput, 10);
        return !isNaN(parsed) && parsed === correctAnswer;
    },

    /**
     * Format number (no spaces to avoid confusion)
     */
    formatNumber(num: number | string): string {
        return num.toString();
    },

    /**
     * Format time in seconds with 1 decimal
     */
    formatTime(ms: number): string {
        return (ms / 1000).toFixed(1) + 's';
    },

    /**
     * Format percentage
     */
    formatPercent(value: number): string {
        return Math.round(value) + '%';
    },

    /**
     * Get recommended learning order
     */
    getRecommendedOrder(): { multiplier: Multiplier, difficulty: string, reason: string }[] {
        return [
            { multiplier: 11, difficulty: 'Fácil', reason: 'Mais intuitivo, soma simples' },
            { multiplier: 5, difficulty: 'Fácil', reason: 'Metade do vizinho apenas' },
            { multiplier: 9, difficulty: 'Médio', reason: 'Complemento + vizinho' },
            { multiplier: 6, difficulty: 'Médio', reason: 'Variação do ×5' },
            { multiplier: 2, difficulty: 'Fácil', reason: 'Básico, dobrar' },
            { multiplier: 12, difficulty: 'Médio', reason: 'Variação do ×11' },
            { multiplier: 3, difficulty: 'Médio', reason: 'Combina dobrar + metade' },
            { multiplier: 7, difficulty: 'Difícil', reason: 'Similar ao ×3' },
            { multiplier: 4, difficulty: 'Difícil', reason: 'Complemento + dobrar' },
            { multiplier: 8, difficulty: 'Difícil', reason: 'Similar ao ×4' },
        ];
    }
};

export default Trachtenberg;
