import React, {memo, useCallback, useMemo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const defaultFill = '#00A6F5';
const defaultTrack = '#FFFFFF';

type Props = {
  data: number[] | string[];
  trackColor?: string;
  trackFillColor?: string;
  thumbColor?: string;
  thumbHoverColor?: string;
  trackWidth?: number;
  showHover?: boolean;
  showTooltip?: boolean;
};

export default memo(
  ({
    data,
    trackColor = defaultTrack,
    trackFillColor = defaultFill,
    thumbColor = defaultFill,
    thumbHoverColor = defaultFill,
    trackWidth,
    showHover = true,
    showTooltip,
  }: Props) => {
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [containerOffsetX, setContainerOffsetX] = useState<number>(0);
    const [currentValue, setCurrentValue] = useState<number | string>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const widthValue = useSharedValue(0);
    const circleXValue = useSharedValue(0);
    const opacityValue = useSharedValue(0);

    const disabled = useMemo(() => data.length <= 1, [data]);

    const widthStyle = useAnimatedStyle(() => {
      return {
        width: widthValue.value,
      };
    });

    const circleStyle = useAnimatedStyle(() => {
      return {
        left: Math.max(circleXValue.value - 10, 0),
      };
    });

    const toolTipStyle = useAnimatedStyle(() => {
      return {
        opacity: opacityValue.value,
      };
    });

    const step = useMemo(() => {
      if (data.length <= 1) return 0;
      return containerWidth / data.length;
    }, [data, containerWidth]);

    const updateCurrentValue = useCallback(
      (position: number) => {
        const index = Math.floor(position / step);
        if (index >= 0 && index < data.length) {
          setCurrentValue(data[index]);
        }
      },
      [data, step],
    );

    const blueCirclePositions = useMemo(() => {
      if (data.length <= 1) return [0];
      const availableWidth = containerWidth - 20;
      return data.map((_, index) => {
        return (index / (data.length - 1)) * availableWidth + 20 / 2;
      });
    }, [data, containerWidth]);

    const onMove = useCallback(
      (position: number, animate?: boolean) => {
        setIsDragging(!animate);
        opacityValue.value = withTiming(animate ? 0 : 1, {duration: 150});
        const adjustedX = position - containerOffsetX;
        const x = Math.min(Math.max(0, adjustedX), containerWidth);
        const circleX = Math.min(x, containerWidth - 10);
        updateCurrentValue(x);

        let index = Math.floor(x / step);
        index = Math.min(index, data.length - 1);

        const snappedPosition = blueCirclePositions[index];

        widthValue.value = animate
          ? withTiming(snappedPosition, {duration: 150})
          : x;
        circleXValue.value = animate
          ? withTiming(snappedPosition, {duration: 150})
          : circleX;
      },
      [
        blueCirclePositions,
        containerOffsetX,
        containerWidth,
        data,
        step,
        widthValue,
        circleXValue,
      ],
    );

    const pan = Gesture.Pan()
      .onChange(event => {
        runOnJS(onMove)(event.absoluteX);
      })
      .onFinalize(event => {
        runOnJS(onMove)(event.absoluteX, true);
      });

    const onLayout = useCallback((event: LayoutChangeEvent) => {
      setContainerWidth(event.nativeEvent.layout.width);
      setContainerOffsetX(event.nativeEvent.layout.x);
    }, []);

    return (
      <View
        onLayout={onLayout}
        style={[
          styles.trackContainer,
          {backgroundColor: trackColor, width: trackWidth || '100%'},
        ]}>
        <Animated.View
          style={[
            widthStyle,
            styles.trackFill,
            {backgroundColor: trackFillColor},
          ]}>
          <Animated.View
            style={[circleStyle, styles.circle, {backgroundColor: thumbColor}]}>
            {showTooltip && (
              <Animated.View
                style={[
                  toolTipStyle,
                  styles.triangle,
                  {borderTopColor: trackColor},
                ]}>
                <View
                  style={[
                    styles.toolTipContainer,
                    {backgroundColor: trackColor},
                  ]}>
                  <Text>{currentValue}</Text>
                </View>
              </Animated.View>
            )}
            {showHover && isDragging && (
              <View
                style={[styles.hover, {backgroundColor: thumbHoverColor}]}
              />
            )}
          </Animated.View>
        </Animated.View>
        {!disabled && (
          <GestureDetector gesture={pan}>
            <View style={[styles.gesture]} />
          </GestureDetector>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  trackContainer: {
    alignSelf: 'center',
    width: '100%',
    borderRadius: 8,
    height: 8,
  },
  trackFill: {
    height: 8,
    borderRadius: 8,
  },
  gesture: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
    height: 40,
    top: -16,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 20,
    width: 20,
    top: -6,
    borderRadius: 20,
  },
  hover: {
    width: 48,
    height: 48,
    borderRadius: 48,
    opacity: 0.1,
  },
  triangle: {
    top: -30,
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  toolTipContainer: {
    padding: 6,
    height: 30,
    position: 'absolute',
    alignSelf: 'center',
    top: -40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
