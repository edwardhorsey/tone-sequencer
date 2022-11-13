import { Time } from 'tone/build/esm/core/type/Units';
import { Instruments, Loops } from '../types/sequencer';
import { TrackNamesArray } from '../types/tracks';

let counter = 0;

export const playSequence = (loops: Loops, instruments: Instruments, time: Time): void => {
    TrackNamesArray.forEach((track) => {
        const loop = loops[track];

        if (loop) {
            const instrument = instruments[track];
            const step = counter % loop.length;
            const currentNote = loop[step];

            if (currentNote) {
                const { pitch } = currentNote;

                instrument.triggerAttackRelease(pitch, '16n', time);
            }
        }
    });

    counter += 1;
};
