import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledMenuItem from "@/components/Menu/StyledMenuItem";
import StyledText from "@/components/Text/StyledText";
import { router } from "expo-router";

const MoreApps = ({ handleOnPress }: any) => {
  const [open, setOpen] = useState<boolean>();
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <View
      style={[
        styles.container,
        {
          // backgroundColor: "rgba(0,0,0,0.5)",
          backgroundColor: activeColors.primary,
        },
      ]}
    >
      <View
        style={{
          padding: 25,
          paddingTop: 0,
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
        className="flex flex-row w-full px-6"
      >
        <StyledText style={{}} className=" text-left">
          More Functionalities
        </StyledText>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="flex flex-row  w-full px-6"
      >
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 10,
              gap: 10,
            },
          ]}
          onPress={() => handleOnPress("/poll")}
        >
          <LinearGradient
            colors={[activeColors.secondary, activeColors.secondary]}
            style={{
              padding: 15,
              borderRadius: 50,
            }}
          >
            <MaterialCommunityIcons
              name="poll"
              size={25}
              color={activeColors.tint}
            />
          </LinearGradient>
          <StyledText style={{ fontSize: 16 }}>Polls</StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 10,
              gap: 10,
            },
          ]}
          onPress={() => handleOnPress("/map")}
        >
          <View
            // colors={["#C6E2FF", "#C6E2FF"]}
            style={{
              backgroundColor: activeColors.secondary,

              padding: 15,
              borderRadius: 50,
            }}
          >
            <MaterialCommunityIcons
              name="map-marker"
              size={25}
              color={activeColors.tint}
            />
          </View>

          <StyledText style={{ fontSize: 16 }}>Maps</StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 10,
              gap: 10,
            },
          ]}
          onPress={() => handleOnPress("/health")}
        >
          <View
            style={{
              backgroundColor: activeColors.secondary,

              padding: 15,
              borderRadius: 50,
            }}
          >
            <MaterialCommunityIcons
              name="run-fast"
              size={25}
              color={activeColors.tint}
            />
          </View>

          <StyledText style={{ fontSize: 16 }}>Health</StyledText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 10,
              gap: 10,
            },
          ]}
          onPress={() => router.push("/hostels")}
        >
          <View
            style={{
              backgroundColor: activeColors.secondary,

              padding: 15,
              borderRadius: 50,
            }}
          >
            <MaterialCommunityIcons
              name="home-assistant"
              size={25}
              color={activeColors.tint}
            />
          </View>

          <StyledText style={{ fontSize: 16 }}>Hostels</StyledText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MoreApps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 25,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
});
