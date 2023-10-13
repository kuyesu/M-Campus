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
} from "react-native";
import { ToastProvider } from "react-native-toast-notifications";

import MainContainer from "@/components/container/MainContainer";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

import StyledText from "@/components/Text/StyledText";
import { StyledTouchableOpacity } from "@/components/buttons/StyledTouchableOpacity";

export default function Register() {
  const [name, setName] = useState("");

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const handleNext = () => {
    // check if name is empty
    if (name === "") {
      if (Platform.OS === "android") {
        ToastAndroid.show("Name cannot be empty!", ToastAndroid.LONG);
      } else {
        Alert.alert("Name cannot be empty!");
      }
    }
    // check if name is less than 3 characters
    else if (name.length < 3) {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Name cannot be less than 3 characters!",
          ToastAndroid.LONG
        );
      } else {
        Alert.alert("Name cannot be less than 3 characters!");
      }
    }

    // chcek if name is more than 20 characters
    else if (name.length > 30) {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Name cannot be more than 30 characters!",
          ToastAndroid.LONG
        );
      } else {
        Alert.alert("Name cannot be more than 20 characters!");
      }
    }
    // check if name contains numbers
    else if (/\d/.test(name)) {
      if (Platform.OS === "android") {
        ToastAndroid.show("Name cannot contain numbers!", ToastAndroid.LONG);
      } else {
        Alert.alert("Name cannot contain numbers!");
      }
    }
    // check if name contains special characters
    else if (/[!@#$%^&*(),.?":{}|<>]/g.test(name)) {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Name cannot contain special characters!",
          ToastAndroid.LONG
        );
      } else {
        Alert.alert("Name cannot contain special characters!");
      }
    }
    // check if is a full name (both names must be provided)
    else if (name.split(" ").length < 2) {
      if (Platform.OS === "android") {
        ToastAndroid.show("Please provide your full name!", ToastAndroid.LONG);
      } else {
        Alert.alert("Please provide your full name!");
      }
    }
    // go to next screen
    else {
      router.push({
        pathname: "/auth/phone",
        params: { name: name },
      });
    }
  };
  return (
    <ToastProvider>
      <View style={{ flex: 1, backgroundColor: activeColors.primary }}>
        <MainContainer
          // className="flex-1"
          style={{
            width: Dimensions.get("window").width,
          }}
        >
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
            <View className="gap-10  ">
              <View>
                <StyledText bold>
                  Let's get started, what is your name?
                </StyledText>
              </View>
              <StyledTextInput
                style={{
                  backgroundColor: activeColors.primary,
                  fontSize: 20,
                }}
                // onChangeText={(text) => setName(text)}
                className=" w-full px-0"
                bold
                // autoFocus
                placeholder="Your name"
                placeholderTextColor={activeColors.gray}
                cursorColor={activeColors.tint}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>

            <Text
              className="text-base pr-1"
              style={{
                color: activeColors.gray,
              }}
            ></Text>
            <StyledTouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleNext}
            >
              continue
            </StyledTouchableOpacity>
          </View>

          <StatusBar
            // backgroundColor={activeColors.primary}
            style={theme.mode === "dark" ? "light" : "dark"}
          />
        </MainContainer>
      </View>
    </ToastProvider>
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
