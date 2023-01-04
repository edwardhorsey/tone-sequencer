import { Track } from '@lib/types/sequencer';
import { Time } from 'tone/build/esm/core/type/Units';
import { InstrumentType } from './types/tracks';

let counter = 0;

export const playSequenceInStore = (tracks: Track[], time: Time): void => {
    tracks.forEach((track) => {
        const { loop } = track;

        if (loop) {
            const { instrument, instrumentType } = track;
            const step = counter % loop.length;
            const currentNote = loop[step];

            if (currentNote) {
                const { pitch } = currentNote;

                if (instrumentType === InstrumentType.Sampler) {
                    instrument.sampler.triggerAttackRelease(pitch, '16n', time);
                } else if (instrumentType === InstrumentType.Synth) {
                    instrument.synth.triggerAttackRelease(pitch, '16n', time);
                }
            }
        }
    });

    counter += 1;
};
