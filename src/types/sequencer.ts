import Tone from '../lib/tone';

interface Note {
  pitch: string;
}

export type Pattern = (Note|false)[]

type Instrument = Tone.MonoSynth | Tone.FMSynth | Tone.AMSynth

export interface Track {
  pattern: Pattern;
  instrument: Instrument;
}
