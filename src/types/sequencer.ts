import Tone from '../lib/tone';
import { TrackTitle } from './tracks';

interface Note {
  pitch: string;
}

export type Pattern = (Note|false)[]

export type Patterns = {
  [key in TrackTitle]: Pattern;
}

type Instrument = Tone.Synth

export type Instruments = {
  [key in TrackTitle]: Instrument;
}

export interface Track {
  pattern: Pattern;
  instrument: Instrument;
}
