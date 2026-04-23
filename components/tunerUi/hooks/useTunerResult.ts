import { useEffect } from 'react'
import { DEFAULT_CONFIG, useTuner } from 'tuner-dsp'

export const useTunerResult = () => {
    const { 
        isRunning,
        start, 
        stop, 
        result,
        hasPermission 
    } = useTuner({
        ...DEFAULT_CONFIG,
        hookUpdateSpeed: 100
    })

    useEffect(() => {
        if (!hasPermission) return
        
        start()
        
        return () => {
            stop()
        }
    }, [hasPermission])
        
    return {
        isRunning,
        start,
        stop,
        hasPermission,
        result
    }
}