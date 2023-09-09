import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import StyledText from "../Text/StyledText";

const Slide = ({ item }) => {
  const { title, desc, backgroundColor, component } = item;
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <View style={[styles.slide]}>
      <View
        className="flex  items-start justify-between pt-20"
        style={{ height: "73%", width: "100%" }}
      >
        <StyledText bold>{title}</StyledText>

        <ScrollView className="my-4 mt-8 " style={{ width: "100%" }}>
          {component}
        </ScrollView>
        <Text
          className="text-base pr-1"
          style={{
            color: activeColors.gray,
          }}
        >
          {desc}
        </Text>
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  slide: {
    width: width - 35,
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
