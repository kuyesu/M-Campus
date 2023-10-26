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
  KeyboardAvoidingView,
} from "react-native";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";

import MainContainer from "@/components/container/MainContainer";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";

import StyledText from "@/components/Text/StyledText";
import { StyledTouchableOpacity } from "@/components/buttons/StyledTouchableOpacity";
import { loadUser, registerUser } from "@/redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import StyledView from "@/components/View/StyledView";
import { Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

export default function Email() {
  const router = useRouter();
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
    loadUser()(dispatch);
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [error, isAuthenticated, dispatch]);

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
    <MainContainer
      style={{
        flex: 1,
        width: Dimensions.get("window").width,
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <View
        style={{
          width: "100%",
          flex: 1,
        }}
      >
        <View
          className="flex-col justify-center items-center"
          style={{ width: "100%", padding: 10 }}
        >
          <View className="relative pt-5">
            <Image
              source={{ uri: avatar }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 150 / 2,
                backgroundColor: activeColors.secondary,
              }}
            />
          </View>
          <View className="pt-10 items-center">
            <StyledText big bold>
              {name}{" "}
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/1828/1828640.png",
                }}
                width={18}
                height={18}
                className="ml-2 absolute bottom-0 left-0"
              />
            </StyledText>
            <StyledText
              style={{
                color: activeColors.gray,
                textTransform: "none",
                fontStyle: "italic",
              }}
            >
              {email}
            </StyledText>
          </View>
        </View>
        {/* <StyledText>{user?.bio}</StyledText> */}
        <View className=" items-center justify-center">
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 52,
              width: "55%",
              borderRadius: 26,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 26,
              backgroundColor: activeColors.secondary,
              marginTop: 40,
            }}
          >
            <MaterialCommunityIcons
              name="phone-dial-outline"
              size={20}
              color={activeColors.tint}
              style={{ marginRight: 12 }}
            />
            <Text
              style={{
                fontWeight: "bold",
                color: activeColors.tint,
              }}
            >
              {phone}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",

          paddingHorizontal: 25,
          paddingVertical: 35,
          paddingTop: Platform.OS === "android" ? 0 : 0,
        }}
      >
        <View className="gap-10   ">
          <View
            style={
              {
                // paddingTop: 80,
              }
            }
          >
            <StyledText small>
              Choose a strong password to protect your account
            </StyledText>
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
