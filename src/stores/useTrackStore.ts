import { playSequenceInStore } from '@lib/playSequence';
import Tone from '@lib/tone';
import { generateRandomLoop, initialInstrumentsConfig, initialLoops } from '@lib/trackHelpers';
import { InstrumentConfig, Loop, Track } from '@lib/types/sequencer';
import { TrackNameType } from '@lib/types/tracks';
import merge from 'lodash/merge';
import create from 'zustand';

function createSynth(options?: InstrumentConfig) {
    return new Tone.Synth(options?.synthOptions).toDestination();
}

export interface TrackStore {
    tracks: Track[];
    isPlaying: boolean;
    initialised: boolean;
    initialise: () => void;
    start: () => void;
    stop: () => void;
    randomiseLoops: () => void;
    updateInstrument: (trackId: TrackNameType, config: Partial<InstrumentConfig>) => void;
    updateLoop: (trackId: TrackNameType, loop: Loop) => void;
}

const initialiseTracks = () => {
    if (typeof Window !== 'undefined') {
        const tracks: Track[] = [
            {
                id: TrackNameType.SynthA,
                instrumentConfig: initialInstrumentsConfig[TrackNameType.SynthA],
                instrument: createSynth(initialInstrumentsConfig[TrackNameType.SynthA]),
                loop: initialLoops[TrackNameType.SynthA],
            },
            {
                id: TrackNameType.SynthB,
                instrumentConfig: initialInstrumentsConfig[TrackNameType.SynthB],
                instrument: createSynth(initialInstrumentsConfig[TrackNameType.SynthB]),
                loop: initialLoops[TrackNameType.SynthB],
            },
            {
                id: TrackNameType.SynthC,
                instrumentConfig: initialInstrumentsConfig[TrackNameType.SynthC],
                instrument: createSynth(initialInstrumentsConfig[TrackNameType.SynthC]),
                loop: initialLoops[TrackNameType.SynthC],
            },
        ];

        return tracks;
    }

    return [];
};

const useTrackStore = create<TrackStore>()((set, get) => ({
    tracks: initialiseTracks(),
    isPlaying: false,
    initialised: false,
    initialise: () => {
        if (typeof Window !== 'undefined') {
            Tone.Transport.cancel();

            Tone.Transport.scheduleRepeat((time) => {
                const tracks = get().tracks;

                playSequenceInStore(tracks, time);
            }, '16n');

            set((state) => ({ ...state, initialised: true }));
        }
    },
    start: async () => {
        if (Tone.context.state !== 'running') {
            await Tone.context.resume();
        }

        Tone.Transport.start();
        set((state) => ({ ...state, isPlaying: true }));
    },
    stop: () => {
        Tone.Transport.stop();
        set((state) => ({ ...state, isPlaying: false }));
    },
    randomiseLoops: () => {
        const randomLoops = {
            [TrackNameType.SynthA]: generateRandomLoop(5),
            [TrackNameType.SynthB]: generateRandomLoop(3),
            [TrackNameType.SynthC]: generateRandomLoop(2),
        };

        set((state) => ({
            ...state,
            tracks: state.tracks.map((track) => ({ ...track, loop: randomLoops[track.id] })),
        }));
    },
    updateInstrument: (trackId: TrackNameType, config: Partial<InstrumentConfig>) => {
        set((state) => {
            const tracks = [...state.tracks];
            const trackToUpdate = tracks.find((track) => track.id === trackId);

            if (trackToUpdate) {
                trackToUpdate.instrumentConfig = merge(trackToUpdate.instrumentConfig, config);

                // Update Tone.js instrument
                trackToUpdate.instrument.set(trackToUpdate.instrumentConfig.synthOptions);

                return { ...state, tracks };
            }

            return state;
        });
    },
    updateLoop: (trackId: TrackNameType, loop: Loop) => {
        set((state) => {
            const tracks = [...state.tracks];
            const trackToUpdate = tracks.find((track: any) => track.id === trackId);

            if (trackToUpdate) {
                trackToUpdate.loop = loop;

                return { ...state, tracks };
            }

            return state;
        });
    },
}));

useTrackStore.getState().initialise();

export default useTrackStore;
