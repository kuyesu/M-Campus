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
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { theme, updateTheme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const params = useLocalSearchParams();
  const { name, phone }: any = params;

  const handleNext = (e: any) => {
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
      router.push({
        pathname: "/auth/avatar",
        params: { name: name, phone: phone, email: email },
      });
    }
  };

  return (
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
                You are almost there, {name}! <Text>🎉</Text>
              </StyledText>
            </View>
            <View>
              <StyledTextInput
                autoFocus={true}
                style={{
                  backgroundColor: activeColors.primary,
                  fontSize: 20,
                  paddingVertical: 10,
                  // paddingHorizontal: 10,
                  borderBottomColor: activeColors.grayAccent,
                  borderBottomWidth: 1,
                  color: activeColors.tint,
                }}
                // onChangeText={(text) => setName(text)}
                className=" w-full px-0"
                // autoFocus
                autoCapitalize="none"
                inputMode="email"
                placeholder="Email address"
                placeholderTextColor={activeColors.grayAccent}
                cursorColor={activeColors.tint}
                // value={email}
                onChangeText={(text) => setEmail(text)}
                // onBlur={handleBlur("email")}
                // value={values.email}
              />
            </View>
          </View>

          <View className="gap-10">
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
