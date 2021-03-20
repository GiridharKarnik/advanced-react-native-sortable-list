import { Easing } from 'react-native-reanimated';

export interface Positions {
  [id: string]: number;
}

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

export const getPosition = (position: number, rowHeight: number) => {
  'worklet';

  return {
    y: Math.floor(position) * rowHeight,
  };
};

export const getOrder = (ty: number, max: number, rowHeight: number) => {
  'worklet';

  const y = Math.round(ty / rowHeight) * rowHeight;
  const row = Math.max(y, 0) / rowHeight;
  return Math.min(row, max);
};
