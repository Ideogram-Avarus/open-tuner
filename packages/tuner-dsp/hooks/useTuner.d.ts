import type { TunerEngineConfig } from "./types";
export declare const useTuner: (config?: TunerEngineConfig) => {
    isRunning: boolean;
    start: () => void;
    stop: () => void;
    result: import("..").TunerResult | null;
    hasPermission: boolean;
    requestMicPermission: () => Promise<boolean>;
};
