import React, { useEffect } from 'react';
import { useTracks } from '../contexts/TracksContext';
import { playSequence } from '../lib/playSequence';
import Tone from '../lib/tone';
import { TRACK_NAME } from '../types/tracks';

function Sequencer(): JSX.Element {
  const {
    patternsRef,
    patternsDispatch,
    instrumentsRef,
    updateInstrument,
  } = useTracks();

  useEffect(() => {
    Tone.Transport.scheduleRepeat(
      (time) => {
        if (patternsRef?.current && instrumentsRef?.current) {
          playSequence(
            patternsRef.current,
            instrumentsRef.current,
            time,
          );
        }
      },
      '16n',
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sequencerStart = (): void => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }

    Tone.Transport.start();
  };

  const sequencerStop = (): void => {
    Tone.Transport.stop();
  };

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
        onClick={sequencerStart}
      >
        start
      </button>
      <button
        type="button"
        className="p-2"
        onClick={sequencerStop}
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
