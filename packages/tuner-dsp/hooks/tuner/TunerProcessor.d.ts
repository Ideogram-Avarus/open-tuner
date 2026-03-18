import { TunerEngine } from "../../specs";
import type { TunerConfigSpecs, TunerResult } from "../../specs";
export declare const TunerProcessor: (config: TunerConfigSpecs) => {
    start: () => void;
    stop: () => void;
    engineRef: import("react").RefObject<TunerEngine | null>;
    isRunning: boolean;
    getLatestResult: () => TunerResult | null;
};
