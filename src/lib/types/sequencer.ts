import Tone from '@lib/tone';
import { TrackNameType } from '@lib/types/tracks';

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

export interface Track {
    id: TrackNameType;
    instrument: Instrument;
    loop: Loop;
}
