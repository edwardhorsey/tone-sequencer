import { Loop, SamplerConfig, SynthConfig } from '@lib/types/sequencer';
import { TrackNameType } from '@lib/types/tracks';

export const initialLoops: {
    [TrackNameType.SynthA]: Loop;
    [TrackNameType.SynthB]: Loop;
    [TrackNameType.SynthC]: Loop;
    [TrackNameType.SamplerA]: Loop;
} = {
    SynthA: [
        [],
        [{ pitch: 'F5' }],
        [{ pitch: 'F4' }],
        [{ pitch: 'C4' }],
        [{ pitch: 'Ab4' }],
        [],
        [{ pitch: 'E4' }],
        [{ pitch: 'Eb5' }],
        [{ pitch: 'Bb4' }],
    ],
    SynthB: [[], [], [{ pitch: 'F3' }], [], [{ pitch: 'Bb3' }]],
    SynthC: [[], [], [{ pitch: 'Gb5' }]],
    SamplerA: [
        [{ pitch: 'C2' }, { pitch: 'D2' }],
        [{ pitch: 'D2' }],
        [{ pitch: 'D2' }],
        [{ pitch: 'D2' }],
        [{ pitch: 'D2' }, { pitch: 'C2' }],
        [{ pitch: 'D2' }],
        [{ pitch: 'D2' }, { pitch: 'C2' }],
        [{ pitch: 'D2' }],
        [{ pitch: 'D2' }, { pitch: 'C2' }, { pitch: 'E2' }],
        [{ pitch: 'D2' }],
        [{ pitch: 'D2' }],
        [{ pitch: 'D2' }, { pitch: 'E2' }],
        [{ pitch: 'D2' }, { pitch: 'C2' }],
        [{ pitch: 'D2' }],
        [{ pitch: 'D2' }, { pitch: 'C2' }],
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
                type: 'fatsawtooth',
            },
            envelope: {
                attack: 0.001,
                decay: 0.157,
                sustain: 0,
            },
        },
        gain: 0.8,
    },
    [TrackNameType.SynthB]: {
        synthOptions: {
            oscillator: {
                type: 'fatsquare',
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
                decay: 0.138,
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
        gain: 0.0,
    },
};
