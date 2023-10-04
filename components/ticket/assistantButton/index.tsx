import {
  View,
  Text,
  StyleSheet,
  Pressable,

} from "react-native";
import React, { useContext} from "react";

import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";


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
          borderColor: activeColors.primary,
          borderWidth: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,

          elevation: 1,
        },
      ]}
    >
      <View>
        <Text
          style={{
            color: activeColors.tint,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Ask AI Assistant
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: activeColors.tertiary,
            fontWeight: "bold",
          }}
        >
          Did you know you can just ask AI?
        </Text>
      </View>
      <View className="flex">
        <View className="flex relative w-full flex-col space-y-3  ">
          <View>
            <View
              className={` flex  right-0.5 items-center  w-full justify-center  p-2.5 font-bold rounded-full  `}
              style={{
                shadowColor: "#000",
                backgroundColor: activeColors.accent,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                borderColor: "#041633",
                borderWidth: 1,
              }}
            >
              <MaterialCommunityIcons
                name="robot"
                size={20}
                color={activeColors.grayAccent}
              />
            </View>

            {/* <Link href={"/chat"} asChild> */}
            <View
              className={` flex absolute -z-10  top-0.5 items-center  w-full justify-center bg-[#041633] p-2.5 font-bold rounded-full  `}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                borderColor: "#041633",
                borderWidth: 1,
              }}
            >
              <MaterialCommunityIcons
                name="robot"
                size={20}
                color={activeColors.grayAccent}
              />
            </View>
            {/* </Link> */}
          </View>
        </View>
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
    justifyContent: "space-between",
    marginVertical: 10,
  },
});