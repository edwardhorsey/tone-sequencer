/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { playSequence } from '../lib/playSequence';
import Tone from '../lib/tone';
import { useTracks } from './TracksContext';

interface TransportContext {
  isPlaying: boolean;
  start: () => void;
  stop: () => void;
}

export const TransportContext = createContext<TransportContext|null>(null);

export function TransportProvider(props: {
  children: ReactNode;
}): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const { patternsRef, instrumentsRef } = useTracks();

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

  const start = (): void => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }

    Tone.Transport.start();
    setIsPlaying(true);
  };
  const stop = (): void => {
    Tone.Transport.stop();
    setIsPlaying(false);
  };

  const { children } = props;
  return (
    <TransportContext.Provider
      value={{
        isPlaying,
        start,
        stop,
      }}
    >
      {children}
    </TransportContext.Provider>
  );
}

export const useTransport = (): TransportContext => (
  useContext(TransportContext) as TransportContext
);
