/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, ReactNode,
  RefObject,
  useContext, useRef,
} from 'react';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import useReducerWithRef from '../lib/hooks/useReducerWithRef';
import Tone from '../lib/tone';
import {
  mockInitialPatterns, mockUpdatedPatterns,
} from '../mocks/exampleTracks';
import { Instruments, Patterns } from '../types/sequencer';
import { TrackTitle, TRACK_NAME } from '../types/tracks';

const { TRACK_A, TRACK_B, TRACK_C } = TRACK_NAME;

const initialPatterns: Patterns = {
  [TRACK_A]: mockInitialPatterns[0],
  [TRACK_B]: mockInitialPatterns[1],
  [TRACK_C]: mockInitialPatterns[2],
};

type PatternsState = Patterns;
type PatternsDispatch = (action: PatternsReducerAction) => void;
type PatternsReducerAction = { type: 'exampleUpdatedPatterns' }

const patternsReducer = (
  state: PatternsState,
  action: PatternsReducerAction,
): PatternsState => {
  switch (action.type) {
    case 'exampleUpdatedPatterns': {
      const updated = {
        [TRACK_A]: mockUpdatedPatterns[0],
        [TRACK_B]: mockUpdatedPatterns[1],
        [TRACK_C]: mockUpdatedPatterns[2],
      };

      return updated;
    }
    default: {
      throw new Error(`Action - ${action} - not matched`);
    }
  }
};

type UpdateInstrument = (
  trackName: TrackTitle,
  instrumentSettings: RecursivePartial<Tone.SynthOptions>
) => void

interface TracksContext {
  patterns: Patterns;
  patternsRef: RefObject<Patterns>;
  patternsDispatch: PatternsDispatch;
  instrumentsRef: RefObject<Instruments>;
  updateInstrument: UpdateInstrument;
}

export const TracksContext = createContext<TracksContext|null>(null);

export function TracksProvider(props: {
  children: ReactNode;
}): JSX.Element {
  const [patterns, patternsDispatch, patternsRef] = useReducerWithRef(
    patternsReducer,
    initialPatterns,
  );
  const instrumentsRef = useRef<Instruments>({
    [TRACK_A]: new Tone.Synth().toDestination(),
    [TRACK_B]: new Tone.Synth().toDestination(),
    [TRACK_C]: new Tone.Synth().toDestination(),
  });

  const updateInstrument: UpdateInstrument = (
    trackName,
    instrumentSettings,
  ): void => {
    instrumentsRef.current[trackName].set(instrumentSettings);
  };

  const { children } = props;
  return (
    <TracksContext.Provider
      value={{
        patterns,
        patternsDispatch,
        patternsRef,
        instrumentsRef,
        updateInstrument,
      }}
    >
      {children}
    </TracksContext.Provider>
  );
}

export const useTracks = (): TracksContext => (
  useContext(TracksContext) as TracksContext
);
