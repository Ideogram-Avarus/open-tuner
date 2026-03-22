import React from "react";
import Animated from "react-native-reanimated";
import { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { useHaloAnimation } from "../../hooks/useHaloAnimation";
import { HaloState } from "../../types";


type SingleAnimatedHaloProps = {
    cx: number;
    cy: number;
    color: string;
    gradientId: string;
    size: number;
    state: HaloState;
    delay?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const SingleAnimatedHalo = ({
    cx,
    cy,
    color,
    gradientId,
    size,
    state,
    delay
}: SingleAnimatedHaloProps) => {
    const {animatedProps, config} = useHaloAnimation({ size, state, delay });
    return (
        <>
            <Defs>
                <RadialGradient id={gradientId} cx="50%" cy="50%" r="50%">
                    <Stop offset="0%" stopColor={color} stopOpacity="1" />
                    <Stop offset="70%" stopColor={color} stopOpacity="0.4" />
                    <Stop offset="100%" stopColor={color} stopOpacity="0" />
                </RadialGradient>
            </Defs>
            <AnimatedCircle
                cx={cx}
                cy={cy}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={config.strokeWidth}
                animatedProps={animatedProps}
            />
        </>
    );
} 