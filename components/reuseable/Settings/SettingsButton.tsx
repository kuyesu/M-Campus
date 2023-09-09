import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { colors } from "@/constants/Colors";
import StyledText from "@/components/Text/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";

const SettingsButton = ({ icon, label, isActive, ...props }: any) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: activeColors.secondary,
        },
        styles.setting,
      ]}
      {...props}
    >
      <View style={styles.labelGroup}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={activeColors.tertiary}
          style={styles.icon}
        />
        <StyledText style={[{ color: activeColors.tertiary }, styles.label]}>
          {label}
        </StyledText>
      </View>
      <MaterialCommunityIcons
        name={
          isActive ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"
        }
        size={24}
        color={isActive ? activeColors.accent : activeColors.tertiary}
      />
    </TouchableOpacity>
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
  labelGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
});
export default SettingsButton;
