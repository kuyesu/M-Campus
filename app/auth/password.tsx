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

export default function Password() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { theme, updateTheme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const params = useLocalSearchParams();
  const { name, phone }: any = params;
  const dispatch = useDispatch();

  const { error, isAuthenticated, loading } = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    setIsLoading(true);
    if (error) {
      if (Platform.OS === "android") {
        ToastAndroid.show(error, ToastAndroid.LONG);
      } else {
        Alert.alert(error);
      }
    }
    if (isAuthenticated) {
      loadUser()(dispatch);
      router.push({
        pathname: "/(drawer)/(dashboard)/home",
        params: { email: email },
      });
    }
    setIsLoading(false);
  }, [error, isAuthenticated, loading]);

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
    } else {
      // @ts-ignore
      registerUser(name, email, phone)(dispatch);
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
                OTP verification will be sent to your email
              </StyledText>
            </View>

            <View>
              <StyledTextInput
                style={{
                  backgroundColor: activeColors.primary,
                  fontSize: 20,
                }}
                // onChangeText={(text) => setName(text)}
                className=" w-full px-0"
                bold
                // autoFocus
                autoCapitalize="none"
                inputMode="email"
                placeholder="Email address"
                placeholderTextColor={activeColors.gray}
                cursorColor={activeColors.tint}
                // value={email}
                onChangeText={(text) => setEmail(text)}
                // onBlur={handleBlur("email")}
                // value={values.email}
              />
            </View>
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
