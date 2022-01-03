import React from 'react';
import { useTracks } from '../contexts/TracksContext';
import { useTransport } from '../contexts/TransportContext';
import { TRACK_NAME } from '../types/tracks';

function Sequencer(): JSX.Element {
  const { patternsDispatch, updateInstrument } = useTracks();
  const { start, stop } = useTransport();

  const updateSequence = (): void => {
    patternsDispatch({ type: 'exampleUpdatedPatterns' });
  };

  const updateInstrumentOnClick = (): void => {
    updateInstrument(
      TRACK_NAME.TRACK_A,
      { oscillator: { type: 'fmsawtooth' } },
    );
  };

  return (
    <div>
      <h1 className="text-center">Sequencer</h1>
      <button
        type="button"
        className="p-2"
        onClick={start}
      >
        start
      </button>
      <button
        type="button"
        className="p-2"
        onClick={stop}
      >
        stop
      </button>
      <button
        type="button"
        className="p-2"
        onClick={updateSequence}
      >
        update sequence
      </button>
      <button
        type="button"
        className="p-2"
        onClick={updateInstrumentOnClick}
      >
        update instrument
      </button>
    </div>
  );
}

export default Sequencer;
