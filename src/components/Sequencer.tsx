import { useTracks } from '../contexts/TracksContext';
import { TrackNameType } from '../types/tracks';

function Sequencer(): JSX.Element {
    const { patternsDispatch, updateInstrument, start, stop } = useTracks();

    const updateSequence = (): void => {
        patternsDispatch({ type: 'exampleUpdatedPatterns' });
    };

    const updateInstrumentOnClick = (): void => {
        updateInstrument(TrackNameType.SynthA, { oscillator: { type: 'fmsawtooth' } });
    };

    return (
        <div>
            <h1 className="text-center">Sequencer</h1>
            <button type="button" className="p-2" onClick={start}>
                start
            </button>
            <button type="button" className="p-2" onClick={stop}>
                stop
            </button>
            <button type="button" className="p-2" onClick={updateSequence}>
                update sequence
            </button>
            <button type="button" className="p-2" onClick={updateInstrumentOnClick}>
                update instrument
            </button>
        </div>
    );
}

export default Sequencer;
