import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";

import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import StyledText from "@/components/Text/StyledText";

type Props = {};

const AssistantButton = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <Pressable
      onPress={() => router.push("/assistant")}
      style={[
        style.footer,
        {
          backgroundColor: activeColors.secondary,
          borderColor: activeColors.grayAccent,
          borderWidth: 2,
          borderRadius: 5,
          // shadowColor: "#000",
          // shadowOffset: {
          //   width: 0,
          //   height: 1,
          // },
          // shadowOpacity: 0.18,
          // shadowRadius: 1.0,

          // elevation: 1,
        },
      ]}
    >
      <View>
        <View
          className={` flex  right-0.5 items-center   justify-center  p-2.5   `}
          style={{}}
        >
          <MaterialCommunityIcons
            name="robot-outline"
            size={25}
            color={activeColors.tint}
          />
        </View>
      </View>

      <View>
        <StyledText
          style={{
            color: activeColors.tint,
          }}
          bold
        >
          Inquire from Mi Assistant
        </StyledText>
        <StyledText
          style={{
            fontSize: 12,
            color: activeColors.tertiary,
          }}
        >
          Get instant response from Mi assistant
        </StyledText>
      </View>
    </Pressable>
  );
};

export default AssistantButton;

const style = StyleSheet.create({
  footer: {
    height: 70,
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",

    marginVertical: 10,
  },
});
