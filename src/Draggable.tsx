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
import {
  animationConfig,
  getOrder,
  getPosition,
  Positions,
  SIZE,
} from './Config';

interface DraggableProps {
  children: ReactNode;
  scrollRef: MutableRefObject<any>;
  id: string | number;
  positions: Animated.SharedValue<Positions>;
  containerHeight: Animated.SharedValue<number>;
  scrollY: Animated.SharedValue<number>;
  scrollEnabled: Animated.SharedValue<boolean>;
  onDragEnd: (diffs: Positions) => void;
}

const Draggable: React.FC<DraggableProps> = ({
  children,
  scrollRef,
  id,
  scrollY,
  positions,
  scrollEnabled,
  containerHeight,
  onDragEnd,
}) => {
  const longPressRef = useRef();
  const panRef = useRef();

  const beingDragged = useSharedValue<boolean>(false);

  console.log(`container Height ${containerHeight.value}`);

  const contentHeight = Object.keys(positions.value).length * SIZE;

  const position = getPosition(positions.value[id]!);
  const translateY = useSharedValue(position.y);

  useAnimatedReaction(
    () => positions.value[id]!,
    (newOrder) => {
      if (!beingDragged.value) {
        const pos = getPosition(newOrder);
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
        );

        // 2. We swap the positions
        const oldOlder = positions.value[id];
        if (newOrder !== oldOlder) {
          const idToSwap = Object.keys(positions.value).find(
            (key) => positions.value[key] === newOrder,
          );
          if (idToSwap) {
            // Spread operator is not supported in worklets
            // And Object.assign doesn't seem to be working on alpha.6
            const newPositions = JSON.parse(JSON.stringify(positions.value));
            newPositions[id] = newOrder;
            newPositions[idToSwap] = oldOlder;
            positions.value = newPositions;
          }
        }

        // 3. Scroll up and down if necessary
        const lowerBound = scrollY.value;
        const upperBound = lowerBound + containerHeight.value - SIZE;
        const maxScroll = contentHeight - containerHeight.value;
        const leftToScrollDown = maxScroll - scrollY.value;

        console.log(
          `maxScroll ${maxScroll}, leftToScrollDown ${leftToScrollDown}, upperBound ${upperBound}`,
        );

        console.log(`lowerBound ${lowerBound}`);
        console.log(`upperBound ${upperBound}`);

        if (translateY.value < lowerBound) {
          // console.log(`should scroll up`);
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
      const newPosition = getPosition(positions.value[id]!);
      translateY.value = withTiming(newPosition.y, animationConfig, () => {
        runOnJS(onDragEnd)(positions.value);
      });
    },
  });

  const handleLongPress = ({ nativeEvent }: any) => {
    console.log('pressed');

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
      width: 100,
      height: 140,
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
