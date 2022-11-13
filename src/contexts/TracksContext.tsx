import { createContext, ReactNode, RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { emptyFunction } from 'src/lib/misc';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import useReducerWithRef from '../lib/hooks/useReducerWithRef';
import { playSequence } from '../lib/playSequence';
import Tone from '../lib/tone';
import { mockInitialLoops, mockUpdatedLoops } from '../mocks/exampleTracks';
import { Instruments, Loops } from '../types/sequencer';
import { TrackNameType } from '../types/tracks';

function createSynth() {
    return new Tone.Synth().toDestination();
}

const initialLoops: Loops = {
    [TrackNameType.SynthA]: mockInitialLoops[0],
    [TrackNameType.SynthB]: mockInitialLoops[1],
    [TrackNameType.SynthC]: mockInitialLoops[2],
};

type LoopsState = Loops;
type LoopsDispatch = (action: LoopsReducerAction) => void;
type LoopsReducerAction = { type: 'exampleUpdatedLoops' };

const loopsReducer = (state: LoopsState, action: LoopsReducerAction): LoopsState => {
    switch (action.type) {
        case 'exampleUpdatedLoops': {
            const updated = {
                [TrackNameType.SynthA]:
                    state[TrackNameType.SynthA] === mockUpdatedLoops[0] ? mockInitialLoops[0] : mockUpdatedLoops[0],
                [TrackNameType.SynthB]:
                    state[TrackNameType.SynthB] === mockUpdatedLoops[1] ? mockInitialLoops[1] : mockUpdatedLoops[1],
                [TrackNameType.SynthC]:
                    state[TrackNameType.SynthC] === mockUpdatedLoops[2] ? mockInitialLoops[2] : mockUpdatedLoops[2],
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
    loops: Loops;
    loopsRef: RefObject<Loops> | null;
    loopsDispatch: LoopsDispatch;
    instrumentsRef: RefObject<Instruments> | null;
    updateInstrument: UpdateInstrument;
    isPlaying: boolean;
    start: () => void;
    stop: () => void;
}

export const TracksContext = createContext<TracksContext>({
    loops: {},
    loopsRef: null,
    loopsDispatch: emptyFunction,
    instrumentsRef: null,
    updateInstrument: emptyFunction,
    isPlaying: false,
    start: emptyFunction,
    stop: emptyFunction,
});

export function TracksProvider(props: { children: ReactNode }): JSX.Element {
    const [isPlaying, setIsPlaying] = useState(false);
    const [loops, loopsDispatch, loopsRef] = useReducerWithRef(loopsReducer, initialLoops);
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
            if (loopsRef?.current && instrumentsRef?.current) {
                playSequence(loopsRef.current, instrumentsRef.current, time);
            }
        }, '16n');
    }, [loopsRef, instrumentsRef]);

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
                loops,
                loopsDispatch,
                loopsRef,
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
