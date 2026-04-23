import { useMemo } from 'react';
import { TunerDisplay, TunerResult } from '../types';
import { getHaloState, getTuningColor, getTuningGlow, midiToNoteInfo } from '../utils';

const defaultDisplay: TunerDisplay = {
    noteInfo: {
      name: '––',
      octave: 0,
      fullName: '––',
    },
    octave: 0,
    label: '––',
    frequency: 0,
    cents: 0,
    tuneDistance: 0,
    amplitude: 0,
    confidence: 0,
    color: '#7f8c8d',
    glow: { color: '#7f8c8d', opacity: 0.15, radius: 8, strong: false },
    haloState: 'inactive',
}

export const useTunerDisplay = (result: TunerResult | null): TunerDisplay => {
  return useMemo(() => {
    if (!result) return defaultDisplay
    const noteInfo = midiToNoteInfo(result.midiNote);
    const color = getTuningColor(result.cents, result.hasPitch);
    const glow = getTuningGlow(result.cents, result.hasPitch);
    const haloState = getHaloState(result.cents, result.hasPitch);
    const cents = Math.round(result.cents * 10) / 10
    const tuneDistance = Math.max(0, 1 - cents / 50)
    console.log('result ', result.cents)
    console.log('tuneDistance ', tuneDistance)
    return {
      noteInfo,
      octave: noteInfo.octave,
      label: noteInfo.fullName,
      frequency: result.frequency,
      cents,
      tuneDistance,
      amplitude: result.amplitude,
      confidence: result.confidence,
      color,
      glow,
      haloState
    };
  }, [result]);
};
