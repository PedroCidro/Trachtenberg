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
        rule: 'Dobre o dígito, adicione metade do vizinho. Se ímpar, adicione 5.',
        steps: [
            'Dobre o dígito atual',
            'Adicione metade do vizinho (ignore frações)',
            'Se o dígito for ímpar, adicione 5'
        ]
    },
    4: {
        title: 'Multiplicar por 4',
        rule: 'Subtraia de 10 (complemento), dobre, e adicione o vizinho.',
        steps: [
            'Calcule (10 - dígito)',
            'Dobre o resultado',
            'Adicione o vizinho'
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
        rule: 'Dobre + metade do vizinho + vizinho inteiro. Se ímpar, +5.',
        steps: [
            'Dobre o dígito',
            'Adicione metade do vizinho',
            'Adicione o vizinho inteiro',
            'Se ímpar, adicione 5'
        ]
    },
    8: {
        title: 'Multiplicar por 8',
        rule: 'Subtraia de 9, adicione o vizinho. Se primeiro ou dígito > vizinho, subtraia de 10.',
        steps: [
            '(9 - dígito) + vizinho',
            'Se primeiro dígito: (10 - dígito)',
            'Se dígito > vizinho: use 10 ao invés de 9'
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
