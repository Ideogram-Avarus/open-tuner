import { useEffect, useMemo } from "react";
import {
    Easing,
    cancelAnimation,
    useAnimatedProps,
    useSharedValue,
    withRepeat,
    withTiming
} from "react-native-reanimated";
import { HaloState } from "../types";

export type _HaloAnimationProps = {
    size: number;
    state: HaloState;
    delay?: number;
    configs?: Partial<Record<HaloState, HaloStateConfig>>
}

type HaloStateConfig = {
    base: number;
    amp: number;
    minOpacity: number;
    maxOpacity: number;
    duration: number;
    strokeWidth: number;
    easing?: (value: number) => number;
};

const _conf = {
    visibleWindow:0.8
}

export const useHaloAnimation = ({
    size,
    state,
    delay,
    configs
}: _HaloAnimationProps) => {
    const pulse = useSharedValue(0);

    const config = useMemo(() => {
        const scale = (value: number) => Math.max(1, value * (size / 200));
        const defaults: Record<HaloState, HaloStateConfig> = {
            inactive: {
                base: scale(6),
                amp: scale(50),
                minOpacity: 0,
                maxOpacity: 0,
                duration: 0,
                strokeWidth: size * 0.5
            },
            far: {
                base: scale(6),
                amp: scale(50),
                minOpacity: 0,
                maxOpacity: 0,
                duration: 20000,
                strokeWidth: size * 0.5,
            },
            near: {
                base: scale(6),
                amp: scale(50),
                minOpacity: 0.08,
                maxOpacity: 0.28,
                duration: 1400,
                strokeWidth: size * 0.5
            },
            inTune: {
                base: scale(6),
                amp: scale(50),
                minOpacity: 0.15,
                maxOpacity: 0.6,
                duration: 950,
                strokeWidth: size * 0.1
            },
        };

        return {
            ...defaults[state],
            ...configs?.[state],
        };
    }, [configs, size, state]);


    useEffect(() => {
        if (state === 'inactive') {
            cancelAnimation(pulse);
            pulse.value = 0;
            return;
        }

        pulse.value = 0;

        pulse.value = withRepeat(
            withTiming(1, {
                duration: config.duration,
                easing: config.easing ?? Easing.linear, // 👈 better for waves
            }),
            -1,
            false
        );
    }, [config.duration, config.easing, pulse, state]);

    const animatedProps = useAnimatedProps(() => {
        const t = (pulse.value + (delay ?? 0)) % 1;

        const radius = config.base + t * config.amp;
        const fade = 1 - Math.pow(t, 2);

        const opacity =
            config.minOpacity +
            fade * (config.maxOpacity - config.minOpacity);

        return {
            r: radius,
            opacity,
        };
    });

    return {
        animatedProps,
        pulse,
        config
    }
}
