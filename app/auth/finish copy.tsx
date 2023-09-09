import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { useToast } from "react-native-toast-notifications";

import AuthPages from "@/components/auth";
import MainContainer from "@/components/container/MainContainer";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";

import StyledText from "@/components/Text/StyledText";
import {
  StyledTouchableOpacity,
  StyledTouchableOpacityLight,
} from "@/components/buttons/StyledTouchableOpacity";

import {
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Image,
  Platform,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { loadUser, registerUser } from "@/redux/actions/userAction";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
type Props = {
  navigation: any;
};

export default function Profile() {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state: any) => state.user);

  const params = useLocalSearchParams();
  const { name, phone, email, code } = params;

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

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((image) => {
      if (image) {
        setAvatar(image.assets[0].uri);
      }
    });
  };

  const submitHandler = (e: any) => {
    if (avatar === "" || name === "" || email === "") {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Please fill the all fields and upload avatar",
          ToastAndroid.LONG
        );
      } else {
        Alert.alert("Please fill the all fields and upload avatar");
      }
    } else {
      // @ts-ignore
      registerUser(name, email, password, avatar, code, phone)(dispatch);
    }
  };

  return (
    <ToastProvider>
      <View style={{ flex: 1, backgroundColor: activeColors.primary }}>
        <MainContainer
          // className="flex-1"
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("screen").height,
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
              <View className="space-y-10">
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={uploadImage}
                >
                  {avatar ? (
                    <Image
                      source={{ uri: avatar }}
                      className="w-[80px] h-[80px] rounded-full"
                    />
                  ) : (
                    <View>
                      <Image
                        source={require("@/assets/avatar/1.jpeg")}
                        className="w-[80px] h-[80px] rounded-full"
                      />
                      <StyledText
                        style={[{ color: activeColors.accent, fontSize: 16 }]}
                        bold
                      >
                        Upload profle pic
                      </StyledText>
                    </View>
                  )}

                  <View
                    style={{
                      position: "absolute",
                      top: 55,
                      left: 65,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="pen"
                      size={20}
                      color={activeColors.tint}
                    />
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    width: "100%",
                    gap: 0,
                  }}
                >
                  <StyledText
                    style={[{ color: activeColors.tint, fontSize: 20 }]}
                    bold
                  >
                    {name}
                  </StyledText>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 5,
                      paddingTop: 20,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      color={activeColors.gray}
                      size={20}
                    />
                    <StyledText
                      style={[{ color: activeColors.gray, fontSize: 16 }]}
                      bold
                    >
                      {phone}
                    </StyledText>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 10,
                      paddingTop: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="gmail"
                      color={activeColors.gray}
                      size={20}
                    />
                    <StyledText
                      style={[{ color: activeColors.gray, fontSize: 16 }]}
                      bold
                    >
                      {email}
                    </StyledText>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    borderTopColor: "transparent",
                    borderRightColor: "transparent",
                    borderLeftColor: "transparent",
                    borderBottomColor: activeColors.gray,
                    borderWidth: 1,
                    paddingTop: 10,
                  }}
                />
              </View>
              <View>
                <View
                  style={{
                    paddingBottom: 30,
                  }}
                >
                  <StyledText
                    style={[{ color: activeColors.tint, fontSize: 20 }]}
                    bold
                  >
                    Setup your password
                  </StyledText>
                </View>
                <View
                  style={{
                    gap: 20,
                  }}
                >
                  <StyledTextInput
                    placeholder="Enter your password"
                    className=" rounded"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    placeholderTextColor={activeColors.gray}
                  />
                  <StyledTextInput
                    placeholder="Confirm Password"
                    className=" rounded"
                    value={confirmpassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    secureTextEntry={true}
                    placeholderTextColor={activeColors.gray}
                  />
                </View>
              </View>
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
              onPress={() => {
                router.push({
                  pathname: "/(drawer)/(dashboard)/home",
                  params: { name: name },
                });
              }}
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
