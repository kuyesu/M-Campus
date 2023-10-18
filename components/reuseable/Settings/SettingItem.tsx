import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { colors } from "@/constants/Colors";
import StyledText from "@/components/Text/StyledText";
import { ThemeContext } from "@/context/themeContext";

const SettingItem = ({ children, label }: any) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <View
      style={[
        {
          backgroundColor: activeColors.primary,
        },
        styles.setting,
      ]}
    >
      <StyledText style={[{ color: activeColors.tertiary }, styles.label]}>
        {label}
      </StyledText>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 25,
    marginBottom: 2,
  },
  label: {
    fontStyle: "italic",
  },
});
export default SettingItem;
