import { Loop } from '@lib/types/sequencer';
import { TrackNameType } from '@lib/types/tracks';
import useTrackStore from 'src/stores/useTrackStore';

import shallow from 'zustand/shallow';

interface SamplerTrackProps {
    loop: Loop;
    id: TrackNameType;
    // instrumentConfig: SynthConfig;
    // instrument: BaseInstrumentSynth;
    muted: boolean;
    pitchOptions: JSX.Element;
}

export default function SamplerTrack({ loop, id, muted, pitchOptions }: SamplerTrackProps) {
    const { updateInstrument, updateLoop } = useTrackStore(
        (state) => ({
            updateInstrument: state.updateInstrument,
            updateLoop: state.updateLoop,
        }),
        shallow,
    );

    return (
        <article className="flex flex-col gap-2 w-full mb-8">
            <h2 className="mr-2 font-bold">{id}</h2>

            <div className="flex justify-end">
                <button
                    type="button"
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
                                    {pitch}
                                </span>
                            );
                        })}
                    </div>
                    {loop.map((step, idx, array) => {
                        return (
                            <div key={`${step}.${idx}`} className="flex flex-col w-14 h-24 justify-between">
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
                                                console.log(newLoop, 'clicked ', pitch, ' at ', idx, ' step ', step);

                                                if (!newLoop[idx].map((pitch) => pitch.pitch).includes(pitch)) {
                                                    newLoop[idx].push({ pitch });
                                                } else {
                                                    newLoop[idx] = newLoop[idx].filter((note) => note.pitch !== pitch);
                                                }

                                                console.log(newLoop);

                                                updateLoop(id, newLoop);
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </article>
    );
}
