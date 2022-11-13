import { useTracks } from '../contexts/TracksContext';
import { TrackNameType } from '../types/tracks';
import DisplayLoops from './DisplayLoops';

function Sequencer(): JSX.Element {
    const { loopsDispatch, updateInstrument, start, stop } = useTracks();

    const updateSequence = (): void => {
        loopsDispatch({ type: 'exampleUpdatedLoops' });
    };

    const updateInstrumentOnClick = (): void => {
        updateInstrument(TrackNameType.SynthA, { oscillator: { type: 'fmsawtooth' } });
    };

    return (
        <div>
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

            <DisplayLoops />
        </div>
    );
}

export default Sequencer;
