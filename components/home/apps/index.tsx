import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledMenuItem from "@/components/Menu/StyledMenuItem";
import StyledText from "@/components/Text/StyledText";
import { router } from "expo-router";

const MoreApps = () => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: activeColors.primary,
        },
      ]}
    >
      <View
        style={{
          padding: 25,
        }}
      >
        <StyledText
          style={{
            fontWeight: "900",
            fontSize: "16",
          }}
        >
          More Functionalities
        </StyledText>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
        className="flex flex-row "
      >
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 25,
              gap: 10,
            },
          ]}
          onPress={() => {
            router.push("/hostels");
          }}
        >
          <LinearGradient
            colors={["#3f87a6", "#00B2EE"]}
            style={{
              padding: 15,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("@/assets/app/timetable.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </LinearGradient>
          <StyledText style={{ fontSize: 16 }}>Timetable</StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 25,
              gap: 10,
            },
          ]}
          onPress={() => {
            router.push("/hostels");
          }}
        >
          <LinearGradient
            colors={["#C6E2FF", "#C6E2FF"]}
            style={{
              padding: 15,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("@/assets/app/post.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </LinearGradient>

          <StyledText style={{ fontSize: 16 }}>Mi-Update </StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 25,
              gap: 10,
            },
          ]}
          onPress={() => {
            router.push("/hostels");
          }}
        >
          <LinearGradient
            colors={["#8fd3f4", "#e2ebf0", "#f68084"]}
            style={{
              padding: 15,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Image
              source={require("@/assets/app/career.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </LinearGradient>

          <StyledText style={{ fontSize: 16 }}>Career</StyledText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
        className="flex flex-row "
      >
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 25,
              gap: 10,
            },
          ]}
          onPress={() => {
            router.push("/hostels");
          }}
        >
          <LinearGradient
            colors={["#009ACD", "#44107A"]}
            style={{
              padding: 15,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Image
              source={require("@/assets/app/health.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </LinearGradient>
          <StyledText style={{ fontSize: 16 }}>Health</StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 25,
              gap: 10,
            },
          ]}
          onPress={() => {
            router.push("/hostels");
          }}
        >
          <LinearGradient
            colors={["#f68084", "#8fd3f4"]}
            style={{
              padding: 15,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Image
              source={require("@/assets/app/map.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </LinearGradient>

          <StyledText style={{ fontSize: 16 }}>Locations</StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 25,
              gap: 10,
            },
          ]}
          onPress={() => {
            router.push("/hostels");
          }}
        >
          <LinearGradient
            colors={["#E0EEEE", "#E0EEEE"]}
            style={{
              padding: 15,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Image
              source={require("@/assets/app/eco.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </LinearGradient>

          <StyledText style={{ fontSize: 16 }}>Green</StyledText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
        className="flex flex-row "
      >
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 25,
              gap: 10,
            },
          ]}
          onPress={() => {
            router.push("/hostels");
          }}
        >
          <LinearGradient
            colors={["#ADEAEA", "#D1EEEE"]}
            style={{
              padding: 15,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Image
              source={require("@/assets/app/hostel.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </LinearGradient>
          <StyledText style={{ fontSize: 16 }}>Hostel</StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 25,
              gap: 10,
            },
          ]}
          onPress={() => {
            router.push("/hostels");
          }}
        >
          <LinearGradient
            colors={["#C1F0F6", "#C1F0F6"]}
            style={{
              padding: 15,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Image
              source={require("@/assets/app/inquire.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </LinearGradient>

          <StyledText style={{ fontSize: 16 }}>Inquiries</StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              margin: 25,
              gap: 10,
            },
          ]}
          onPress={() => {
            router.push("/hostels");
          }}
        >
          <LinearGradient
            colors={["#BBFFFF", "#3f87a6"]}
            style={{
              padding: 15,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Image
              source={require("@/assets/app/bot.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </LinearGradient>

          <StyledText style={{ fontSize: 16 }}>Assistant</StyledText>
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
    paddingVertical: 25
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
