import { playSequenceInStore } from '@lib/playSequence';
import Tone from '@lib/tone';
import { initialLoops, initialSamplerConfig, initialSynthConfig } from '@lib/trackHelpers';
import { Loop, SamplerConfig, SynthConfig, Track } from '@lib/types/sequencer';
import { InstrumentType, TrackNameType } from '@lib/types/tracks';
import merge from 'lodash/merge';
import create from 'zustand';

function createSynth(options?: SynthConfig) {
    const gain = new Tone.Gain(options?.gain).toDestination();
    const synth = new Tone.Synth(options?.synthOptions).connect(gain);

    return { gain, synth };
}

function createSampler(options?: SamplerConfig) {
    const gain = new Tone.Gain(options?.gain).toDestination();
    const sampler = new Tone.Sampler(options?.samplerOptions.urls).connect(gain);

    return { gain, sampler };
}

export interface TrackStore {
    tracks: Track[];
    isPlaying: boolean;
    initialised: boolean;
    initialise: () => void;
    start: () => void;
    stop: () => void;
    updateInstrument: (trackId: TrackNameType, config: Partial<SynthConfig>) => void;
    updateLoop: (trackId: TrackNameType, loop: Loop) => void;
}

const initialiseTracks = () => {
    if (typeof Window !== 'undefined') {
        const tracks: Track[] = [
            {
                id: TrackNameType.SynthA,
                instrumentType: InstrumentType.Synth,
                instrumentConfig: initialSynthConfig[TrackNameType.SynthA],
                instrument: createSynth(initialSynthConfig[TrackNameType.SynthA]),
                loop: initialLoops[TrackNameType.SynthA],
            },
            {
                id: TrackNameType.SynthB,
                instrumentType: InstrumentType.Synth,
                instrumentConfig: initialSynthConfig[TrackNameType.SynthB],
                instrument: createSynth(initialSynthConfig[TrackNameType.SynthB]),
                loop: initialLoops[TrackNameType.SynthB],
            },
            {
                id: TrackNameType.SynthC,
                instrumentType: InstrumentType.Synth,
                instrumentConfig: initialSynthConfig[TrackNameType.SynthC],
                instrument: createSynth(initialSynthConfig[TrackNameType.SynthC]),
                loop: initialLoops[TrackNameType.SynthC],
            },
            {
                id: TrackNameType.SamplerA,
                instrumentType: InstrumentType.Sampler,
                instrumentConfig: initialSamplerConfig[TrackNameType.SamplerA],
                instrument: createSampler(initialSamplerConfig[TrackNameType.SamplerA]),
                loop: initialLoops[TrackNameType.SamplerA],
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
    updateInstrument: (trackId: TrackNameType, config: Partial<SynthConfig> | Partial<SamplerConfig>) => {
        set((state) => {
            const tracks = [...state.tracks];
            const trackToUpdate = tracks.find((track) => track.id === trackId);

            if (trackToUpdate) {
                trackToUpdate.instrumentConfig = merge(trackToUpdate.instrumentConfig, config);

                // Update Tone.js instruments
                if (trackToUpdate.instrumentType === InstrumentType.Synth) {
                    trackToUpdate.instrument.synth.set(trackToUpdate.instrumentConfig.synthOptions);
                }

                if (trackToUpdate.instrumentType === InstrumentType.Sampler) {
                    trackToUpdate.instrument.sampler.set(trackToUpdate.instrumentConfig.samplerOptions);
                }

                trackToUpdate.instrument.gain.gain.rampTo(trackToUpdate.instrumentConfig.gain);

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
