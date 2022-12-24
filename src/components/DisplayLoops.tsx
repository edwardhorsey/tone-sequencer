import { useMemo } from 'react';
import { useTracks } from 'src/contexts/TracksContext';
import { TrackNamesArray } from 'src/types/tracks';

const omniOscillatorTypes = [
    'fatsine',
    'fatsquare',
    'fatsawtooth',
    'fattriangle',
    'fatcustom',
    'fmsine',
    'fmsquare',
    'fmsawtooth',
    'fmtriangle',
];

export default function DisplayLoops() {
    const { loops, updateInstrument, instrumentsRef } = useTracks();

    const loopsMemoised = useMemo(
        () =>
            TrackNamesArray.map((trackName) => {
                const loop = loops[trackName];

                if (loop) {
                    return (
                        <article className="flex flex-col gap-2" key={trackName}>
                            <div>
                                <h2 className="mr-2">{trackName}</h2>
                                {instrumentsRef && instrumentsRef.current && (
                                    <select
                                        defaultValue={instrumentsRef.current[trackName].oscillator.type}
                                        onChange={(event) => {
                                            const value = event.target.value;

                                            if (value) {
                                                updateInstrument(trackName, {
                                                    oscillator: { type: event.target.value as any },
                                                });
                                            }
                                        }}
                                    >
                                        {omniOscillatorTypes.map((oscType) => (
                                            <option key={oscType} value={oscType}>
                                                {oscType}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div className="flex">
                                {loop.map((step) =>
                                    step ? (
                                        <span className="flex justify-center items-center border border-green-400 w-10 h-6 p-1">
                                            {step.pitch}
                                        </span>
                                    ) : (
                                        <span className="flex justify-center items-center border border-green-400 w-10 h-6 p-1">
                                            0
                                        </span>
                                    ),
                                )}
                            </div>
                        </article>
                    );
                }

                return undefined;
            }),
        [loops, instrumentsRef, updateInstrument],
    );

    return <section className="flex flex-col items-start w-full">{loopsMemoised}</section>;
}
