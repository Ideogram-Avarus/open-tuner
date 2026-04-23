import React, { useEffect } from "react";
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
    interpolate,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import Svg, { Rect } from "react-native-svg";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface Props {
    isInTune: number;
    isGlowing: boolean;
    color: string;
    borderRadius?: number;
    children?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
}

export const AnimatedContainerView = ({
    isInTune,
    isGlowing,
    color,
    borderRadius = 16,
    children,
    containerStyle,
}: Props) => {
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(isInTune, { duration: 20 });
    }, [isInTune]);

    const onLayout = (e: LayoutChangeEvent) => {
        const { width, height } = e.nativeEvent.layout;
        setSize({ width, height });
    };

    // Main border
    const borderProps = useAnimatedProps(() => ({
        strokeWidth: interpolate(progress.value, [0, 1], [1, 3]),
        strokeOpacity: interpolate(progress.value, [0, 1], [0.4, 1]),
    }));

    // Fake glow (outer stroke)
    const glowProps = useAnimatedProps(() => {
        if (!isGlowing) {
            return {
                strokeWidth: 0,
                strokeOpacity: 0,
            };
        }

        return {
            strokeWidth: interpolate(progress.value, [0, 1], [6, 10]),
            strokeOpacity: interpolate(progress.value, [0, 1], [0.05, 0.25]),
        };
    });

    if (size.width === 0 || size.height === 0) {
        return (
            <View style={containerStyle} onLayout={onLayout}>
                {children}
            </View>
        );
    }

    return (
        <View 
            style={[
                containerStyle, 
                { 
                    borderRadius: borderRadius, 
                    overflow: "hidden"
                }
            ]} 
            onLayout={onLayout}
        >
            <Svg
                width={size.width}
                height={size.height}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
            >
                {/* Glow (just a thicker transparent stroke) */}
                <AnimatedRect
                    x={2}
                    y={2}
                    width={size.width - 4}
                    height={size.height - 4}
                    rx={borderRadius}
                    stroke={color}
                    fill="none"
                    animatedProps={glowProps}
                />

                {/* Main border */}
                <AnimatedRect
                    x={2}
                    y={2}
                    width={size.width - 4}
                    height={size.height - 4}
                    rx={borderRadius}
                    stroke={color}
                    fill="none"
                    animatedProps={borderProps}
                />
            </Svg>
            <View style={{ borderRadius, overflow: "hidden" }}>
                {children}
            </View>
        </View>
    );
};

