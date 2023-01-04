import { InstrumentType } from '@lib/types/tracks';
import { useMemo } from 'react';
import useTrackStore from 'src/stores/useTrackStore';
import shallow from 'zustand/shallow';
import { PitchOptions } from './PitchOptions';
import SynthTrack from './SynthTrack';

export default function Tracks() {
    const { tracks } = useTrackStore(
        (state) => ({
            tracks: state.tracks,
        }),
        shallow,
    );

    const pitchOptions = useMemo(() => <PitchOptions />, []);

    return (
        <section className="flex flex-col items-start w-full">
            {tracks.map((track) => {
                const muted = track.instrumentConfig.gain === 0;

                if (track.instrumentType === InstrumentType.Sampler) return undefined;

                return (
                    <SynthTrack
                        key={track.id}
                        id={track.id}
                        loop={track.loop}
                        pitchOptions={pitchOptions}
                        muted={muted}
                        instrument={track.instrument}
                        instrumentConfig={track.instrumentConfig}
                    />
                );
            })}
        </section>
    );
}
