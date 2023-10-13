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
  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
  );
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { theme, updateTheme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const params = useLocalSearchParams();
  const { name: name, phone: phone, email: email }: any = params;
  const dispatch = useDispatch();

  const { error, isAuthenticated, loading } = useSelector(
    (state: any) => state.user
  );

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        // @ts-ignore
        setAvatar("data:image/jpeg;base64," + image.data);
      }
    });
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    if (avatar === "") {
      if (Platform.OS === "android") {
        ToastAndroid.show("Avatar cannot be empty!", ToastAndroid.LONG);
      } else {
        Alert.alert("Avatar cannot be empty!");
      }
    } else {
      router.push({
        pathname: "/auth/set-password",
        params: { name: name, phone: phone, email: email, avatar: avatar },
      });
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
            <View>
              <StyledText bold>
                Set you profile picture, {name}! <Text>🧑</Text>
              </StyledText>
            </View>
            <View
              style={{
                marginTop: 20,
                paddingTop: 30,
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <StyledView
                style={{
                  borderdColor: activeColors.grayAccent,
                  borderWidth: 2,
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity onPress={uploadImage}>
                  <Image
                    source={{ uri: avatar }}
                    style={{
                      height: 100,
                      width: 100,
                      // tintColor: activeColors.primary,
                      borderRadius: 50,
                      resizeMode: "contain",
                    }}
                  />
                  <View
                    className="absolute bottom-0 right-0"
                    style={{
                      borderColor: activeColors.secondary,
                      backgroundColor: activeColors.secondary,
                      borderWidth: 2,
                      height: 25,
                      width: 25,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="camera-account"
                      size={20}
                      color={activeColors.accent}
                    />
                  </View>
                </TouchableOpacity>
              </StyledView>
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
                onPress={handleNext}
              >
                Continue
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
