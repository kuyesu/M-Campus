import { TouchableOpacity, Text } from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "../Text/StyledText";

const StyledMenuItem = ({ name, icon, style, ...props }: any) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <TouchableOpacity
      style={[
        {
          alignItems: "center",
          width: "15%",
          gap: 10,
        },
        style,
      ]}
      {...props}
    >
      <MaterialCommunityIcons
        name={icon}
        // name="view-dashboard-outline"
        size={30}
        color={activeColors.accent}
      />
      <StyledText style={{ fontSize: 12 }}>{name}</StyledText>
    </TouchableOpacity>
  );
};

export default StyledMenuItem;
