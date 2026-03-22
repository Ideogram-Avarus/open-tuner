import { colors } from '@/hooks/theme';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { HaloState, NoteInfo } from '../types';
import { AnimatedHalo } from './AnimatedHalo';
import { GaugeBackground } from './GaugeBackground';
import { GaugeNeedle } from './GaugeNeedle';

export interface TunerViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  width: number;
  noteInfo: NoteInfo;
  cents: number 
  frequency: number 
  color: string
  haloState: HaloState 
}

export const TunerView: React.FC<TunerViewProps> = ({ 
  containerStyle,
  width,
  noteInfo,
  cents,
  frequency,
  color,
  haloState
}) => {
  const styles = useMemo(() => createStyle(),[]);
  const component_framing = useMemo(() => {
      const gaugeSize = Math.min(width * 0.9, 320);
      const radius = gaugeSize * 0.47;
  
      const box_size = radius + 70
      
      const arc_cy = radius + 35
      const arc_radius = radius - 10
      const arc_stroke_width = 11

      const haloX = gaugeSize / 2;
      const haloY = box_size * 1.5 - arc_cy + arc_stroke_width;
  
      return {
        gaugeSize,
        radius,
        arc_stroke_width,
        arc_radius,
        arc_cy,
        box_size,
        haloX,
        haloY
      }
    }, [width]);
  
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.textContainer}>
          <Text variant='displayMedium' style={{color}}>{noteInfo.fullName}</Text>
          <Text variant='labelMedium'style={{ color }}>
            {`${frequency >= 0 ? '+' : ''}${frequency.toFixed(1)} Hz`}
          </Text>
        </View>
        <View style={[StyleSheet.absoluteFill, { position: 'relative', alignItems: 'center', overflow: 'visible' }]}>
          <AnimatedHalo 
            color={color} 
            size={component_framing.gaugeSize} 
            state={haloState} 
            radius={component_framing.radius}
            box_size={component_framing.box_size}
            cx={component_framing.haloX}
            cy={component_framing.haloY}
          />
          <GaugeBackground 
              size={component_framing.gaugeSize}
              radius={component_framing.radius}
              arcRadius={component_framing.arc_radius}
              box_size={component_framing.box_size}
              cy={component_framing.arc_cy}
              cx={component_framing.haloX}
              arc_stroke_width={component_framing.arc_stroke_width}
              />
          <GaugeNeedle size={component_framing.gaugeSize} color={color} cents={cents} />
        </View>
      </View>
    );
}

const createStyle = () => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inverseOnSurface,
  },
  textContainer: { 
    alignItems: 'center', 
    marginTop: 24 
  },
});
