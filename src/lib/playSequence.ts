import { Time } from 'tone/build/esm/core/type/Units';
import { Instruments, Patterns } from '../types/sequencer';
import { TrackTitlesArray } from '../types/tracks';

let counter = 0;

export const playSequence = (patterns: Patterns, instruments: Instruments, time: Time): void => {
    TrackTitlesArray.forEach((track) => {
        const pattern = patterns[track];
        const instrument = instruments[track];

        const step = counter % pattern.length;

        const currentNote = pattern[step];

        if (currentNote) {
            const { pitch } = currentNote;

            instrument.triggerAttackRelease(pitch, '16n', time);
        }
    });

    counter += 1;
};
