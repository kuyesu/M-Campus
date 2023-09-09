import { Text } from "react-native";
import React, { useContext } from "react";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";

const StyledText = ({ children, style, small, big, bold, ...props }: any) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <Text
      style={[
        {
          color: activeColors.tint,
          fontSize: small ? 14 : big ? 24 : 16,
          fontWeight: bold || big ? "bold" : "normal",
          fontFamily: "B",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default StyledText;
