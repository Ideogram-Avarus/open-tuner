import type { TunerResult } from './types';
import type { TunerConfigSpecs } from './NativeTunerDsp';
export declare class TunerEngine {
    private Tuner;
    config: TunerConfigSpecs;
    isRunning: boolean;
    constructor(config: TunerConfigSpecs);
    getLatestResult(): TunerResult;
    start(): void;
    stop(): void;
    init(): void;
    destroy(): void;
}
