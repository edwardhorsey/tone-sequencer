import { SamplerConfig, SynthConfig } from '@lib/types/sequencer';

export function isSynthConfig(config: SynthConfig | SamplerConfig | undefined): config is SynthConfig {
    return Boolean(config?.hasOwnProperty('synthOptions'));
}
