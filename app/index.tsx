import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";

import MainContainer from "@/components/container/MainContainer";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "@/components/Text/StyledText";
import Store from "@/redux/Store";
import { loadUser } from "@/redux/actions/userAction";
import SplashScreen from "@/components/SplashScreen";
import { useRouter } from "expo-router";
import { Image } from "react-native";

export default function Welcome() {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const { isAuthenticated, loading } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    // Store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    loadUser()(dispatch);
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [dispatch]);

  const router = useRouter();
  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          {isAuthenticated ? (
            router.replace("/home")
          ) : (
            <View style={{ flex: 1, backgroundColor: activeColors.primary }}>
              <MainContainer
                // className="flex-1"
                style={{
                  width: Dimensions.get("window").width,
                }}
              >
                <StatusBar
                  // backgroundColor={activeColors.primary}
                  style={theme.mode === "dark" ? "light" : "dark"}
                />
                <ImageBackground
                  source={require("../assets/bg.png")}
                  style={{ height: "89%", width: "100%" }}
                  imageStyle={{
                    resizeMode: "cover",
                    alignSelf: "flex-end",
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      marginHorizontal: "7.5%",
                      marginTop: "10%",
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        marginTop: "40%",
                        marginBottom: "8%",
                        left: -15,
                      }}
                    >
                      <View>
                        <Image
                          source={require("@/assets/images/logo.png")}
                          style={{ height: 80, width: 80 }}
                        ></Image>
                      </View>
                    </View>

                    <StyledText
                      style={{
                        fontFamily: "H",
                        fontSize: 40,
                        color: activeColors.tint,
                      }}
                    >
                      <StyledText
                        // bold
                        style={{
                          fontSize: 40,
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
                    <View style={{ marginTop: "15%" }}></View>
                    <TouchableOpacity
                      onPress={() => router.push("/auth/login")}
                    >
                      {/* <TouchableOpacity onPress={() => router.push("/home")}> */}
                      <LinearGradient
                        // Button Linear Gradient
                        colors={[activeColors.accent, activeColors.accent]}
                        start={[1, -0.3]}
                        end={[1, 1]}
                        style={styles.btn}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <StyledText
                            style={{
                              fontFamily: "B",
                              fontSize: 20,
                              width: "70%",

                              color: activeColors.primary,
                            }}
                            bold
                          >
                            Login
                          </StyledText>
                          <MaterialCommunityIcons
                            name="chevron-right-circle"
                            type="ant-design"
                            color={activeColors.primary}
                            style={{ textAlign: "right" }}
                            size={24}
                          />
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => router.push("/auth/register")}
                    >
                      <View
                        style={[
                          styles.btn2,
                          { borderColor: activeColors.gray },
                        ]}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={[
                              styles.btnlabel2,
                              { color: activeColors.tertiary },
                            ]}
                          >
                            Sign up
                          </Text>
                          <MaterialCommunityIcons
                            name="chevron-right-circle"
                            type="ant-design"
                            color={activeColors.tertiary}
                            style={{ textAlign: "right" }}
                            size={24}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        flex: 1,
                        width: "100%",
                        paddingVertical: 70,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "B",
                          fontSize: 18,
                          width: "100%",
                          color: activeColors.gray,
                        }}
                      >
                        By continuing, you are agree to our Privacy Policy and
                        Terms of use
                      </Text>
                    </View>
                    <View style={{ marginBottom: "0%" }}></View>
                  </View>
                </ImageBackground>
              </MainContainer>
            </View>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "20%",
    height: "20%",
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  title: {
    fontFamily: "H",
    color: "#FFF",
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
    width: "100%",
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
    width: "100%",
    alignSelf: "center",
    borderRadius: 50,
    marginTop: "5%",
    paddingHorizontal: "10%",
    // borderColor: `rgba(252, 219, 220, 0.5)`,
    borderWidth: 2,
  },
  btnlabel2: {
    fontFamily: "H",
    fontSize: 20,
    textAlign: "left",
    color: "#FFF",
  },
});
