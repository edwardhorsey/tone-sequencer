import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import { playSequence } from '../lib/playSequence';
import Tone from '../lib/tone';
import { initialPatterns, updatedPatterns } from '../mocks/exampleTracks';
import { Track } from '../types/sequencer';

const osc1 = new Tone.MonoSynth().toDestination();
const osc2 = new Tone.FMSynth().toDestination();
const osc3 = new Tone.AMSynth().toDestination();

const initialTracks: Track[] = [
  { pattern: initialPatterns[0], instrument: osc1 },
  { pattern: initialPatterns[1], instrument: osc2 },
  { pattern: initialPatterns[2], instrument: osc3 },
];

function Sequencer(): JSX.Element {
  const [tracks, setTracks, tracksRef] = useStateRef<Track[]>(initialTracks);

  useEffect(() => {
    Tone.Transport.scheduleRepeat(
      (time) => playSequence(tracksRef.current, time),
      '16n',
    );
  }, [tracksRef]);

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
    const updatedTracks = tracks.map((track, index) => ({
      ...track, pattern: updatedPatterns[index],
    }));

    setTracks(updatedTracks);
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
    </div>
  );
}

export default Sequencer;
