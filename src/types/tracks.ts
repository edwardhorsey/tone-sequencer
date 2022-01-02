export const TRACK_NAME = {
  TRACK_A: 'TRACK_A',
  TRACK_B: 'TRACK_B',
  TRACK_C: 'TRACK_C',
} as const;

export type TrackTitles = typeof TRACK_NAME;
export type TrackTitle = TrackTitles[keyof TrackTitles];

export const TrackTitlesArray = Object.keys(TRACK_NAME) as TrackTitle[];
