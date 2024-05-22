import {
    calculateAttackValueFromPercentage,
    calculateDecayValueFromPercentage,
    calculatePercentageFromAttackValue,
    calculatePercentageFromDecayValue,
    calculatePercentageFromSustainValue,
    calculateSustainValueFromPercentage,
} from '@lib/envelopeHelpers';
import { randomBetween } from '@lib/misc';
import { muteSelector, trackSelector } from '@lib/selectors';
import { generateRandomLoop } from '@lib/trackHelpers';
import { SamplerConfig, SynthConfig } from '@lib/types/sequencer';
import { TrackNameType } from '@lib/types/tracks';
import useTrackStore from '@stores/useTrackStore';
import { OmniOscillatorOptions } from 'tone';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import { OmniOscillatorType } from 'tone/build/esm/source/oscillator/OscillatorInterface';
import shallow from 'zustand/shallow';

const omniOscillatorTypes: OmniOscillatorType[] = [
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

interface SynthTrackProps {
    id: TrackNameType;
    pitchOptions: JSX.Element;
}

function isSynthConfig(config: SynthConfig | SamplerConfig): config is SynthConfig {
    return config.hasOwnProperty('synthOptions');
}

export default function SynthTrack({ id, pitchOptions }: SynthTrackProps) {
    const [updateInstrument, updateLoop] = useTrackStore(
        (state) => [state.updateInstrument, state.updateLoop],
        shallow,
    );
    const { loop, instrumentConfig } = useTrackStore(trackSelector(id), shallow);
    const muted = useTrackStore(muteSelector(id), shallow);

    if (!loop || !instrumentConfig || !isSynthConfig(instrumentConfig)) {
        return null;
    }

    return (
        <article className="flex flex-col gap-2 w-full mb-8">
            <h2 className="mr-2 font-bold">{id}</h2>
            <div className="flex justify-between">
                <label>
                    <select
                        defaultValue={instrumentConfig.synthOptions.oscillator?.type}
                        onChange={(event) => {
                            const value = event.target.value;

                            if (value) {
                                updateInstrument(id, {
                                    synthOptions: {
                                        oscillator: {
                                            type: value,
                                        },
                                    } as RecursivePartial<OmniOscillatorOptions>,
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
                </label>

                <label>
                    <span>Attack</span>
                    <input
                        type="range"
                        defaultValue={calculatePercentageFromAttackValue(
                            Number(instrumentConfig.synthOptions?.envelope?.attack ?? 0.1),
                        )}
                        onChange={(event) => {
                            const value = Number(event.target.value);
                            const attack = calculateAttackValueFromPercentage(value);

                            if (value >= 0) {
                                updateInstrument(id, {
                                    synthOptions: {
                                        envelope: { attack },
                                    },
                                });
                            }
                        }}
                    />
                </label>

                <label>
                    <span>Decay</span>
                    <input
                        type="range"
                        defaultValue={calculatePercentageFromDecayValue(
                            Number(instrumentConfig.synthOptions?.envelope?.decay ?? 0.1),
                        )}
                        onChange={(event) => {
                            const value = Number(event.target.value);
                            const decay = calculateDecayValueFromPercentage(value);

                            if (value >= 0) {
                                updateInstrument(id, {
                                    synthOptions: {
                                        envelope: { decay },
                                    },
                                });
                            }
                        }}
                    />
                </label>

                <label>
                    <span>Sustain</span>
                    <input
                        type="range"
                        defaultValue={calculatePercentageFromSustainValue(
                            Number(instrumentConfig.synthOptions?.envelope?.sustain ?? 0.1),
                        )}
                        onChange={(event) => {
                            const value = Number(event.target.value);
                            const sustain = calculateSustainValueFromPercentage(value);

                            if (value >= 0) {
                                updateInstrument(id, {
                                    synthOptions: {
                                        envelope: { sustain },
                                    },
                                });
                            }
                        }}
                    />
                </label>

                <button
                    type="button"
                    className="w-16"
                    onClick={() => {
                        updateInstrument(id, {
                            gain: muted ? 0.9 : 0,
                        });
                    }}
                >
                    {muted ? 'Unmute' : 'Mute'}
                </button>
            </div>

            <div className="flex-1 flex pt-4 pl-14">
                {loop.map((step, idx, array) => {
                    return (
                        <div key={`${step}.${idx}`} className="flex flex-col">
                            <select
                                className="flex justify-center items-center border w-14 h-8 p-1 text-xs"
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
                        className="ml-2"
                        type="button"
                        onClick={() => {
                            const loop = generateRandomLoop(randomBetween(2, 5));

                            updateLoop(id, loop);
                        }}
                    >
                        Randomise
                    </button>
                </div>
            </div>
        </article>
    );
}
