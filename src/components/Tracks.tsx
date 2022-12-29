import {
    calculateAttackValueFromPercentage,
    calculateDecayValueFromPercentage,
    calculatePercentageFromAttackValue,
    calculatePercentageFromDecayValue,
    calculatePercentageFromSustainValue,
    calculateSustainValueFromPercentage
} from '@lib/envelopeHelpers';
import { useMemo } from 'react';
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

export default function Tracks() {
    const { tracks, updateInstrument } = useTrackStore(
        (state) => ({
            tracks: state.tracks,
            updateInstrument: state.updateInstrument,
        }),
        shallow,
    );

    const loopsMemoised = useMemo(() => {
        return tracks.map((track) => {
            return (
                <article className="flex flex-col gap-2" key={track.id}>
                    <div>
                        <h2 className="mr-2">{track.id}</h2>

                        <label>
                            <span>Oscillator</span>
                            <select
                                defaultValue={track.instrument.oscillator.type}
                                onChange={(event) => {
                                    const value = event.target.value;

                                    if (value) {
                                        updateInstrument(track.id, {
                                            oscillator: {
                                                type: event.target.value,
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
                                    Number(track.instrument.envelope.attack),
                                )}
                                onChange={(event) => {
                                    const value = Number(event.target.value);
                                    const attack = calculateAttackValueFromPercentage(value);

                                    if (value >= 0) {
                                        updateInstrument(track.id, {
                                            envelope: { attack },
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
                                    Number(track.instrument.envelope.decay),
                                )}
                                onChange={(event) => {
                                    const value = Number(event.target.value);
                                    const decay = calculateDecayValueFromPercentage(value);

                                    if (value >= 0) {
                                        updateInstrument(track.id, {
                                            envelope: { decay },
                                        });
                                    }
                                }}
                            />
                        </label>

                        <label>
                            <span>Sustain</span>
                            <input
                                type="range"
                                defaultValue={calculatePercentageFromSustainValue(track.instrument.envelope.sustain)}
                                onChange={(event) => {
                                    const value = Number(event.target.value);
                                    const sustain = calculateSustainValueFromPercentage(value);

                                    if (value >= 0) {
                                        updateInstrument(track.id, {
                                            envelope: { sustain },
                                        });
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="flex">
                        {track.loop.map((step) =>
                            step ? (
                                <span className="flex justify-center items-center border border-green-400 w-10 h-6 p-1">
                                    {step.pitch}
                                </span>
                            ) : (
                                <span className="flex justify-center items-center border border-green-400 w-10 h-6 p-1">
                                    0
                                </span>
                            ),
                        )}
                    </div>
                </article>
            );
        });
    }, [tracks, updateInstrument]);

    return <section className="flex flex-col items-start w-full">{loopsMemoised}</section>;
}
