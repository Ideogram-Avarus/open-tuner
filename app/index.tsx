import { TunerView, useTunerDisplay, useTunerResult } from '@/components/tunerUi';
import { useWindowDimensions } from 'react-native';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const { result: rawData } = useTunerResult();
  const { noteInfo, cents, frequency, color, haloState } = useTunerDisplay(rawData);


  return (
    <TunerView
      width={width}
      noteInfo={noteInfo}
      cents={cents}
      frequency={frequency}
      color={color}
      haloState={haloState}
    />
  );
}
