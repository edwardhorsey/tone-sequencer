import { InstrumentType } from '@lib/types/tracks';
import useTrackStore from '@stores/useTrackStore';
import { useMemo } from 'react';
import shallow from 'zustand/shallow';
import { PitchOptions } from './PitchOptions';
import SamplerTrack from './SamplerTrack';
import SynthTrack from './SynthTrack';

export default function Tracks() {
    const tracks = useTrackStore((state) => state.tracks, shallow);
    const pitchOptions = useMemo(() => <PitchOptions />, []);

    return (
        <section className="flex flex-col items-start w-full lg:min-w-[1080px] py-6">
            {tracks.map((track) => {
                if (track.instrumentType === InstrumentType.Sampler)
                    return <SamplerTrack key={track.id} id={track.id} />;

                return <SynthTrack key={track.id} id={track.id} pitchOptions={pitchOptions} />;
            })}
        </section>
    );
}
