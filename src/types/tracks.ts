export enum TrackNameType {
    SynthA = 'SynthA',
    SynthB = 'SynthB',
    SynthC = 'SynthC',
}

export const TrackNamesArray = Object.keys(TrackNameType) as TrackNameType[];
