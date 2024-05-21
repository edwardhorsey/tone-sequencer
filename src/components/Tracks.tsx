import { InstrumentType } from '@lib/types/tracks';
import { useMemo } from 'react';
import useTrackStore from 'src/stores/useTrackStore';
import shallow from 'zustand/shallow';
import { PitchOptions } from './PitchOptions';
import SamplerTrack from './SamplerTrack';
import SynthTrack from './SynthTrack';

export default function Tracks() {
    // const tracks = useTrackStore((state) => state.tracks, shallow);
    const { tracks } = useTrackStore(
        (state) => ({
            tracks: state.tracks,
        }),
        shallow,
    );

    const pitchOptions = useMemo(() => <PitchOptions />, []);

    console.log('tracks are rendered');

    return (
        <section className="flex flex-col items-start w-full lg:min-w-[1080px]">
            {tracks.map((track) => {
                if (track.instrumentType === InstrumentType.Sampler)
                    return (
                        <SamplerTrack
                            key={track.id}
                            id={track.id}
                            loop={track.loop}
                            instrumentConfig={track.instrumentConfig}
                        />
                    );

                return (
                    <SynthTrack
                        key={track.id}
                        id={track.id}
                        loop={track.loop}
                        pitchOptions={pitchOptions}
                        instrument={track.instrument}
                        instrumentConfig={track.instrumentConfig}
                    />
                );
            })}
        </section>
    );
}
