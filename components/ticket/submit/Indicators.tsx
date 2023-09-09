import React from "react";
import { View, StyleSheet } from "react-native";

const Indicators = ({ indicatorCount, currentSlideIndex }) => {
  if (!indicatorCount || typeof indicatorCount !== "number") return null;

  let indicators = [];
  for (let i = 0; i < indicatorCount; i++) {
    indicators.push(i);
  }
  return indicators.map((indicator, index) => (
    <View
      key={indicator.toString()}
      style={[
        styles.indicator,
        index === currentSlideIndex ? styles.selected : styles.unSelected,
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
    backgroundColor: "#86e63b",
    borderColor: "#041633",
    // borderWidth: 1,
    width: 30,
    height: 8,
    paddingHorizontal: 5,
  },
  unSelected: {
    backgroundColor: "#041633",
    borderWidth: 2,
    borderColor: "#041633",
    width: 8,
    height: 8,
  },
});

export default Indicators;
