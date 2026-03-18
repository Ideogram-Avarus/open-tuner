import NativeTuner from './NativeTunerDsp';
export class TunerEngine {
    Tuner;
    config;
    isRunning = false;
    constructor(config) {
        this.config = config;
        this.Tuner = NativeTuner;
    }
    getLatestResult() {
        const result = this.Tuner.getLatestResult();
        if (result.length !== 6)
            throw new Error('Invalid result');
        const typed = result;
        return {
            hasPitch: typed[0] === 1.0,
            frequency: typed[1],
            midiNote: typed[3],
            cents: typed[2],
            amplitude: typed[4],
            confidence: typed[5]
        };
    }
    start() {
        this.Tuner.start();
        this.isRunning = true;
    }
    stop() {
        this.Tuner.stop();
        this.isRunning = false;
    }
    init() {
        this.Tuner.init(this.config);
    }
    destroy() {
        this.Tuner.destroy();
    }
}
