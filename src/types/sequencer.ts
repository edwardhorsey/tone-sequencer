import Tone from '../lib/tone';
import { TrackNameType } from './tracks';

interface Note {
  pitch: string;
}

export type Pattern = (Note|false)[]

export type Patterns = {
  [key in TrackNameType]: Pattern;
}

type Instrument = Tone.Synth

export type Instruments = {
  [key in TrackNameType]: Instrument;
}

export interface Track {
  pattern: Pattern;
  instrument: Instrument;
}
