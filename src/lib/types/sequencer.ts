import Tone from '@lib/tone';
import { TrackNameType } from '@lib/types/tracks';
import { Gain, SynthOptions } from 'tone';
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

export type InstrumentConfig = {
    synthOptions: RecursivePartial<SynthOptions>;
    gain: number;
};

export interface Track {
    id: TrackNameType;
    instrumentConfig: InstrumentConfig;
    instrument: {
        synth: Instrument;
        gain: Gain;
    };
    loop: Loop;
}
