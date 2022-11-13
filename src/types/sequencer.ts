import Tone from '../lib/tone';
import { TrackNameType } from './tracks';

interface Note {
    pitch: string;
}

export type Loop = (Note | false)[];

export type Loops = {
    [key in TrackNameType]?: Loop;
};

type Instrument = Tone.Synth;

export type Instruments = {
    [key in TrackNameType]: Instrument;
};

export interface Track {
    loops: Loop;
    instrument: Instrument;
}
