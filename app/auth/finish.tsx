import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  ToastAndroid,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ToastProvider } from "react-native-toast-notifications";

import MainContainer from "@/components/container/MainContainer";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import PhoneInput from "react-native-phone-number-input";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";

import StyledText from "@/components/Text/StyledText";
import {
  StyledTouchableOpacity,
  StyledTouchableOpacityLight,
} from "@/components/buttons/StyledTouchableOpacity";
import { loadUser, registerUser } from "@/redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import StyeledMessageBox from "@/components/Text/MessageBox";
import axios from "axios";

export default function Finish() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const { theme, updateTheme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const params = useLocalSearchParams();
  const { name, phone, email }: any = params;
  const dispatch = useDispatch();

  const submitHandler = (e: any) => {
    setIsLoading(true);
    if (password === "" || confirmpassword == "") {
      if (Platform.OS === "android") {
        ToastAndroid.show("Please fill the all fields ", ToastAndroid.LONG);
      } else {
        Alert.alert("Please fill the all fields and upload avatar");
      }
    } else {
      //  using axios to update the user password
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ password, email });
      try {
        const res = axios.post(URL + "/update-password", body, config);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
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
            height:
              Platform.OS === "android"
                ? Dimensions.get("window").height
                : Dimensions.get("window").height - 100,
            width: "100%",
            display: "flex",
            // backgroundColor: activeColors.tint,

            justifyContent: "space-between",
            paddingHorizontal: 25,
            paddingVertical: 25,
            paddingTop: Platform.OS === "android" ? 90 : 50,
          }}
        >
          <View className="gap-10   ">
            <View>
              <StyledText bold>
                Final step, please setup your password
              </StyledText>
            </View>

            <View
              style={{
                marginTop: 20,
                width: "90%",
                height: "60%",
                display: "flex",

                justifyContent: "center",
                alignItems: "center",
                gap: 40,
              }}
            >
              <StyledTextInput
                placeholder="Enter your password"
                className=" rounded"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholderTextColor={activeColors.gray}
                style={{
                  width: "100%",
                }}
              />
              <StyledTextInput
                placeholder="Confirm Password"
                className=" rounded"
                value={confirmpassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={true}
                placeholderTextColor={activeColors.gray}
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>

          <View className="gap-10">
            {isLoading ? (
              <StyledTouchableOpacity
                disabled={true}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="small" color={activeColors.tint} />
              </StyledTouchableOpacity>
            ) : (
              <StyledTouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: activeColors.grayAccent,
                }}
                onPress={submitHandler}
              >
                Send
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
