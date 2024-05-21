import { InstrumentType, TrackNameType } from '@lib/types/tracks';
import { Gain, Sampler, SamplerOptions, Synth, SynthOptions } from 'tone';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';

interface Note {
    pitch: string;
}

type Step = Note[];

export type Loop = Step[];

export type Loops = {
    [key in TrackNameType]?: Loop;
};

// Synth
export interface ToneInstrumentSynth {
    synth: Synth;
    gain: Gain;
}

export type SynthConfig = {
    synthOptions: RecursivePartial<SynthOptions>;
    gain: number;
};

// Sampler
export interface ToneInstrumentSampler {
    sampler: Sampler;
    gain: Gain;
}

export type SamplerConfig = {
    samplerOptions: RecursivePartial<SamplerOptions>;
    gain: number;
};

interface BaseTrack {
    id: TrackNameType;
    loop: Loop;
}

// Track
interface BaseTrackSynth {
    instrumentType: InstrumentType.Synth;
    instrumentConfig: SynthConfig;
    instrument: ToneInstrumentSynth;
}

interface BaseTrackSampler {
    instrumentType: InstrumentType.Sampler;
    instrumentConfig: SamplerConfig;
    instrument: ToneInstrumentSampler;
}

export type Track = BaseTrack & (BaseTrackSynth | BaseTrackSampler);
