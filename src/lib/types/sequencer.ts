import Tone from '@lib/tone';
import { InstrumentType, TrackNameType } from '@lib/types/tracks';
import { Gain, Sampler, SamplerOptions, SynthOptions } from 'tone';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';

interface Note {
    pitch: string;
}

export type Loop = Note[][];

export type Loops = {
    [key in TrackNameType]?: Loop;
};

export type Instrument = Tone.Synth;

export type Instruments = {
    [key in TrackNameType]: Instrument; // Should be Instrument | Sampler
};

export interface ToneInstrumentSynth {
    synth: Instrument;
    gain: Gain;
}

export type SynthConfig = {
    synthOptions: RecursivePartial<SynthOptions>;
    gain: number;
};

export interface ToneInstrumentSampler {
    sampler: Sampler;
    gain: Gain;
}

export type SamplerConfig = {
    samplerOptions: RecursivePartial<SamplerOptions>;
    gain: number;
};

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

interface BaseTrack {
    id: TrackNameType;
    loop: Loop;
}

export type Track = (BaseTrack & BaseTrackSynth) | (BaseTrack & BaseTrackSampler);
