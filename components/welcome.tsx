import {
  StyleSheet,
  View,
  Switch,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

// components
import MainContainer from "@/components/container/MainContainer";
import StyledText from "@/components/Text/StyledText";
import { colors } from "@/constants/Colors";
import SettingItem from "@/components/reuseable/Settings/SettingItem";
import { ThemeContext } from "@/context/themeContext";
import { StatusBar } from "expo-status-bar";

export default function TabOneScreen() {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const navigation = useNavigation();
  const [fontLoaded] = useFonts({
    B: require("@/assets/fonts/bold.ttf"),
    E: require("@/assets/fonts/exbold.ttf"),
    H: require("@/assets/fonts/heavy.ttf"),
  });

  return (
    <MainContainer
      style={[
        styles.container1,
        theme.mode === "light" && { backgroundColor: "#F04D4E" },
      ]}
    >
      <StatusBar backgroundColor="#F04D4E" />
      {/* here is custom welcome */}
      <ImageBackground
        source={require("@/assets/bg.png")}
        style={{ height: "100%", width: "100%" }}
        imageStyle={{ resizeMode: "cover", alignSelf: "flex-end" }}
      >
        <View style={{ marginHorizontal: "7.5%", marginTop: "10%" }}>
          <View style={{ marginTop: "60%" }}></View>
          <Image
            source={require("@/assets/logo.png")}
            style={styles.logo}
          ></Image>
          <StyledText style={{ fontFamily: "H", fontSize: 40, color: "#FFF" }}>
            <StyledText style={{ color: "#FBCACA" }}>Redi</StyledText>Surf
          </StyledText>
          <StyledText
            style={{
              fontFamily: "B",
              fontSize: 18,
              width: "70%",
              color: "#FFF",
            }}
          >
            University Inquiries, AI Supercharged with ultimate corncerns at
            fingertips.
          </StyledText>
          <View style={{ marginTop: "15%" }}></View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <LinearGradient
              // Button Linear Gradient
              colors={["#FFFFFF", "#F4ACAC"]}
              start={[1, -0.3]}
              end={[1, 1]}
              style={styles.btn}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <StyledText style={styles.btnlabel}>Login</StyledText>
                {/* <Icon
                    name="rightcircle"
                    type="ant-design"
                    color="#F04D4E"
                    style={{ textAlign: "right" }}
                  ></Icon> */}
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <View style={styles.btn2}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <StyledText style={styles.btnlabel2}>Sign up</StyledText>
                {/* <Icon
                    name="rightcircle"
                    type="ant-design"
                    color="#FFF"
                    style={{ textAlign: "right" }}
                  ></Icon> */}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container1: {
    height: "100%",
    position: "relative",
  },
  setting: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
    marginBottom: 25,
  },
  logo: {
    width: "20%",
    height: "20%",
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  title: {
    fontFamily: "H",
    fontSize: 20,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "B",
    color: "#FFF",
    fontSize: 17,
    textAlign: "center",
    marginTop: "50%",
    width: "40%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#F4ACAC",
    paddingVertical: "5%",
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: "10%",
    paddingHorizontal: "10%",
  },
  btnlabel: {
    fontFamily: "H",
    fontSize: 20,
    textAlign: "left",
    color: "#F04D4E",
  },
  btn2: {
    backgroundColor: `rgba(255, 255, 255, 0.1)`,
    paddingVertical: "5%",
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: "5%",
    paddingHorizontal: "10%",
    borderColor: `rgba(252, 219, 220, 0.5)`,
    borderWidth: 2,
  },
  btnlabel2: {
    fontFamily: "H",
    fontSize: 20,
    textAlign: "left",
    color: "#FFF",
  },
});
