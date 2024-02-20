import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  TextInput,
} from "react-native";

import AuthPages from "@/components/auth";
import MainContainer from "@/components/container/MainContainer";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import PhoneInput from "react-native-phone-number-input";
import { router } from "expo-router";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("first");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("Type something here");

  const SlideName = () => {
    const { theme, updateTheme } = useContext(ThemeContext);
    // @ts-ignore
    let activeColors = colors[theme.mode];

    return (
      <View className="flex flex-col  items-center space-y-5 ">
        <StyledTextInput
          style={{
            backgroundColor: activeColors.primary,
            fontSize: 20,
          }}
          // onChangeText={(text) => setName(text)}
          className=" w-full px-0"
          bold
          autoFocus
          placeholder="Your name"
          placeholderTextColor={activeColors.gray}
          cursorColor={activeColors.tint}
        />
      </View>
    );
  };
  const SlidePhone = () => {
    const { theme, updateTheme } = useContext(ThemeContext);
    // @ts-ignore
    let activeColors = colors[theme.mode];
    const phoneInput = useRef<PhoneInput>(null);
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    return (
      <View className="flex flex-col  items-center space-y-5 ">
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
            setFormattedValue(text);
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
    );
  };
  // documents and attachments

  const slides = [
    {
      key: 1,
      title: "Let's get started, what is your name?",
      desc: "",
      backgroundColor: "red",
      component: <SlideName />,
    },
    {
      key: 2,
      title: "Phone Number ",
      desc: "By continuing, you agree to our Privacy Policy and Terms of use",
      backgroundColor: "blue",
      component: <SlidePhone />,
    },
  ];
  // const handleDone = () => {
  //   // setIsFirstTimeLoad(false);
  //   // AsyncStorage.setItem("isFirstTimeOpen", "no");
  // };
  const handleDone = () => {
    router.replace("/auth");
  };
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  //   if (loading) return null;
  return (
    <View style={{ flex: 1, backgroundColor: activeColors.primary }}>
      <MainContainer
        // className="flex-1"
        style={{
          width: Dimensions.get("window").width,
        }}
      >
        {/* <StatusBar hidden /> */}
        <AuthPages onDone={handleDone} slides={slides} />
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
