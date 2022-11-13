import { useMemo } from 'react';
import { useTracks } from 'src/contexts/TracksContext';
import { TrackNamesArray } from 'src/types/tracks';

export default function DisplayLoops() {
    const { loops } = useTracks();

    const loopsMemoised = useMemo(
        () =>
            TrackNamesArray.map((trackName) => {
                const loop = loops[trackName];

                if (loop) {
                    return (
                        <article className="flex" key={trackName}>
                            <h2 className="mr-2">{trackName}</h2>
                            {loop.map((step) =>
                                step ? (
                                    <span className="flex justify-center items-center border border-green-400 w-6 h-6 p-1">
                                        {step.pitch}
                                    </span>
                                ) : (
                                    <span className="flex justify-center items-center border border-green-400 w-6 h-6 p-1">
                                        0
                                    </span>
                                ),
                            )}
                        </article>
                    );
                }

                return undefined;
            }),
        [loops],
    );

    return <section className="flex flex-col items-start w-full">{loopsMemoised}</section>;
}
