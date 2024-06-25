import { TrackNameType } from '@lib/types/tracks';
import { TrackStore } from '@stores/useTrackStore';

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
