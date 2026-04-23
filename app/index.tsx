import { AnimatedContainerView, AnimatedHalo, GaugeBackground, GaugeNeedle, useTunerDisplay, useTunerResult } from '@/components/tunerUi';
import { colors } from '@/hooks/theme';
import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyle(insets), [insets]);

  const { result: rawData } = useTunerResult();
  const { noteInfo, cents, tuneDistance, frequency, color, haloState } = useTunerDisplay(rawData);

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
          haloY,
        }
    }, [width]);

  return (
    <View style={styles.safeContainer}>
      <AnimatedContainerView 
          isInTune={tuneDistance}
          isGlowing={rawData?.hasPitch ?? false}
          color={color}
          containerStyle={styles.container}
          >
          <View style={styles.textContainer}>
            <Text variant='displayMedium' style={{color}}>{noteInfo.fullName}</Text>
            <Text variant='labelMedium'style={{ color }}>
              {`${frequency >= 0 ? '+' : ''}${frequency.toFixed(1)} Hz`}
            </Text>
          </View>
          <View style={styles.relativeContainer}>
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
        </AnimatedContainerView>
      </View>
  );
}


const createStyle = ({top, bottom}: {top: number, bottom: number}) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inverseOnSurface
  },
  relativeContainer: {
    position: 'relative', 
    alignItems: 'center', 
    overflow: 'visible'
  },
  textContainer: { 
    alignItems: 'center', 
    marginTop: 24 
  },
  safeContainer: {
    flex: 1,
    paddingTop: top, 
    paddingBottom: bottom
  }
});
