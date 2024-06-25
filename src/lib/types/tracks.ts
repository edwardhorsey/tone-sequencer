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

export const TrackNameReadable = {
    [TrackNameType.SynthA]: 'Synth A',
    [TrackNameType.SynthB]: 'Synth B',
    [TrackNameType.SynthC]: 'Synth C',
    [TrackNameType.SamplerA]: 'Sampler A',
};
