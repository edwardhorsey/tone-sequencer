import { getPercentageFromEnvelopeValue, getEnvelopeValueFromPercentage } from '@lib/envelopeHelpers';
import { attackSelector, decaySelector, sustainSelector } from '@lib/selectors';
import { TrackNameType } from '@lib/types/tracks';
import useTrackStore from '@stores/trackStore';

interface SynthEnvelopeControlProps {
    type: 'attack' | 'decay' | 'sustain';
    id: TrackNameType;
}

const envelopeSelector = {
    attack: attackSelector,
    decay: decaySelector,
    sustain: sustainSelector,
};

function getSelector(type: 'attack' | 'decay' | 'sustain') {
    return envelopeSelector[type];
}

export default function SynthEnvelopeControl({ type, id }: SynthEnvelopeControlProps) {
    const updateInstrument = useTrackStore((state) => state.updateInstrument);
    const value = useTrackStore(getSelector(type)(id));

    const readableName = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <label className="flex gap-1 items-center">
            <span>{readableName}</span>
            <input
                type="range"
                value={getPercentageFromEnvelopeValue(type, Number(value))}
                onChange={(event) => {
                    const value = Number(event.target.value);
                    const envelopeValue = getEnvelopeValueFromPercentage(type, value);

                    if (value >= 0) {
                        updateInstrument(id, {
                            synthOptions: {
                                envelope: { [type]: envelopeValue },
                            },
                        });
                    }
                }}
            />
        </label>
    );
}
