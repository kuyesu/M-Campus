import { Text } from "react-native";
import React, { useContext } from "react";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";

const StyeledMessageBox = ({ children, style, small, big, bold, ...props }: any) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <Text
      style={[
        {
          color: `${(props: any) => (props.success ?  activeColors.accent : "red" )}`,
          fontSize: small ? 14 : big ? 24 : 16,
          fontWeight: bold || big ? "bold" : "normal",
              fontFamily: "B",
          textAlign: "center",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default StyeledMessageBox;
