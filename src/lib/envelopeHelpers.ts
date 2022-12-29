export function calculateAttackValueFromPercentage(value: number) {
    return 0.001 + (value / 100) * (4 - 0.001);
}

export function calculateDecayValueFromPercentage(value: number) {
    return 0.1 + (value / 100) * (2 - 0.1);
}

export function calculateSustainValueFromPercentage(value: number) {
    return value / 100;
}

export function calculatePercentageFromAttackValue(attack: number): number {
    return Math.round(((attack - 0.001) * 100) / (4 - 0.001));
}

export function calculatePercentageFromDecayValue(decay: number): number {
    return Math.round(((decay - 0.1) * 100) / (2 - 0.1));
}

export function calculatePercentageFromSustainValue(sustain: number): number {
    return Math.round(sustain * 100);
}
