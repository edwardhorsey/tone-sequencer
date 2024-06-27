import { muteSelector, trackSelector } from '@lib/selectors';
import { Loop } from '@lib/types/sequencer';
import { TrackNameReadable, TrackNameType } from '@lib/types/tracks';
import useTrackStore from '@stores/trackStore';
import { Frequency } from 'tone/build/esm/core/type/Units';
import shallow from 'zustand/shallow';

function emptySamplerLoop(): Loop {
    return Array.from({ length: 16 }, () => []);
}

interface SamplerTrackProps {
    id: TrackNameType;
}

const SamplerFrequencyNameReadable: Record<Frequency, string> = {
    C2: 'Kick',
    D2: 'Hi-Hat',
    E2: 'Clap',
};

export default function SamplerTrack({ id }: SamplerTrackProps) {
    const [updateInstrument, updateLoop] = useTrackStore(
        (state) => [state.updateInstrument, state.updateLoop],
        shallow,
    );
    const { loop, instrumentConfig } = useTrackStore(trackSelector(id), shallow);
    const muted = useTrackStore(muteSelector(id));

    if (!loop || !instrumentConfig) {
        return null;
    }

    return (
        <article className="flex flex-col gap-2 w-full mb-8 bg-zinc-100 p-4 rounded-md">
            <div className="flex justify-end gap-12 mb-4">
                <h2 className="font-bold mr-auto">{TrackNameReadable[id]}</h2>
                <button
                    type="button"
                    className="w-28 text-center py-1 px-4 border border-black rounded-md bg-white"
                    onClick={() => {
                        updateInstrument(id, {
                            gain: muted ? 0.9 : 0,
                        });
                    }}
                >
                    {muted ? 'Unmute' : 'Mute'}
                </button>
            </div>

            <div className="flex">
                <div className="flex-1 flex">
                    <div className="flex flex-col w-14 h-24 justify-between">
                        {['C2', 'D2', 'E2'].map((pitch, idx) => {
                            return (
                                <span className="h-5" key={`labels-${pitch}.${idx}`}>
                                    {SamplerFrequencyNameReadable[pitch]}
                                </span>
                            );
                        })}
                    </div>

                    {loop.map((step, idx) => {
                        return (
                            <div
                                key={`${step}.${idx}`}
                                className="flex flex-col w-14 h-24 justify-between items-center"
                            >
                                {['C2', 'D2', 'E2'].map((pitch) => {
                                    return (
                                        <input
                                            key={`checkboxes-${pitch}.${idx}`}
                                            className="h-5 w-5 block"
                                            type="checkbox"
                                            checked={step.some((note) => note.pitch === pitch)}
                                            value={pitch}
                                            onChange={(event) => {
                                                const pitch = event.target.value;
                                                const newLoop = [...loop];

                                                if (!newLoop[idx].map((pitch) => pitch.pitch).includes(pitch)) {
                                                    newLoop[idx].push({ pitch });
                                                } else {
                                                    newLoop[idx] = newLoop[idx].filter((note) => note.pitch !== pitch);
                                                }

                                                updateLoop(id, newLoop);
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}

                    <button
                        type="button"
                        className="w-28 text-center py-1 px-4 border boborder-black bg-white rounded-md ml-auto self-start"
                        onClick={() => {
                            updateLoop(id, emptySamplerLoop());
                        }}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </article>
    );
}
