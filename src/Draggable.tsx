import React, { MutableRefObject, ReactNode, useRef } from 'react';
import { StyleSheet } from 'react-native';
import {
  LongPressGestureHandler,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { animationConfig, getOrder, getPosition, Positions } from './Config';

interface DraggableProps<T> {
  children: ReactNode;
  rowHeight: number;
  scrollRef: MutableRefObject<any>;
  id: string | number;
  positions: Animated.SharedValue<Positions<T>>;
  containerHeight: Animated.SharedValue<number>;
  scrollY: Animated.SharedValue<number>;
  scrollEnabled: Animated.SharedValue<boolean>;
  onDragEnd: (diffs: Positions<T>) => void;
}

const Draggable = <T extends object>(props: DraggableProps<T> & { children?: ReactNode }) => {

  const {
    children,
    rowHeight,
    scrollRef,
    id,
    scrollY,
    positions,
    scrollEnabled,
    containerHeight,
    onDragEnd,
  } = props;

  const longPressRef = useRef();
  const panRef = useRef();

  const beingDragged = useSharedValue<boolean>(false);

  const contentHeight = Object.keys(positions.value).length * rowHeight;

  const position = getPosition(positions.value[id]!.position, rowHeight);
  const translateY = useSharedValue(position.y);

  useAnimatedReaction(
    () => positions.value[id]!.position,
    newOrder => {
      if (!beingDragged.value) {
        const pos = getPosition(newOrder, rowHeight);
        translateY.value = withTiming(pos.y, animationConfig);
      }
    },
  );

  const panGestureEventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { y: number }
  >({
    onStart: (_, context) => {
      context.y = translateY.value;
    },
    onActive: ({ translationY }, ctx) => {
      if (beingDragged.value && !scrollEnabled.value) {
        translateY.value = ctx.y + translationY;
        // 1. We calculate where the tile should be
        const newOrder = getOrder(
          translateY.value,
          Object.keys(positions.value).length - 1,
          rowHeight,
        );

        // 2. We swap the positions
        const oldOrder = positions.value[id].position;
        // const oldOrder1 = updatedArray.value.find(x => x)
        if (newOrder !== oldOrder) {
          const idToSwap = Object.keys(positions.value).find(
            key => positions.value[key].position === newOrder,
          );
          if (idToSwap) {
            // Spread operator is not supported in worklets
            // And Object.assign doesn't seem to be working on alpha.6
            const newPositions = JSON.parse(JSON.stringify(positions.value));
            newPositions[id].position = newOrder;
            newPositions[idToSwap].position = oldOrder;
            positions.value = newPositions;
          }
        }

        // 3. Scroll up and down if necessary
        const lowerBound = scrollY.value;
        const upperBound = lowerBound + containerHeight.value - rowHeight;
        const maxScroll = contentHeight - containerHeight.value;
        const leftToScrollDown = maxScroll - scrollY.value;

        if (translateY.value < lowerBound) {
          const diff = Math.min(lowerBound - translateY.value, lowerBound);
          scrollY.value -= diff;
          scrollTo(scrollRef, 0, scrollY.value, true);
          ctx.y -= diff;
          translateY.value = ctx.y + translationY;
        }

        if (translateY.value > upperBound) {
          const diff = Math.min(
            translateY.value - upperBound,
            leftToScrollDown,
          );
          scrollY.value += diff;
          scrollTo(scrollRef, 0, scrollY.value, false);
          ctx.y += diff;
          translateY.value = ctx.y + translationY;
        }
      }
    },
    onEnd: () => {
      const newPosition = getPosition(positions.value[id]!.position, rowHeight);
      translateY.value = withTiming(newPosition.y, animationConfig, () => {
        runOnJS(onDragEnd)(positions.value);
      });
    },
  });

  const handleLongPress = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE) {
      beingDragged.value = true;
    } else if (
      nativeEvent.state === State.END ||
      nativeEvent.state === State.CANCELLED
    ) {
      beingDragged.value = false;
    }
  };

  const stylez = useAnimatedStyle(() => {
    const zIndex = beingDragged.value ? 100 : 0;
    const scale = withSpring(beingDragged.value ? 1.05 : 1);
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: rowHeight,
      zIndex,
      transform: [{ translateY: translateY.value }, { scale }],
    };
  });

  return (
    <Animated.View style={stylez}>
      <PanGestureHandler
        ref={panRef}
        waitFor={[scrollRef]}
        simultaneousHandlers={[scrollRef, longPressRef]}
        onGestureEvent={panGestureEventHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <LongPressGestureHandler
            ref={longPressRef}
            simultaneousHandlers={panRef}
            maxDist={100000}
            shouldCancelWhenOutside={false}
            onHandlerStateChange={handleLongPress}>
            <Animated.View style={StyleSheet.absoluteFill}>
              {children}
            </Animated.View>
          </LongPressGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Draggable;
