import { Loop } from '@lib/types/sequencer';

export function bresenhamEuclidean(onsets: number, totalPulses: number) {
    const onsetsFixed = onsets + 1;
    let previous = 0;
    const pattern = [];

    for (let i = 0; i < totalPulses; i += 1) {
        const xVal = Math.floor((onsetsFixed / totalPulses) * i);
        pattern.push(xVal === previous ? 0 : 1);
        previous = xVal;
    }

    return pattern;
}

const pitches = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export const pitchesByOctaves: string[] = ['5', '4', '3', '2'].reduce((acc: string[], octave) => {
    return acc.concat(pitches.map((pitch) => `${pitch}${octave}`));
}, []);

export function generateRandomLoop(octave = 3) {
    const division = Math.round(Math.random() * 15) + 2;
    const onset = Math.floor(division / 2);
    const euclideanRhythm = bresenhamEuclidean(onset, division);

    const loop: Loop = euclideanRhythm.map((note) => {
        if (note === 0) {
            return [];
        }

        const pitch = pitches[Math.round(Math.random() * (pitches.length - 1))] + String(octave);

        return [{ pitch }];
    });

    return loop;
}
