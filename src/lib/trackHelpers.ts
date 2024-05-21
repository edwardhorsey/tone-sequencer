import { Loop } from '@lib/types/sequencer';

const pitches = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export const pitchesByOctaves: string[] = ['5', '4', '3', '2'].reduce((acc: string[], octave) => {
    return acc.concat(pitches.map((pitch) => `${pitch}${octave}`));
}, []);

export function generateRandomLoop(octave = 3) {
    const division = Math.round(Math.random() * 15) + 2;
    const loop: Loop = [];

    for (let i = 0; i < division; i += 1) {
        // 40% chance of a note
        if (Math.random() > 0.6) {
            const pitch = pitches[Math.round(Math.random() * (pitches.length - 1))] + String(octave);

            loop.push([{ pitch }]);
        } else {
            loop.push([]);
        }
    }

    return loop;
}
