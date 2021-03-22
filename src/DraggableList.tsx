import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedRef,
  useSharedValue,
} from 'react-native-reanimated';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import Draggable from './Draggable';
import useComponentSize, { ViewMeasurements } from './useComponentSize';
import { Positions } from './Config';

interface DraggableListProps {
  children: Array<ReactElement<{ id: string }>>;
  //TODO: Dynamically calculate row height
  rowHeight: number;
  rowCount: number;
  onDragEnd: (diffs: Positions) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({
  children,
  rowHeight,
  rowCount,
  onDragEnd,
}) => {
  //Used to force a re-render on the component after updating "positions" shared value.
  const [, setRefresh] = useState<{}>({});

  const scrollEnabled = useSharedValue<boolean>(false);
  const scrollRef: any = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);

  const containerHeight = useSharedValue<number>(0);

  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children.map((child, index) => ({ [child.props.id]: index })),
    ),
  );

  const [size, onLayout]: [
    ViewMeasurements | undefined,
    any,
  ] = useComponentSize();

  if (size) {
    containerHeight.value = size.height;
  }

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  /**
   * Here we update the "positions" shared value as and when the no of children change.
   * The component is forced to re-render by setting state using an object type value.
   */
  useEffect(() => {
    if (rowCount !== Object.keys(positions.value).length) {
      positions.value = Object.assign(
        {},
        ...children.map((child, index) => ({ [child.props.id]: index })),
      );
      setRefresh({});
    }
  }, [children, positions, rowCount]);

  return (
    <ScrollView
      ref={scrollRef}
      onScroll={onScroll}
      contentContainerStyle={{
        height: children.length * rowHeight,
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
      {children.map(child => {
        if (positions.value[child.props.id] === undefined) {
          return null;
        }

        return (
          <Draggable
            containerHeight={containerHeight}
            rowHeight={rowHeight}
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
