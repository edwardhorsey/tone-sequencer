import { TrackNameType } from '@lib/types/tracks';
import { TrackStore } from '@stores/trackStore';
import { isSynthConfig } from '@lib/typeGuards';

export const trackSelector = (id: TrackNameType) => (state: TrackStore) => {
    const track = state.tracks.find((track) => track.id === id);

    if (!track) return {};

    return {
        loop: track.loop,
        instrumentConfig: track.instrumentConfig,
    };
};

export const muteSelector = (id: TrackNameType) => (state: TrackStore) => {
    const track = state.tracks.find((track) => track.id === id);
    return track?.instrumentConfig.gain === 0;
};

export const oscillatorSelector = (id: TrackNameType) => (state: TrackStore) => {
    const track = state.tracks.find((track) => track.id === id);

    if (!track || !isSynthConfig(track?.instrumentConfig)) {
        throw new Error('Invalid synth config');
    }

    return track.instrumentConfig.synthOptions.oscillator?.type ?? 'fatsine';
};

export const attackSelector = (id: TrackNameType) => (state: TrackStore) => {
    const track = state.tracks.find((track) => track.id === id);

    if (!track || !isSynthConfig(track?.instrumentConfig)) {
        throw new Error('Invalid synth config');
    }

    return track.instrumentConfig.synthOptions.envelope?.attack ?? 0.1;
};

export const decaySelector = (id: TrackNameType) => (state: TrackStore) => {
    const track = state.tracks.find((track) => track.id === id);

    if (!track || !isSynthConfig(track?.instrumentConfig)) {
        throw new Error('Invalid synth config');
    }

    return track.instrumentConfig.synthOptions.envelope?.decay ?? 0.1;
};

export const sustainSelector = (id: TrackNameType) => (state: TrackStore) => {
    const track = state.tracks.find((track) => track.id === id);

    if (!track || !isSynthConfig(track?.instrumentConfig)) {
        throw new Error('Invalid synth config');
    }

    return track.instrumentConfig.synthOptions.envelope?.sustain ?? 0.1;
};
