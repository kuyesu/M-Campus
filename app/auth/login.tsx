import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "@/components/Text/StyledText";
import MainContainer from "@/components/container/MainContainer";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loginUser } from "@/redux/actions/userAction";
import { StyledTouchableOpacity } from "@/components/buttons/StyledTouchableOpacity";

export default function Login() {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const [secure, setSecure] = useState(true);

  const { error, isAuthenticated, loading } = useSelector(
    (state: any) => state.user
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e: any) => {
    loginUser(email, password)(dispatch);
    // wait for 2 seconds
    setTimeout(() => {
      if (error) {
        if (Platform.OS === "android") {
          ToastAndroid.show(error, ToastAndroid.LONG);
        } else {
          Alert.alert("Email and password not matching!");
        }
      }
      if (isAuthenticated) {
        loadUser()(dispatch);
        router.replace("/home");
      }
    }, 2000);
  };

  useEffect(() => {
    loadUser()(dispatch);
    if (error) {
      if (Platform.OS === "android") {
        ToastAndroid.show(error, ToastAndroid.LONG);
      } else {
        Alert.alert("Email and password not matching!");
      }
    }
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [error]);

  return (
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
          source={require("@/assets/bg.png")}
          style={{ height: "80%", width: "100%" }}
          imageStyle={{ resizeMode: "cover", alignSelf: "flex-end" }}
        >
          <View style={{ marginHorizontal: "7.5%", marginTop: "10%" }}>
            <View style={{ marginTop: "60%" }}></View>

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

            <View
              style={{
                paddingBottom: 20,
              }}
            >
              <StyledText
                style={{
                  color: activeColors.gray,
                }}
              >
                Login to your existing account
              </StyledText>
            </View>

            <View
              style={{
                flexDirection: "row",
                // marginTop: 10,
              }}
            >
              <View style={{ width: "100%" }}>
                <StyledTextInput
                  style={{
                    backgroundColor: activeColors.backgroundColorOpacity,
                    fontSize: 20,
                    borderRadius: 15,
                    paddingLeft: 20,
                    borderWidth: 2,

                    borderColor: activeColors.gray,
                  }}
                  autoCapitalize="none"
                  className=" w-full px-0"
                  bold
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="username or email"
                  placeholderTextColor={activeColors.gray}
                  cursorColor={activeColors.tint}
                />
              </View>
              <MaterialCommunityIcons
                name="email"
                type="material"
                color={activeColors.accent}
                size={30}
                style={{
                  textAlign: "right",
                  position: "absolute",
                  right: 20,
                  top: 15,
                }}
              />
            </View>

            <View
              style={{
                marginTop: "5%",

                flexDirection: "row",
              }}
            >
              <View style={{ width: "100%" }}>
                <StyledTextInput
                  style={{
                    backgroundColor: activeColors.backgroundColorOpacity,
                    fontSize: 20,
                    borderRadius: 15,
                    paddingLeft: 20,
                    borderWidth: 2,
                    borderColor: activeColors.gray,
                  }}
                  // onChangeText={(text) => setName(text)}
                  className=" w-full px-0"
                  bold
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={secure}
                  placeholder="Password"
                  placeholderTextColor={activeColors.gray}
                  cursorColor={activeColors.tint}
                />
              </View>

              <MaterialCommunityIcons
                name="eye"
                type="ant-design"
                color={activeColors.tint}
                size={35}
                style={{
                  textAlign: "right",
                  position: "absolute",
                  right: 20,
                  top: 15,
                }}
                onPress={() => {
                  setSecure(!secure);
                }}
              />
            </View>

            <View className="pt-16">
              {loading ? (
                <StyledTouchableOpacity
                  disabled={true}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator
                    size="small"
                    color={activeColors.primary}
                  />
                </StyledTouchableOpacity>
              ) : (
                <StyledTouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 15,
                  }}
                  onPress={submitHandler}
                >
                  Log in
                </StyledTouchableOpacity>
              )}
            </View>

            <Link href={"/auth/register"} asChild>
              <TouchableOpacity
                // onPress={() => router.push("/")}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <StyledText
                  style={{
                    fontFamily: "E",
                    fontSize: 16,
                    //   marginLeft: "10%",
                    marginTop: "8%",
                    //   backgroundColor: `rgba(252, 219, 220, 0.3)`,
                    //   width: "60%",
                    lineHeight: 18,
                    color: activeColors.tint,
                  }}
                >
                  Don{"'"}t have account?
                </StyledText>
                <StyledText
                  style={{
                    fontFamily: "E",
                    fontSize: 20,
                    paddingLeft: 10,
                    marginTop: "8%",
                    //   backgroundColor: `rgba(252, 219, 220, 0.3)`,
                    width: "50%",
                    lineHeight: 18,
                    fontWeight: "900",
                    color: activeColors.tint,
                  }}
                >
                  register
                </StyledText>
              </TouchableOpacity>
            </Link>
          </View>
        </ImageBackground>
      </MainContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
    backgroundColor: "#F04D4E",
  },
  logo: {
    width: "15%",
    height: "15%",
    resizeMode: "contain",
    alignSelf: "flex-start",
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
    paddingVertical: "4%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 50,
    marginTop: "10%",
    paddingHorizontal: "10%",
  },
  btnlabel: {
    fontFamily: "H",
    fontSize: 24,
    textAlign: "center",
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
    textAlign: "center",
    color: "#FFF",
  },
});
