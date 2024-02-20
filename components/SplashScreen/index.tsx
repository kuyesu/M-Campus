import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import MainContainer from "../container/MainContainer";
import StyledText from "../Text/StyledText";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

type Props = {};

const SplashScreen = (props: Props) => {
  const [name, setName] = useState("");
  const router = useRouter();
  useEffect(() => {
    retrieveData();
    setTimeout(() => {
      if (name === "") {
        // router.replace("/auth/login");
      } else {
        // router.replace("/(drawer)/(dashboard)/home");
      }
    }, 3000);
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        console.log(value);
        setName(value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const translateY = new Animated.Value(0);
  const duration = 800;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 20,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateY]);



  return (
    <MainContainer style={styles.container}>
      <ImageBackground
        source={require("@/assets/bg.png")}
        style={{ height: "100%", width: "100%" }}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-end",
          flex: 1,
          opacity: 0.4,
          left: 60,
          top: 10,
        }}
      >
        <View style={styles.logoContainer}>
          <View
            style={{
              height: "65%",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: "0%",
              paddingHorizontal: 25,
            }}
          >
            <StyledText
              style={{
                fontFamily: "H",
                fontSize: 50,
                color: activeColors.tint,
                textAlign: "center",
              }}
            >
              <StyledText
                // bold
                style={{
                  fontSize: 50,
                  color: activeColors.accent,
                  fontFamily: "H",
                  textAlign: "center",
                }}
              >
                Mi
              </StyledText>
              University
            </StyledText>

            <View
              style={{
                width: "60%",
              }}
            >
              <Animated.Text
                style={{
                  fontFamily: "B",
                  fontSize: 18,
                  width: "100%",
                  paddingTop: 20,
                  color: activeColors.tint,
                  textAlign: "center",
                  transform: [{ translateY }],
                }}
              >
                ⚡ Supercharged with AI and AR
              </Animated.Text>
              {/* <Animated.View
                style={{
                  paddingTop: 20,
                  transform: [{ translateY }],
                }}
              >
                <Image
                  source={require("@/assets/images/logo.png")}
                  style={{ height: 100, width: 100, left: -20 }}
                />
              </Animated.View> */}
            </View>
          </View>
        </View>

        
        <View style={[styles.intro, { gap: 10 }]}>
          <StyledText
            small
            style={{
              color: activeColors.gray,
            }}
          >
            From
          </StyledText>
          <Image
            source={require("@/assets/images/must.png")}
            style={{ height: 45, width: 45 }}
          ></Image>
          <StyledText style={styles.subtitleFb}>MBARARA UNIVERSITY</StyledText>
        </View>
        <StatusBar
          // backgroundColor={activeColors.primary}
          // backgroundColor={theme.mode === "dark" ? "dark" : "light"}
          style={theme.mode === "dark" ? "light" : "dark"}
        />
      </ImageBackground>
    </MainContainer>
  );
};

export default SplashScreen;

const Splash = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: activeColors.primary,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MainContainer
        // className="flex-1"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StatusBar
          // backgroundColor={activeColors.primary}
          style={theme.mode === "dark" ? "light" : "dark"}
        />
        <ImageBackground
          source={require("@/assets/bg.png")}
          style={{ height: "89%", width: "100%" }}
          imageStyle={{ resizeMode: "cover", alignSelf: "flex-end", flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: "15%",
              paddingTop: "20%",
            }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <StyledText
                style={{
                  fontFamily: "H",
                  fontSize: 30,
                  color: activeColors.tint,
                }}
              >
                <StyledText
                  // bold
                  style={{
                    fontSize: 30,
                    color: activeColors.accent,
                    fontFamily: "H",
                  }}
                >
                  Mi
                </StyledText>
                Campus
              </StyledText>
              <Text
                style={{
                  fontFamily: "B",
                  fontSize: 18,
                  width: "50%",
                  color: activeColors.tint,
                }}
              >
                Supercharged with AI and AR
              </Text>
            </View>

            <ActivityIndicator size="large" color={activeColors.accent} />
            <Text
              style={[
                {
                  color: activeColors.tint,
                  fontSize: 15,
                  fontWeight: "normal",
                  fontFamily: "B",
                  textAlign: "center",
                },
              ]}
            >
              With Love <Text>{theme.mode === "dark" ? "💚" : "💙"}</Text>{" "}
              Mbarara University &copy; 2023
            </Text>
          </View>
        </ImageBackground>
      </MainContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    flex: 0.9,
    justifyContent: "center",
  },
  logo: {
    height: 70,
    width: 70,
  },
  subtitleFrom: {
    color: "#8E8E8E",
    textAlign: "center",
  },
  subtitleFb: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 2,
  },
  subtitleLogo: {
    // textAlign: "center",
    // fontWeight: "bold",
    // fontSize: 15,
    // letterSpacing: 2,
  },
  intro: {
    flex: 0.1,
    paddingBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
