import { StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";

const SIZE = 20;

type RingPropType = {
  index: number;
};

const Ring = (props: RingPropType) => {
  const { index } = props;
  const opacityValue = useSharedValue(0.7);
  const scaleValue = useSharedValue(1);

  useEffect(() => {
    opacityValue.value = withDelay(
      index * 200,
      withRepeat(
        withTiming(0, {
          duration: 3000,
        }),
        -1,
        false
      )
    );
    scaleValue.value = withDelay(
      index * 200,
      withRepeat(
        withTiming(4, {
          duration: 3000,
        }),
        -1,
        false
      )
    );
  }, [opacityValue, scaleValue, index]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleValue.value,
        },
      ],
      opacity: opacityValue.value,
    };
  });
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <Animated.View
      style={[
        styles.dot,
        rStyle,
        {
          backgroundColor: activeColors.accent,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    position: "absolute",
  },
});

export default Ring;
