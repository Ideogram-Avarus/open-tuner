import { usePermissions } from "./audio";
import { DEFAULT_CONFIG } from "./configs";
import { useTunerProcessor } from "./tuner/useTunerProcessor";
import { useTunerResults } from "./tuner/useTunerResults";
import type { TunerEngineConfig } from "./types";


export const useTuner = (
    config: TunerEngineConfig = DEFAULT_CONFIG,
) => {
    const {
        requestMicPermission,
        hasPermission
    } = usePermissions();
    
    const {
        start,
        stop,
        isRunning,
        getLatestResult
    } = useTunerProcessor(
        config.engineConfig
    )

    const {
        result
    } = useTunerResults(
        getLatestResult,
        config.hookUpdateSpeed
    );

    return {
        isRunning,
        start,
        stop,
        result,
        hasPermission,
        requestMicPermission,
    }
}