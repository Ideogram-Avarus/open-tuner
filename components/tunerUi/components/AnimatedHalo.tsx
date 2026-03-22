import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Svg from "react-native-svg";
import { HaloState } from "../types";
import { SingleAnimatedHalo } from "./SVG/SingleAnimatedHalo";

interface AnimatedHaloProps {
    color: string;
    state: HaloState;
    size: number;
    box_size: number;
    radius: number;
    cx: number;
    cy: number;
}


export function AnimatedHalo({
    color,
    state,
    size,
    box_size,
    cx,
    cy
}: AnimatedHaloProps) {

    const calculatedValues = useMemo(() => {
        const gradientId = `haloGradient-${cx}-${cy}`;
        const rings = 3;
        return {
            gradientId,
            rings
        }
    }, [cx, cy]);

    return (
        <View 
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, 
        {   
            position: 'absolute', 
            top: -size/2, left: 0, 
            overflow: 'visible',
            height: size
         }
        ]}
        >
            <Svg 
                width={size} 
                height={size} 
                viewBox={`0 0 ${size} ${box_size}`}
            >
                {Array.from({ length: calculatedValues.rings }).map((_, i) => {
                    return (
                        <SingleAnimatedHalo
                            key={i}
                            cx={cx}
                            cy={cy}
                            color={color}
                            gradientId={`${calculatedValues.gradientId}-${i}`}
                            size={size}
                            state={state}
                            delay={i / calculatedValues.rings}
                            />
                        );
                })}
            </Svg>
        </View>

    )
}