import { Track } from '@lib/types/sequencer';
import { InstrumentType } from '@lib/types/tracks';
import { Time } from 'tone/build/esm/core/type/Units';

let counter = 0;

export const playSequenceInStore = (tracks: Track[], time: Time): void => {
    tracks.forEach((track) => {
        const { instrument, instrumentType, loop } = track;
        const step = counter % loop.length;
        const currentStep = loop[step];

        for (const note of currentStep) {
            const { pitch } = note;
            if (instrumentType === InstrumentType.Sampler) {
                instrument.sampler.triggerAttackRelease(pitch, '16n', time);
            } else if (instrumentType === InstrumentType.Synth) {
                instrument.synth.triggerAttackRelease(pitch, '16n', time);
            }
        }
    });

    counter += 1;
};
