import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "@/components/Text/StyledText";
import StyledView from "@/components/View/StyledView";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/Colors";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { useRouter } from "expo-router";

type Props = {};

const ImportantUpdates = (props: Props) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const router = useRouter();
  return (
    <TouchableOpacity
      style={[
        styles.ticketItem,
        {
          backgroundColor: activeColors.secondary,
          borderRadius: 10,
          borderColor: activeColors.grayAccent,
          borderWidth: 1,
          // borderTopEndRadius: 20,
        },
      ]}
      className="    "
      onPress={() => router.push(`/notifications/important-update`)}
    >
      <View
        style={{
          paddingHorizontal: 20,
        }}
        className=" flex-1 rounded-3xl py-4 w-full "
      >
        <View className="flex flex-row pb-4 justify-between items-center ">
          <View className=" items-center space-x-2 flex flex-row">
            <MaterialCommunityIcons
              size={20}
              strokeWidth={2}
              color={activeColors.accent}
              name="calendar-month-outline"
            />
            <StyledText>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </StyledText>
          </View>
        </View>

        <StyledView
          className="    w-full "
          style={{ borderColor: activeColors.grayAccent }}
        >
          <View
            style={[
              {
                flexDirection: "column",
                alignItems: "flex-start",
                paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                // paddingVertical: Platform.OS === "ios" ? 10 : 5,
                // borderRadius: 5,
                marginRight: 0,
                marginTop: 10,
              },
              { borderWidth: 0, borderLeftWidth: 5 },
              { borderColor: activeColors.accent },
            ]}
            className="py-4 "
          >
            <View />
            <View className="flex px-4 pb-2 flex-row justify-between items-center w-full">
              <StyledText bold>Important Notice</StyledText>
              <MaterialCommunityIcons
                size={20}
                strokeWidth={2}
                color={activeColors.accent}
                name="piston"
              />
            </View>
            <View className="flex px-4 flex-row justify-between items-center w-full">
              <Text
                className=" font-semibold"
                style={{
                  color: activeColors.accent,
                }}
              >
                Registration for Semester 1 2022/2023
              </Text>
            </View>
          </View>
          <View
            style={[
              {
                flexDirection: "column",
                alignItems: "flex-start",
                paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                // paddingVertical: Platform.OS === "ios" ? 10 : 5,
                // borderRadius: 5,
                marginRight: 0,
                marginTop: 10,
              },
              {
                borderColor: "#041633",
                borderWidth: 0,
                borderLeftWidth: 5,
              },
            ]}
            className="py-4  "
          >
            <View />
            <View>
              <MaterialCommunityIcons
                size={15}
                strokeWidth={0.5}
                color={activeColors.gray}
                name="format-quote-open-outline"
              />
            </View>
            <View className="flex pb-2 flex-row justify-between items-center px-4 space-x-5 ">
              <View className=" items-center space-x-2 flex flex-row">
                <StyledText
                  numberOfLines={3}
                  style={{
                    color: activeColors.gray,
                  }}
                  className=" text-ellipsis whitespace-nowrap text-justify"
                >
                  This is to inform all students that the University will open
                  for the first semester 2022/2023 academic year on 30th August
                  2021. All students are expected to report on this date and
                  register for the semester. The semester will start on 6th
                  September 2021. All students are advised to pay tuition and
                  functional fees before reporting to the University. Students
                  are also advised to observe the COVID-19 Standard Operating
                  Procedures (SOPs) as they report to the University.
                </StyledText>
              </View>
            </View>
            <View className="flex flex-row justify-end w-full items-end px-4">
              <MaterialCommunityIcons
                size={15}
                strokeWidth={2}
                color={activeColors.gray}
                name="format-quote-close-outline"
              />
            </View>
            <View className="flex flex-row justify-between items-center px-4">
              <View className=" items-center space-x-2 flex flex-row">
                <MaterialCommunityIcons
                  size={15}
                  strokeWidth={0.5}
                  color={activeColors.gray}
                  name="map-marker-outline"
                />
                <StyledText bold style={{}}>
                  Office of the Academic Registrar
                </StyledText>
              </View>
            </View>
          </View>
        </StyledView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ticketItem: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});

export default ImportantUpdates;
