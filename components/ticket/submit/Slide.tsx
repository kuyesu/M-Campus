import StyledText from "@/components/Text/StyledText";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";

const Slide = ({ item }) => {
  const { title, desc, backgroundColor, component } = item;
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <View style={[styles.slide]}>
      <View className="flex w-full items-start pt-4 space-y-3">
        <StyledText className="text-lg font-semibold ">{title}</StyledText>
        <StyledText
          className="text-sm pt-4"
          style={{
            color: activeColors.gray,
          }}
        >
          {desc}
        </StyledText>
        <ScrollView className="my-4 pt-2 w-full">{component}</ScrollView>
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  slide: {
    width: width - 30,
    height,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});

export default Slide;
