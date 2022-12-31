import {
    calculateAttackValueFromPercentage,
    calculateDecayValueFromPercentage,
    calculatePercentageFromAttackValue,
    calculatePercentageFromDecayValue,
    calculatePercentageFromSustainValue,
    calculateSustainValueFromPercentage
} from '@lib/envelopeHelpers';
import { randomBetween } from '@lib/misc';
import { generateRandomLoop } from '@lib/trackHelpers';
import { useMemo } from 'react';
import useTrackStore from 'src/stores/useTrackStore';
import { OmniOscillatorOptions } from 'tone';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import shallow from 'zustand/shallow';
import { PitchOptions } from './PitchOptions';

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

export default function Tracks() {
    const { tracks, updateInstrument, updateLoop } = useTrackStore(
        (state) => ({
            tracks: state.tracks,
            updateInstrument: state.updateInstrument,
            updateLoop: state.updateLoop,
        }),
        shallow,
    );

    const pitchOptions = useMemo(() => <PitchOptions />, []);

    return (
        <section className="flex flex-col items-start w-full">
            {tracks.map((track) => {
                const muted = track.instrumentConfig.gain === 0;

                return (
                    <article className="flex flex-col gap-2 w-full mb-8" key={track.id}>
                        <h2 className="mr-2 font-bold">{track.id}</h2>

                        <div className="flex justify-between">
                            <label>
                                <span>Oscillator</span>
                                <select
                                    defaultValue={
                                        track.instrumentConfig.synthOptions.oscillator?.type ??
                                        track.instrument.synth.oscillator.type
                                    }
                                    onChange={(event) => {
                                        const value = event.target.value;

                                        if (value) {
                                            updateInstrument(track.id, {
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
                                        Number(
                                            track.instrumentConfig.synthOptions?.envelope?.attack ??
                                                track.instrument.synth.envelope.attack,
                                        ),
                                    )}
                                    onChange={(event) => {
                                        const value = Number(event.target.value);
                                        const attack = calculateAttackValueFromPercentage(value);

                                        if (value >= 0) {
                                            updateInstrument(track.id, {
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
                                        Number(
                                            track.instrumentConfig.synthOptions?.envelope?.decay ??
                                                track.instrument.synth.envelope.decay,
                                        ),
                                    )}
                                    onChange={(event) => {
                                        const value = Number(event.target.value);
                                        const decay = calculateDecayValueFromPercentage(value);

                                        if (value >= 0) {
                                            updateInstrument(track.id, {
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
                                        track.instrumentConfig.synthOptions?.envelope?.sustain ??
                                            track.instrument.synth.envelope.sustain,
                                    )}
                                    onChange={(event) => {
                                        const value = Number(event.target.value);
                                        const sustain = calculateSustainValueFromPercentage(value);

                                        if (value >= 0) {
                                            updateInstrument(track.id, {
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
                                    updateInstrument(track.id, {
                                        gain: muted ? 0.9 : 0,
                                    });
                                }}
                            >
                                {muted ? 'Unmute' : 'Mute'}
                            </button>
                        </div>

                        <div className="flex">
                            <div className="flex-1 flex">
                                {track.loop.map((step, idx, array) => {
                                    return (
                                        <div key={`${step}.${idx}`} className="flex flex-col">
                                            <select
                                                className="flex justify-center items-center border border-green-400 w-14 h-10 p-1 text-sm"
                                                defaultValue={step ? step.pitch : undefined}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    const newLoop = [...array];
                                                    newLoop[idx] = value !== '--' ? { pitch: value } : false;

                                                    updateLoop(track.id, newLoop);
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

                                            updateLoop(track.id, loop);
                                        }}
                                    >
                                        Randomise
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}
