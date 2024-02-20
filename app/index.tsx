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
import Svg, { Path, Polygon } from "react-native-svg";

export default function Welcome({ props }) {
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
    <View style={{ flex: 1, height: "100%" }}>
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          {isAuthenticated ? (
            router.replace("/home")
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: activeColors.primary,
                height: "100%",
              }}
            >
              <StatusBar
                // backgroundColor={activeColors.primary}
                style={theme.mode === "dark" ? "dark" : "light"}
                backgroundColor="transparent"
              />
              <ImageBackground
                source={require("../assets/bg.png")}
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                }}
                imageStyle={{
                  resizeMode: "cover",
                  alignSelf: "flex-end",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <View
                    style={{
                      alignItems: "flex-start",
                      height: "50%",
                      width: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        top: -90,
                        left: 0,
                        zIndex: 2,
                        width: "100%",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 9 6"
                        fill="rgba(0,0,0,0.9)"
                        {...props}
                      >
                        <Path d="M0 5l9 3V0H0v3" />
                      </Svg>
                      <View
                        style={{
                          position: "absolute",
                          paddingHorizontal: "7.5%",
                        }}
                      >
                        <StyledText
                          // bold
                          style={{
                            fontSize: 35,
                            color: activeColors.gray,
                            fontFamily: "B",
                            lineHeight: 35,
                          }}
                        >
                          MBARARA UNIVERSITY
                        </StyledText>
                        <StyledText
                          style={{
                            color: activeColors.gray,

                            fontFamily: "H",
                            fontSize: 20,
                          }}
                        >
                          of Science and Technology
                        </StyledText>
                        <View
                          style={{
                            borderColor: activeColors.gray,
                            borderWidth: 1,
                            width: "100%",
                            height: 1,
                            marginTop: 10,
                          }}
                        />
                      </View>
                    </View>

                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 8 6"
                      style={{
                        position: "absolute",
                        top: 18,
                        right: 1,
                        zIndex: 2,
                      }}
                      fill={activeColors.warning}
                      {...props}
                    >
                      <Path d="M0 3l9 3v-.409L.026 2.602 0 0" />
                    </Svg>
                    <View
                      style={{
                        position: "absolute",
                        top: 225,
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 3 9 7.039"
                        {...props}
                        fill={activeColors.accent}
                      >
                        <Path d="M0 3l9 3v1.968L.008 9.039 0 3" />
                      </Svg>
                      <StyledText
                        style={{
                          fontFamily: "B",
                          fontSize: 35,
                          width: "100%",
                          padding: "7.5%",
                          paddingTop: "33%",
                          position: "absolute",
                          color: activeColors.primary,
                        }}
                      >
                        Micampus
                      </StyledText>
                    </View>
                  </View>

                  <View
                    style={{
                      marginHorizontal: "7.5%",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-start",
                        height: "60%",
                        width: "100%",
                      }}
                    ></View>

                    <View style={{ marginTop: "15%", gap: 20 }}>
                      <TouchableOpacity
                        onPress={() => router.push("/auth/login")}
                      >
                        <View
                          style={{
                            borderColor: activeColors.tertiary,
                            borderWidth: 1,
                            borderRadius: 30,
                            paddingVertical: "4%",
                            width: "100%",
                            backgroundColor: activeColors.primary,
                            paddingLeft: "10%",
                            paddingRight: "5%",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <StyledText
                              style={[
                                styles.btnlabel2,
                                { color: activeColors.tertiary },
                              ]}
                            >
                              Log In
                            </StyledText>
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
                      <TouchableOpacity
                        onPress={() => router.push("/auth/register")}
                      >
                        {/* <TouchableOpacity onPress={() => router.push("/home")}> */}
                        <View
                          // Button Linear Gradient
                          style={{
                            borderColor: activeColors.grayAccent,
                            borderWidth: 1,
                            borderRadius: 30,
                            paddingVertical: "4%",
                            width: "100%",
                            backgroundColor: activeColors.accent,
                            paddingHorizontal: "10%",
                          }}
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
                                width: "100%",

                                color: activeColors.primary,
                              }}
                              bold
                            >
                              Sign Up
                            </StyledText>
                            <MaterialCommunityIcons
                              name="chevron-right-circle"
                              type="ant-design"
                              color={activeColors.primary}
                              style={{ textAlign: "right" }}
                              size={24}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        width: "100%",
                        paddingTop: 50,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "B",
                          fontSize: 16,
                          width: "100%",
                          color: activeColors.gray,
                          textAlign: "center",
                        }}
                      >
                        By continuing, you are agree to our privacy policy and
                        terms of use
                      </Text>
                    </View>
                    <View style={{ marginBottom: "0%" }}></View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          )}
        </>
      )}
    </View>
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
