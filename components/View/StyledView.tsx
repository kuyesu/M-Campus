import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { colors } from "@/constants/Colors";
import StyledText from "@/components/Text/StyledText";
import { ThemeContext } from "@/context/themeContext";

const StyledView = ({ children, small, big, style, ...props }: any) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <View
      style={[
        {
          backgroundColor: activeColors.secondary,
          borderRadius: small ? 5 : big ? 24 : 15,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});
export default StyledView;
