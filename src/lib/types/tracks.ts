export enum TrackNameType {
    SynthA = 'SynthA',
    SynthB = 'SynthB',
    SynthC = 'SynthC',
    SamplerA = 'SamplerA',
}

export const TrackNamesArray = Object.keys(TrackNameType) as TrackNameType[];

export enum InstrumentType {
    Synth = 'Synth',
    Sampler = 'Sampler',
}
