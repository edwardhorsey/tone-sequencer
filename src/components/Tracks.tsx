import { InstrumentType, TrackNameType } from '@lib/types/tracks';
import { useMemo } from 'react';
import { TrackStore } from 'src/stores/useTrackStore';
import { PitchOptions } from './PitchOptions';
import SamplerTrack from './SamplerTrack';
import SynthTrack from './SynthTrack';
// import { useShallow } from 'zustand/react/shallow';

const selector = (state: TrackStore) =>
    state.tracks.map((track) => ({ id: track.id, instrumentType: track.instrumentType }));

export default function Tracks() {
    // const tracks = useTrackStore(selector, shallow);
    const tracks = [
        {
            "id": TrackNameType.SynthA,
            "instrumentType": InstrumentType.Synth
        },
        {
            "id": TrackNameType.SynthB,
            "instrumentType": InstrumentType.Synth
        },
        {
            "id": TrackNameType.SynthC,
            "instrumentType": InstrumentType.Synth
        },
        {
            "id": TrackNameType.SamplerA,
            "instrumentType": InstrumentType.Sampler
        }
    ]

    // return <>tracks</>;

    const pitchOptions = useMemo(() => <PitchOptions />, []);

    console.log('tracks rendered', tracks);

    return (
        <section className="flex flex-col items-start w-full lg:min-w-[1080px]">
            {tracks.map((track) => {
                // const muted = track.instrumentConfig.gain === 0;

                if (track.instrumentType === InstrumentType.Sampler)
                    return (
                        <SamplerTrack
                            key={track.id}
                            id={track.id}
                            // loop={track.loop}
                            // muted={muted}
                        />
                    );

                return (
                    <SynthTrack
                        key={track.id}
                        id={track.id}
                        // loop={track.loop}
                        pitchOptions={pitchOptions}
                        // muted={muted}
                        // instrument={track.instrument}
                        // instrumentConfig={track.instrumentConfig}
                    />
                );
            })}
        </section>
    );
}
