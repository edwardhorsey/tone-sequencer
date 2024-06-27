import { randomBetween } from '@lib/misc';
import { muteSelector, trackSelector, oscillatorSelector } from '@lib/selectors';
import { generateRandomLoop } from '@lib/trackHelpers';
import { isSynthConfig } from '@lib/typeGuards';
import SynthEnvelopeControl from '@components/SynthEnvelopeControl';
import useTrackStore from '@stores/trackStore';
import shallow from 'zustand/shallow';

import { TrackNameReadable, TrackNameType } from '@lib/types/tracks';

const oscillatorOptions = [
    //OmniFMTypeOscillatorOptions
    'fmsine',
    'fmsquare',
    'fmsawtooth',
    'fmtriangle',
    //OmniAMTypeOscillatorOptions
    'amsine',
    'amsquare',
    'amsawtooth',
    'amtriangle',
    //OmniFatTypeOscillatorOptions
    'fatsine',
    'fatsquare',
    'fatsawtooth',
    'fattriangle',
] as const;

type OscillatorType = typeof oscillatorOptions[number];

export function isOscillatorType(type: string): type is OscillatorType {
    return oscillatorOptions.includes(type as OscillatorType);
}

function generateRandomOscillator(): OscillatorType {
    return oscillatorOptions[Math.floor(Math.random() * oscillatorOptions.length)];
}

interface SynthTrackProps {
    id: TrackNameType;
    pitchOptions: JSX.Element;
}

export default function SynthTrack({ id, pitchOptions }: SynthTrackProps) {
    const [updateInstrument, updateLoop] = useTrackStore(
        (state) => [state.updateInstrument, state.updateLoop],
        shallow,
    );
    const { loop, instrumentConfig } = useTrackStore(trackSelector(id), shallow);
    const muted = useTrackStore(muteSelector(id));
    const oscillator = useTrackStore(oscillatorSelector(id));

    if (!loop || !instrumentConfig || !isSynthConfig(instrumentConfig)) {
        return null;
    }

    return (
        <article className="flex flex-col gap-2 w-full mb-8 bg-zinc-100 p-4 rounded-md">
            <h2 className="mr-2 font-bold mb-4">{TrackNameReadable[id]}</h2>
            <div className="flex justify-between items-start">
                <label className="flex gap-1 items-center">
                    <select
                        className="border border-black rounded-md p-1"
                        value={oscillator}
                        onChange={(event) => {
                            const value = event.target.value;

                            if (isOscillatorType(value)) {
                                updateInstrument(id, {
                                    synthOptions: {
                                        oscillator: {
                                            type: value,
                                        },
                                    },
                                });
                            }
                        }}
                    >
                        {oscillatorOptions.map((oscType) => (
                            <option key={oscType} value={oscType}>
                                {oscType}
                            </option>
                        ))}
                    </select>
                </label>

                <SynthEnvelopeControl type="attack" id={id} />

                <SynthEnvelopeControl type="decay" id={id} />

                <SynthEnvelopeControl type="sustain" id={id} />

                <button
                    type="button"
                    className="w-28 text-center py-1 px-4 border border-black bg-white rounded-md"
                    onClick={() => {
                        updateInstrument(id, {
                            gain: muted ? 0.9 : 0,
                        });
                    }}
                >
                    {muted ? 'Unmute' : 'Mute'}
                </button>
            </div>

            <div className="flex-1 flex gap-1 pt-4 pl-14">
                {loop.map((step, idx, array) => {
                    return (
                        <div key={`${step}.${idx}`} className="flex flex-col">
                            <select
                                className="flex justify-center items-center border border-black w-14 h-8 p-1 text-xs rounded-md"
                                defaultValue={step[0]?.pitch ?? undefined}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    const newLoop = [...array];
                                    newLoop[idx] = value === '--' ? [] : [{ pitch: value }];

                                    updateLoop(id, newLoop);
                                }}
                            >
                                {pitchOptions}
                            </select>
                        </div>
                    );
                })}

                <div className="ml-auto">
                    <button
                        className="w-28 text-center py-1 px-4 border border-black bg-white rounded-md ml-2"
                        type="button"
                        onClick={() => {
                            const loop = generateRandomLoop(randomBetween(2, 5));
                            const oscillator = generateRandomOscillator();

                            updateLoop(id, loop);
                            updateInstrument(id, {
                                synthOptions: {
                                    oscillator: {
                                        type: oscillator,
                                    },
                                },
                            });
                        }}
                    >
                        Randomise
                    </button>
                </div>
            </div>
        </article>
    );
}
