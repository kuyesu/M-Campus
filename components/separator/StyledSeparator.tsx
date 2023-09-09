import { View, Text } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";

const StyledSeparator = () => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <View
      style={{
        width: "100%",
        borderTopColor: "transparent",
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderBottomColor: activeColors.primary,
        borderWidth: 1,
        gap: 2,
      }}
    />
  );
};

export default StyledSeparator;
