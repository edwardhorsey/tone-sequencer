import { Loop, SamplerConfig, SynthConfig } from '@lib/types/sequencer';
import { TrackNameType } from '@lib/types/tracks';

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

export const initialLoops: {
    [TrackNameType.SynthA]: Loop;
    [TrackNameType.SynthB]: Loop;
    [TrackNameType.SynthC]: Loop;
    [TrackNameType.SamplerA]: Loop;
} = {
    SynthA: [[], [{ pitch: 'F2' }], [], [], [], [{ pitch: 'F2' }]],
    SynthB: [[], [], [{ pitch: 'Eb3' }], [], [{ pitch: 'G3' }], [{ pitch: 'Eb3' }], [], [{ pitch: 'Bb3' }]],
    SynthC: [
        [],
        [],
        [{ pitch: 'F3' }],
        [],
        [{ pitch: 'Gb3' }],
        [],
        [{ pitch: 'A3' }],
        [],
        [{ pitch: 'C#3' }],
        [],
        [{ pitch: 'Gb3' }],
    ],
    SamplerA: [
        [{ pitch: 'C2' }],
        [],
        [{ pitch: 'D2' }],
        [{ pitch: 'D2' }],
        [{ pitch: 'C2' }],
        [],
        [{ pitch: 'C2' }],
        [{ pitch: 'D2' }],
        [{ pitch: 'C2' }],
        [{ pitch: 'E2' }],
        [{ pitch: 'D2' }],
        [],
        [{ pitch: 'C2' }],
        [{ pitch: 'D2' }],
        [{ pitch: 'C2' }],
        [{ pitch: 'D2' }],
    ],
};

export const initialSynthConfig: {
    [TrackNameType.SynthA]: SynthConfig;
    [TrackNameType.SynthB]: SynthConfig;
    [TrackNameType.SynthC]: SynthConfig;
} = {
    [TrackNameType.SynthA]: {
        synthOptions: {
            oscillator: {
                type: 'fattriangle',
            },
            envelope: {
                attack: 0.08,
                decay: 1.297,
                sustain: 0.76,
            },
        },
        gain: 0.8,
    },
    [TrackNameType.SynthB]: {
        synthOptions: {
            oscillator: {
                type: 'fmsine',
            },
            envelope: {
                attack: 0.001,
                decay: 0.157,
                sustain: 0,
            },
        },
        gain: 0,
    },
    [TrackNameType.SynthC]: {
        synthOptions: {
            oscillator: {
                type: 'fmsine',
            },
            envelope: {
                attack: 0.001,
                decay: 0.1,
                sustain: 0,
            },
        },
        gain: 0.8,
    },
};

export const initialSamplerConfig: {
    [TrackNameType.SamplerA]: SamplerConfig;
} = {
    [TrackNameType.SamplerA]: {
        samplerOptions: {
            urls: {
                C2: 'samples/wa_808tape_kick_26_sat2.wav',
                D2: 'samples/wa_808tape_closedhat_04_sat.wav',
                E2: 'samples/wa_808tape_clap_01_sat.wav',
            },
        },
        gain: 0.9,
    },
};
