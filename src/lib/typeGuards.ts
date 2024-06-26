import { SamplerConfig, SynthConfig } from '@lib/types/sequencer';

export function isSynthConfig(config: SynthConfig | SamplerConfig): config is SynthConfig {
    return config.hasOwnProperty('synthOptions');
}
