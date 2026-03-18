import type { TunerResult } from "../../specs";
export declare const useTunerResults: (getLatestResult: () => TunerResult | null, interval: number) => {
    result: TunerResult | null;
};
