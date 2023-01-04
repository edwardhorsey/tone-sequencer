import {
    calculateAttackValueFromPercentage,
    calculateDecayValueFromPercentage,
    calculatePercentageFromAttackValue,
    calculatePercentageFromDecayValue,
    calculatePercentageFromSustainValue,
    calculateSustainValueFromPercentage,
} from '@lib/envelopeHelpers';
import { randomBetween } from '@lib/misc';
import { generateRandomLoop } from '@lib/trackHelpers';
import { BaseInstrumentSynth, Loop, SynthConfig } from '@lib/types/sequencer';
import { TrackNameType } from '@lib/types/tracks';
import useTrackStore from 'src/stores/useTrackStore';

import { OmniOscillatorOptions } from 'tone';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import shallow from 'zustand/shallow';
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

interface SynthTrackProps {
    loop: Loop;
    id: TrackNameType;
    instrumentConfig: SynthConfig;
    instrument: BaseInstrumentSynth;
    muted: boolean;
    pitchOptions: JSX.Element;
}

export default function SynthTrack({ loop, id, instrumentConfig, instrument, muted, pitchOptions }: SynthTrackProps) {
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

            <div className="flex justify-between">
                <label>
                    <span>Oscillator</span>
                    <select
                        defaultValue={
                            instrumentConfig.synthOptions.oscillator?.type ?? instrument.synth.oscillator.type
                        }
                        onChange={(event) => {
                            const value = event.target.value;

                            if (value) {
                                updateInstrument(id, {
                                    synthOptions: {
                                        oscillator: {
                                            type: event.target.value,
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
                            Number(instrumentConfig.synthOptions?.envelope?.attack ?? instrument.synth.envelope.attack),
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
                            Number(instrumentConfig.synthOptions?.envelope?.decay ?? instrument.synth.envelope.decay),
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
                            instrumentConfig.synthOptions?.envelope?.sustain ?? instrument.synth.envelope.sustain,
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
                    {loop.map((step, idx, array) => {
                        return (
                            <div key={`${step}.${idx}`} className="flex flex-col">
                                <select
                                    className="flex justify-center items-center border border-green-400 w-14 h-10 p-1 text-sm"
                                    defaultValue={step ? step.pitch : undefined}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        const newLoop = [...array];
                                        newLoop[idx] = value !== '--' ? { pitch: value } : false;

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
            </div>
        </article>
    );
}
