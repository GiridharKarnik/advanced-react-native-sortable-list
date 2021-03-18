import React, { ReactElement } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Draggable from './Draggable';
import Animated, {
  useAnimatedRef,
  useSharedValue,
} from 'react-native-reanimated';
import useComponentSize, { ViewMeasurements } from './useComponentSize';
import { Positions, SIZE } from './Config';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface DraggableListProps {
  children: Array<ReactElement<{ id: string }>>;
  onDragEnd: (diffs: Positions) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({
  children,
  onDragEnd,
}) => {
  const scrollEnabled = useSharedValue<boolean>(false);
  const scrollRef: any = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);

  const containerHeight = useSharedValue<number>(0);

  const [size, onLayout]: [
    ViewMeasurements | undefined,
    any,
  ] = useComponentSize();

  if (size) {
    containerHeight.value = size.height;
  }

  console.log(JSON.stringify(size));

  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children.map((child, index) => ({ [child.props.id]: index })),
    ),
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <ScrollView
      ref={scrollRef}
      onScroll={onScroll}
      contentContainerStyle={{
        height: children.length * SIZE,
      }}
      onScrollBeginDrag={() => {
        scrollEnabled.value = true;
      }}
      onScrollEndDrag={() => {
        scrollEnabled.value = false;
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      onLayout={onLayout}>
      {children.map((child) => {
        return (
          <Draggable
            containerHeight={containerHeight}
            key={child.props.id}
            id={child.props.id}
            scrollRef={scrollRef}
            scrollY={scrollY}
            positions={positions}
            scrollEnabled={scrollEnabled}
            onDragEnd={onDragEnd}>
            {child}
          </Draggable>
        );
      })}
    </ScrollView>
  );
};

export default DraggableList;
