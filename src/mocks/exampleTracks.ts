import { Loop, Loops } from '../types/sequencer';

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

export default bresenhamEuclidean;

const pitches = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export function generateRandomLoop(octave = 3) {
    const division = Math.round(Math.random() * 15) + 2;
    const onset = Math.floor(division / 2);
    const euclideanRhythm = bresenhamEuclidean(onset, division);

    const loop: Loop = euclideanRhythm.map((note) => {
        if (note === 0) {
            return false;
        }

        const pitch = pitches[Math.round(Math.random() * (pitches.length - 1))] + String(octave);

        return { pitch };
    });

    return loop;
}

export const initialLoops: Loops = {
    SynthA: [
        false,
        false,
        {
            pitch: 'C#5',
        },
    ],
    SynthB: [
        false,
        false,
        {
            pitch: 'Bb3',
        },
        false,
        {
            pitch: 'Gb3',
        },
        false,
        {
            pitch: 'C3',
        },
        false,
        {
            pitch: 'Bb3',
        },
        {
            pitch: 'Ab3',
        },
        false,
        {
            pitch: 'A3',
        },
        false,
        {
            pitch: 'C#3',
        },
        false,
        {
            pitch: 'F3',
        },
    ],
    SynthC: [
        false,
        false,
        {
            pitch: 'Bb2',
        },
        false,
        {
            pitch: 'A2',
        },
        false,
        {
            pitch: 'Eb2',
        },
        false,
        {
            pitch: 'G2',
        },
        false,
        {
            pitch: 'Ab2',
        },
        false,
        {
            pitch: 'D2',
        },
        false,
        {
            pitch: 'D2',
        },
        false,
        {
            pitch: 'E2',
        },
    ],
};
