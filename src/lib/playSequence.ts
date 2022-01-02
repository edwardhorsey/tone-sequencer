import { Time } from 'tone/build/esm/core/type/Units';
import { Track } from '../types/sequencer';

let counter = 0;

export const playSequence = (tracks: Track[], time: Time): void => {
  tracks.forEach((currentTrack) => {
    const { pattern, instrument } = currentTrack;

    const step = counter % pattern.length;
    const currentNote = pattern[step];

    if (currentNote) {
      const { pitch } = currentNote;

      instrument.triggerAttackRelease(pitch, '16n', time);
    }
  });

  counter += 1;
};
