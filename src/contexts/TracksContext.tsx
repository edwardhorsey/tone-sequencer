import { createContext, ReactNode, RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import useReducerWithRef from '../lib/hooks/useReducerWithRef';
import Tone from '../lib/tone';
import { mockInitialPatterns, mockUpdatedPatterns } from '../mocks/exampleTracks';
import { Instruments, Patterns } from '../types/sequencer';
import { TrackNameType } from '../types/tracks';

import { playSequence } from '../lib/playSequence';

function createSynth() {
    return new Tone.Synth().toDestination();
}

const initialPatterns: Patterns = {
    [TrackNameType.SynthA]: mockInitialPatterns[0],
    [TrackNameType.SynthB]: mockInitialPatterns[1],
    [TrackNameType.SynthC]: mockInitialPatterns[2],
};

type PatternsState = Patterns;
type PatternsDispatch = (action: PatternsReducerAction) => void;
type PatternsReducerAction = { type: 'exampleUpdatedPatterns' };

const patternsReducer = (state: PatternsState, action: PatternsReducerAction): PatternsState => {
    switch (action.type) {
        case 'exampleUpdatedPatterns': {
            const updated = {
                [TrackNameType.SynthA]:
                    state[TrackNameType.SynthA] === mockUpdatedPatterns[0]
                        ? mockInitialPatterns[0]
                        : mockUpdatedPatterns[0],
                [TrackNameType.SynthB]:
                    state[TrackNameType.SynthB] === mockUpdatedPatterns[1]
                        ? mockInitialPatterns[1]
                        : mockUpdatedPatterns[1],
                [TrackNameType.SynthC]:
                    state[TrackNameType.SynthC] === mockUpdatedPatterns[2]
                        ? mockInitialPatterns[2]
                        : mockUpdatedPatterns[2],
            };

            return updated;
        }
        default: {
            throw new Error(`Action - ${action} - not matched`);
        }
    }
};

type UpdateInstrument = (
    instrumentName: TrackNameType,
    instrumentSettings: RecursivePartial<Tone.SynthOptions>,
) => void;

interface TracksContext {
    patterns: Patterns;
    patternsRef: RefObject<Patterns>;
    patternsDispatch: PatternsDispatch;
    instrumentsRef: RefObject<Instruments>;
    updateInstrument: UpdateInstrument;
    isPlaying: boolean;
    start: () => void;
    stop: () => void;
}

export const TracksContext = createContext<TracksContext | null>(null);

export function TracksProvider(props: { children: ReactNode }): JSX.Element {
    const [isPlaying, setIsPlaying] = useState(false);
    const [patterns, patternsDispatch, patternsRef] = useReducerWithRef(patternsReducer, initialPatterns);
    const instrumentsRef = useRef<Instruments | null>(null);
    const [initialisedInstruments, setInitialsedInstruments] = useState(false);

    const initialiseInstruments = useCallback(() => {
        instrumentsRef.current = {
            [TrackNameType.SynthA]: createSynth(),
            [TrackNameType.SynthB]: createSynth(),
            [TrackNameType.SynthC]: createSynth(),
        };
    }, []);

    useEffect(() => {
        if (!initialisedInstruments) {
            initialiseInstruments();
            setInitialsedInstruments(true);
        }
    }, [initialisedInstruments, setInitialsedInstruments, initialiseInstruments]);

    const updateInstrument: UpdateInstrument = (trackName, instrumentSettings): void => {
        if (!instrumentsRef.current) return;

        instrumentsRef.current[trackName].set(instrumentSettings);
    };

    useEffect(() => {
        Tone.Transport.cancel();

        Tone.Transport.scheduleRepeat((time) => {
            if (patternsRef?.current && instrumentsRef?.current) {
                playSequence(patternsRef.current, instrumentsRef.current, time);
            }
        }, '16n');
    }, [patternsRef, instrumentsRef]);

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

    return (
        <TracksContext.Provider
            value={{
                patterns,
                patternsDispatch,
                patternsRef,
                instrumentsRef,
                updateInstrument,
                isPlaying,
                start,
                stop,
            }}
        >
            {props.children}
        </TracksContext.Provider>
    );
}

export const useTracks = (): TracksContext => useContext(TracksContext) as TracksContext;
