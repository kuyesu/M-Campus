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
import { useToast } from "react-native-toast-notifications";

import AuthPages from "@/components/auth";
import MainContainer from "@/components/container/MainContainer";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import PhoneInput from "react-native-phone-number-input";
import { router, useLocalSearchParams } from "expo-router";

import StyledText from "@/components/Text/StyledText";
import {
  StyledTouchableOpacity,
  StyledTouchableOpacityLight,
} from "@/components/buttons/StyledTouchableOpacity";

export default function Phone() {
  const [phone, setPhone] = useState("");

  const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState("");

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const params = useLocalSearchParams();
  const { name } = params;

  const handleNext = () => {
    // check if phone is empty
    if (phone === "") {
      if (Platform.OS === "android") {
        ToastAndroid.show("Phone number cannot be empty!", ToastAndroid.LONG);
      } else {
        Alert.alert("Phone number cannot be empty!");
      }
    }
    // check if phone number is valid
    else if (!phoneInput.current?.isValidNumber(phone)) {
      if (Platform.OS === "android") {
        ToastAndroid.show("Phone number is not valid!", ToastAndroid.LONG);
      } else {
        Alert.alert("Phone number is not valid!");
      }
    }
    // check if phone number is less than 9 characters
    else if (phone.length < 9) {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Phone number cannot be less than 9 characters!",
          ToastAndroid.LONG
        );
      } else {
        Alert.alert("Phone number cannot be less than 9 characters!");
      }
    }
    // check if phone number is more than 12 characters
    else if (phone.length > 13) {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Phone number cannot be more than 12 characters!",
          ToastAndroid.LONG
        );
      } else {
        Alert.alert("Phone number cannot be more than 12 characters!");
      }
    } else {
      router.push({
        pathname: "/auth/email",
        params: { name: name, phone: phone },
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
                <StyledText bold>Provide a valid phone number</StyledText>
              </View>
              <View>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={value}
                  defaultCode="UG"
                  layout="first"
                  textInputStyle={{
                    width: "100%",
                    shadowOpacity: 0,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: activeColors.tint,
                    backgroundColor: activeColors.primary,
                    borderColor: activeColors.primary,
                  }}
                  textInputProps={{
                    placeholderTextColor: activeColors.gray,
                    placeholder: "772 2820 840",
                    keyboardType: "numeric",
                    textContentType: "telephoneNumber",
                    className: "w-full border border-black",
                  }}
                  onChangeText={(text) => {
                    setValue(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setPhone(text);
                  }}
                  // withDarkTheme
                  // withShadow
                  // autoFocus
                  containerStyle={{
                    width: "100%",
                    shadowOpacity: 0,
                    backgroundColor: activeColors.primary,
                    borderColor: activeColors.primary,
                  }}
                  codeTextStyle={{
                    borderColor: "black",
                    fontSize: 20,
                    fontWeight: "bold",
                    color: activeColors.tint,
                  }}
                  textContainerStyle={{
                    backgroundColor: activeColors.primary,
                    borderColor: activeColors.primary,
                  }}
                />
              </View>
            </View>

            <View className="gap-10">
              <Text
                className="text-base pr-1"
                style={{
                  color: activeColors.gray,
                }}
              >
                By continuing, you agree to our Privacy Policy and Terms of use
              </Text>
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
