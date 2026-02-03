import { Multiplier } from './trachtenberg';

interface MultiplierRule {
    title: string;
    rule: string;
    steps: string[];
}

export const multiplierRules: Record<Multiplier, MultiplierRule> = {
    2: {
        title: 'Multiplicar por 2',
        rule: 'Dobre cada dígito. Se for maior que 9, carregue 1.',
        steps: [
            'Dobre o dígito atual',
            'Carregue se maior que 9'
        ]
    },
    3: {
        title: 'Multiplicar por 3',
        rule: 'Subtraia de 10 (ou 9), dobre o resultado e adicione 5 se ímpar.',
        steps: [
            'Primeiro dígito: (10 - dígito) × 2',
            'Outros dígitos: (9 - dígito) × 2',
            'Adicione metade do vizinho',
            'Se ímpar, adicione 5'
        ]
    },
    4: {
        title: 'Multiplicar por 4',
        rule: 'Subtraia o dígito de 10 e adicione o vizinho. Se ímpar, +5.',
        steps: [
            'Calcule (10 - dígito)',
            'Adicione o vizinho',
            'Se o dígito for ímpar, adicione 5'
        ]
    },
    5: {
        title: 'Multiplicar por 5',
        rule: 'Metade do vizinho. Se o dígito for ímpar, adicione 5.',
        steps: [
            'Divida o vizinho por 2 (ignore frações)',
            'Se o dígito atual for ímpar, adicione 5'
        ]
    },
    6: {
        title: 'Multiplicar por 6',
        rule: 'Dígito + metade do vizinho. Se ímpar, adicione 5.',
        steps: [
            'Pegue o próprio dígito',
            'Adicione metade do vizinho (ignore frações)',
            'Se o dígito for ímpar, adicione 5'
        ]
    },
    7: {
        title: 'Multiplicar por 7',
        rule: 'Dobre o dígito e some metade do vizinho. Se ímpar, some 5.',
        steps: [
            'Dobre o dígito',
            'Adicione metade do vizinho (sem decimais)',
            'Se o dígito for ímpar, adicione 5'
        ]
    },
    8: {
        title: 'Multiplicar por 8',
        rule: 'Subtraia de 10 (ou 9), dobre o resultado e adicione o vizinho.',
        steps: [
            'Primeiro dígito: (10 - dígito) × 2',
            'Outros dígitos: (9 - dígito) × 2',
            'Adicione o vizinho'
        ]
    },
    9: {
        title: 'Multiplicar por 9',
        rule: 'Subtraia de 10 (complemento) e some o vizinho.',
        steps: [
            '(10 - dígito) + vizinho',
            'Para o primeiro dígito: (10 - dígito) - 1',
            'Carregue se maior que 9'
        ]
    },
    11: {
        title: 'Multiplicar por 11',
        rule: 'Some cada dígito com seu vizinho (à direita).',
        steps: [
            'Copie o último dígito',
            'Some cada dígito ao seu vizinho',
            'Carregue 1 se soma > 9'
        ]
    },
    12: {
        title: 'Multiplicar por 12',
        rule: 'Dobre o dígito e some o vizinho.',
        steps: [
            'Dobre o dígito atual',
            'Some o vizinho ao resultado',
            'Carregue se maior que 9'
        ]
    }
};

export function getMultiplierRule(multiplier: Multiplier | 'all'): MultiplierRule | null {
    if (multiplier === 'all') return null;
    return multiplierRules[multiplier] || null;
}
