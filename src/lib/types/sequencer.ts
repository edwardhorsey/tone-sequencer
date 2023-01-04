import Tone from '@lib/tone';
import { InstrumentType, TrackNameType } from '@lib/types/tracks';
import { Gain, Sampler, SamplerOptions, SynthOptions } from 'tone';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';

interface Note {
    pitch: string;
}

export type Loop = (Note | false)[];

export type Loops = {
    [key in TrackNameType]?: Loop;
};

export type Instrument = Tone.Synth;

export type Instruments = {
    [key in TrackNameType]: Instrument;
};

export type SynthConfig = {
    synthOptions: RecursivePartial<SynthOptions>;
    gain: number;
};

export type SamplerConfig = {
    samplerOptions: RecursivePartial<SamplerOptions>;
    gain: number;
};

export interface BaseInstrumentSampler {
    sampler: Sampler;
    gain: Gain;
}

export interface BaseInstrumentSynth {
    synth: Instrument;
    gain: Gain;
}

interface BaseTrackSynth {
    instrumentType: InstrumentType.Synth;
    instrumentConfig: SynthConfig;
    instrument: BaseInstrumentSynth;
    loop: Loop;
}

interface BaseTrackSampler {
    instrumentType: InstrumentType.Sampler;
    instrumentConfig: SamplerConfig;
    instrument: BaseInstrumentSampler;
}

interface BaseTrack {
    id: TrackNameType;
    loop: Loop;
}

export type Track = (BaseTrack & BaseTrackSynth) | (BaseTrack & BaseTrackSampler);
