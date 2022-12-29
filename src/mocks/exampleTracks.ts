import { Loop } from '@lib/types/sequencer';
import { TrackNameType } from '@lib/types/tracks';
import { SynthOptions } from 'tone';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';

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

export const initialLoops: {
    [key in TrackNameType]: Loop;
} = {
    SynthA: [
        false,
        false,
        {
            pitch: 'G5',
        },
        {
            pitch: 'C5',
        },
        false,
        {
            pitch: 'G5',
        },
    ],
    SynthB: [
        false,
        false,
        {
            pitch: 'A3',
        },
        false,
        {
            pitch: 'F3',
        },
        false,
        {
            pitch: 'F3',
        },
        false,
        {
            pitch: 'C#3',
        },
        false,
        {
            pitch: 'G3',
        },
        false,
        {
            pitch: 'Eb3',
        },
        false,
        {
            pitch: 'Gb3',
        },
    ],
    SynthC: [
        false,
        false,
        {
            pitch: 'A2',
        },
        false,
        {
            pitch: 'Gb2',
        },
        false,
        {
            pitch: 'A2',
        },
        false,
        {
            pitch: 'A2',
        },
        false,
        {
            pitch: 'F2',
        },
        false,
        {
            pitch: 'D2',
        },
        false,
        {
            pitch: 'A2',
        },
        false,
        {
            pitch: 'Bb2',
        },
    ],
};

export const initialInstrumentsConfig: {
    [key in TrackNameType]: RecursivePartial<SynthOptions>;
} = {
    [TrackNameType.SynthA]: {
        oscillator: {
            type: 'fattriangle',
        },
    },
    [TrackNameType.SynthB]: {
        oscillator: {
            type: 'fmsine',
        },
    },
    [TrackNameType.SynthC]: {
        oscillator: {
            type: 'fmsine',
        },
    },
};
