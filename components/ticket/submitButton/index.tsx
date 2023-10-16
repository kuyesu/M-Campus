import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";

import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import StyledText from "@/components/Text/StyledText";

type Props = {};

const SubmitButton = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <Pressable
      onPress={() => router.push("/inquiries/ticket/")}
      style={[
        style.footer,
        {
          backgroundColor: activeColors.secondary,
          borderColor: activeColors.grayAccent,
          borderRadius: 5,
          borderWidth: 1,
        },
      ]}
    >
      <View className="flex">
        <View className="flex relative w-full flex-col space-y-3  ">
          <View>
            <View
              className={` flex  right-0.5 items-center  w-full justify-center  p-2.5 font-bold rounded-full  `}
              style={
                {
                  // borderColor: "#041633",
                  // borderWidth: 1,
                }
              }
            >
              <StyledText className=" underline">
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={25}
                  color={
                    theme.mode === "dark"
                      ? activeColors.accent
                      : activeColors.tint
                  }
                />
              </StyledText>
            </View>

            {/* <Link href={"/chat"} asChild> */}
            {/* <View
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
                name="note-edit-outline"
                size={25}
                color={
                  theme.mode === "dark"
                    ? activeColors.secondary
                    : activeColors.tint
                }
              />
            </View> */}
            {/* </Link> */}
          </View>
        </View>
      </View>
      <View>
        <StyledText>Submit a New Inquiry</StyledText>
        <StyledText
          style={{
            fontSize: 12,
          }}
        >
          Mi assistant can help you with most of your inquiries
        </StyledText>
      </View>
    </Pressable>
  );
};

export default SubmitButton;

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
