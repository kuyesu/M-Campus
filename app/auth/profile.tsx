import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { useToast } from "react-native-toast-notifications";
import * as ImagePicker from "expo-image-picker";

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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
type Props = {
  navigation: any;
};
import { URI } from "@/redux/URI";

export default function Profile() {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  const { user, token } = useSelector((state: any) => state.user);

  const params = useLocalSearchParams();
  const { name, phone, email, code } = params;
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setAvatar(result.assets[0].uri);
      axios
        .put(
          `${URI}/update-avatar`,
          {
            avatar: result.assets[0].uri,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res: any) => {
          loadUser()(dispatch);
          // console.log(res.data);
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
                  onPress={pickImage}
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
                      {/* <StyledText
                        style={[{ color: activeColors.accent, fontSize: 16 }]}
                        bold
                      >
                        Upload profle pic
                      </StyledText> */}
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
              </View>
            </View>

            <View
              style={{
                width: "100%",
                height: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {avatar ? (
                <Image
                  source={{ uri: avatar }}
                  style={{
                    width: "85%",
                    height: "90%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,

                    borderRadius: 50,
                    borderColor: activeColors.gray,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: "85%",
                    height: "90%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderStyle: "dashed",
                    borderRadius: 50,
                    borderColor: activeColors.gray,
                  }}
                >
                  <TouchableOpacity
                    className="flex items-center justify-center"
                    onPress={pickImage}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="cloud"
                      size={100}
                      color={activeColors.gray}
                    />
                    <StyledText
                      style={[{ color: activeColors.gray, fontSize: 16 }]}
                      bold
                    >
                      Upload profle pic
                    </StyledText>
                  </TouchableOpacity>
                </View>
              )}
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
                  pathname: "/auth/finish",
                  params: { email: email },
                });
              }}
            >
              Upload profile
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
