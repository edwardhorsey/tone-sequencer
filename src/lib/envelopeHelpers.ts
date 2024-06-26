function calculateAttackValueFromPercentage(value: number) {
    return 0.001 + (value / 100) * (4 - 0.001);
}

function calculateDecayValueFromPercentage(value: number) {
    return 0.1 + (value / 100) * (2 - 0.1);
}

function calculateSustainValueFromPercentage(value: number) {
    return value / 100;
}

function calculatePercentageFromAttackValue(attack: number): number {
    return Math.round(((attack - 0.001) * 100) / (4 - 0.001));
}

function calculatePercentageFromDecayValue(decay: number): number {
    return Math.round(((decay - 0.1) * 100) / (2 - 0.1));
}

function calculatePercentageFromSustainValue(sustain: number): number {
    return Math.round(sustain * 100);
}

const getPercentageFromEnvelopeValueFunctions = {
    attack: calculatePercentageFromAttackValue,
    decay: calculatePercentageFromDecayValue,
    sustain: calculatePercentageFromSustainValue,
};

const getEnvelopeValueFromPercentageFunctions = {
    attack: calculateAttackValueFromPercentage,
    decay: calculateDecayValueFromPercentage,
    sustain: calculateSustainValueFromPercentage,
};

export function getPercentageFromEnvelopeValue(type: 'attack' | 'decay' | 'sustain', value: number) {
    return getPercentageFromEnvelopeValueFunctions[type](value);
}

export function getEnvelopeValueFromPercentage(type: 'attack' | 'decay' | 'sustain', value: number) {
    return getEnvelopeValueFromPercentageFunctions[type](value);
}
