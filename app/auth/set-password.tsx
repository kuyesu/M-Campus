import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ToastAndroid,
  Platform,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";

import MainContainer from "@/components/container/MainContainer";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";

import StyledText from "@/components/Text/StyledText";
import { StyledTouchableOpacity } from "@/components/buttons/StyledTouchableOpacity";
import { loadUser, registerUser } from "@/redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import StyledView from "@/components/View/StyledView";
import { Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Email() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { theme, updateTheme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const params = useLocalSearchParams();
  const {
    name: name,
    phone: phone,
    email: email,
    avatar: avatar,
  }: any = params;
  const dispatch = useDispatch();

  const { error, isAuthenticated, loading } = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    if (error) {
      if (Platform.OS === "android") {
        ToastAndroid.show(error, ToastAndroid.LONG);
      } else {
        Alert.alert(error);
      }
    }
    if (isAuthenticated) {
      loadUser()(dispatch);
    }
  }, [error, isAuthenticated]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    if (email === "") {
      if (Platform.OS === "android") {
        ToastAndroid.show("Email cannot be empty!", ToastAndroid.LONG);
      } else {
        Alert.alert("Email cannot be empty!");
      }
    } else if (!email.includes("@")) {
      if (Platform.OS === "android") {
        ToastAndroid.show("Email is not valid!", ToastAndroid.LONG);
      } else {
        Alert.alert("Email is not valid!");
      }
    } else if (password != confirmPassword || password === "") {
      if (Platform.OS === "android") {
        ToastAndroid.show("Passwords do not match!", ToastAndroid.LONG);
      } else {
        Alert.alert("Passwords do not match!");
      }
    } else {
      // @ts-ignore
      registerUser(name, email, phone, password, avatar)(dispatch);
      setIsSuccess(true);
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: activeColors.primary,
        height: "100%",
        display: "flex",
      }}
    >
      <MainContainer
        // className="flex-1"
        style={{
          flex: 1,
          width: Dimensions.get("window").width,
          height: "100%",
          display: "flex",
        }}
      >
        {/* <Formik initialValues={{ name: name, phone: phone, email: "" }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => ( */}
        <View
          style={{
            flex: 1,
            // height:
            //   Platform.OS === "android"
            //     ? Dimensions.get("window").height
            //     : Dimensions.get("window").height - 100,
            width: "100%",
            display: "flex",
            // backgroundColor: activeColors.tint,

            justifyContent: "space-between",
            paddingHorizontal: 25,
            paddingVertical: 25,
            paddingTop: Platform.OS === "android" ? 40 : 40,
          }}
        >
          <View className="gap-10   ">
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <StyledText bold>
                You are almost there, {name}! <Text>🎉</Text>
              </StyledText>
            </View>
            <StyledView
              style={{
                padding: 15,
                paddingVertical: 25,
                borderColor: activeColors.grayAccent,
                borderWidth: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <StyledView
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity>
                  <Image
                    source={{ uri: avatar }}
                    style={{
                      height: 80,
                      width: 80,
                      borderColor: activeColors.grayAccent,
                      borderWidth: 3,
                      // tintColor: activeColors.primary,
                      borderRadius: 50,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </StyledView>
              <View
                style={{
                  gap: 5,
                }}
              >
                <StyledText
                  style={{
                    // color: activeColors.gray,
                    textAlign: "right",
                  }}
                  bold
                >
                  {name}
                  {"  "}
                  <MaterialCommunityIcons
                    name="account"
                    size={20}
                    color={activeColors.accent}
                  />
                </StyledText>
                <StyledText
                  style={{
                    color: activeColors.gray,
                    textAlign: "right",
                  }}
                >
                  {email}
                  {"  "}
                  <MaterialCommunityIcons
                    name="email"
                    size={20}
                    color={activeColors.accent}
                  />
                </StyledText>
                <StyledText
                  style={{
                    color: activeColors.gray,
                    textAlign: "right",
                  }}
                >
                  {phone}
                  {"  "}
                  <MaterialCommunityIcons
                    name="phone"
                    size={20}
                    color={activeColors.accent}
                  />
                </StyledText>
              </View>
            </StyledView>
            <View
              style={{
                marginTop: 20,
                // paddingTop: 80,
              }}
            >
              <StyledTextInput
                style={{
                  backgroundColor: activeColors.primary,
                  fontSize: 16,
                  borderBottomWidth: 2,
                  borderColor: activeColors.grayAccent,
                  width: "100%",
                  borderRadius: 0,
                  borderWidth: 0,
                }}
                // onChangeText={(text) => setName(text)}
                className=" w-full px-0 my-8"
                bold
                // autoFocus
                autoCapitalize="none"
                inputMode="text"
                secureTextEntry
                placeholder="Password"
                placeholderTextColor={activeColors.gray}
                cursorColor={activeColors.tint}
                // value={email}
                onChangeText={(text) => setPassword(text)}
                // onBlur={handleBlur("email")}
                // value={values.email}
              />

              <StyledTextInput
                style={{
                  backgroundColor: activeColors.primary,
                  fontSize: 16,
                  borderBottomWidth: 2,
                  borderColor: activeColors.grayAccent,
                  width: "100%",
                  borderRadius: 0,
                  borderWidth: 0,
                }}
                // onChangeText={(text) => setName(text)}
                className=" w-full px-0"
                bold
                // autoFocus
                autoCapitalize="none"
                inputMode="text"
                secureTextEntry
                placeholder="Confirm Password"
                placeholderTextColor={activeColors.gray}
                cursorColor={activeColors.tint}
                // value={email}
                onChangeText={(text) => setConfirmPassowrd(text)}
                // onBlur={handleBlur("email")}
                // value={values.email}
              />
            </View>
            <StyledText small>
              Choose a strong password to protect your account
            </StyledText>
          </View>

          <View className="gap-10">
            {loading ? (
              <StyledTouchableOpacity
                disabled={true}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="small" color={activeColors.primary} />
              </StyledTouchableOpacity>
            ) : (
              <StyledTouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                  backgroundColor: activeColors.grayAccent,
                }}
                onPress={submitHandler}
              >
                Create Account{" "}
                <MaterialCommunityIcons
                  name="account-edit"
                  size={20}
                  color={activeColors.secondary}
                />
              </StyledTouchableOpacity>
            )}
          </View>
        </View>
        {/* )}
          </Formik> */}

        <StatusBar
          // backgroundColor={activeColors.primary}
          style={theme.mode === "dark" ? "light" : "dark"}
        />
      </MainContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  otpText: {
    fontSize: 30,
    color: "black",
    borderRadius: 10,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
