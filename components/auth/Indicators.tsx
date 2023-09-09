import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

const Indicators = ({ indicatorCount, currentSlideIndex }) => {
  if (!indicatorCount || typeof indicatorCount !== "number") return null;

  let indicators = [];
  for (let i = 0; i < indicatorCount; i++) {
    indicators.push(i);
  }
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return indicators.map((indicator, index) => (
    <View
      key={indicator.toString()}
      style={[
        styles.indicator,
        index === currentSlideIndex ? styles.selected : styles.unSelected,
        {
          backgroundColor: currentSlideIndex
            ? activeColors.accent
            : activeColors.accent,
          borderColor: currentSlideIndex
            ? activeColors.accent
            : activeColors.accent,
        },
      ]}
    />
  ));
};

const styles = StyleSheet.create({
  indicator: {
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selected: {
    // borderWidth: 1,
    width: 30,
    height: 8,
    paddingHorizontal: 5,
  },
  unSelected: {
    borderWidth: 2,

    width: 8,
    height: 8,
  },
});

export default Indicators;
