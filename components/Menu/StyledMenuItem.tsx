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
          // alignItems: "center",
          // width: "15%",
          // justifyContent: "center",
          // padding: 10,
        },

        style,
      ]}
      {...props}
      className=" items-center justify-center"
    >
      <MaterialCommunityIcons
        name={icon}
        // name="view-dashboard-outline"
        size={20}
        style={{
          marginBottom: 5,
          backgroundColor: activeColors.backgroundColorOpacity,
          borderRadius: 50,
          padding: 10,
        }}
        color={activeColors.tint}
      />
      <StyledText style={{ fontSize: 12 }}>{name}</StyledText>
    </TouchableOpacity>
  );
};

export default StyledMenuItem;
