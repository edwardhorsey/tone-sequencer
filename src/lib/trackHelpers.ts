import { Loop } from '@lib/types/sequencer';

const pitches = ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'];

export const pitchesByOctaves: string[] = ['5', '4', '3', '2'].reduce((acc: string[], octave) => {
    acc.push(...pitches.map((pitch) => `${pitch}${octave}`));

    return acc;
}, []);

export function generateRandomLoop(octave = 3) {
    // Length of loop
    const division = Math.round(Math.random() * 15) + 2;
    const loop: Loop = [];

    for (let i = 0; i < division; i += 1) {
        // 40% chance
        if (Math.random() > 0.6) {
            const pitch = pitches[Math.round(Math.random() * (pitches.length - 1))] + String(octave);

            loop.push([{ pitch }]);
        } else {
            loop.push([]);
        }
    }

    return loop;
}
