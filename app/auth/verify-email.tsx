import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";

import MainContainer from "@/components/container/MainContainer";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, verifyEmail } from "@/redux/actions/userAction";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledView from "@/components/View/StyledView";
// import ToastManager, { Toast } from "toastify-react-native";
import OTPTextView from "react-native-otp-textinput";
import StyledText from "@/components/Text/StyledText";
import {
  StyledTouchableOpacity,
  StyledTouchableOpacityLight,
} from "@/components/buttons/StyledTouchableOpacity";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

export default function VerifyEmail({ navigation }) {
  const [otp, setOTP] = useState<string>("");
  const input = useRef<OTPTextView>(null);
  const dispatch = useDispatch();

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalErrorRef = useRef(null);
  const snapPoints = ["25%", "90%", "100%"];
  const params = useLocalSearchParams();
  const { email }: any = params;

  const { error, isVerified, loading } = useSelector(
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
    if (isVerified) {
      loadUser()(dispatch);
      // navigate to profile
    }
  }, [error, isVerified, loading]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    // use axios to send otp to server
    verifyEmail(email, otp)(dispatch);
    router.push({
      pathname: "/home",
      params: { email: email },
    });
  };

  const HandleNext = (e: any) => {
    e.preventDefault();
    // navigation.navigate("Profile");
    router.push({
      pathname: "/home",
      params: { email: email },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: activeColors.primary }}>
        <MainContainer
          // className="flex-1"
          style={{
            width: Dimensions.get("window").width,
          }}
        >
          <View
            className=" pt-20"
            style={{
              width: "100%",
              flex: 1,
              display: "flex",
              alignItems: "center",
              paddingHorizontal: 25,
            }}
          >
            <View
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 25,
              }}
              className="gap-32  "
            >
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingHorizontal: 0,
                }}
              >
                <StyledText bold>
                  An Email verification code has been sent to{" "}
                  <StyledText
                    style={{
                      color: activeColors.accent,
                    }}
                    bold
                  >
                    {email}
                  </StyledText>
                </StyledText>
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  gap: 50,
                }}
              >
                <View style={[{ alignItems: "center" }]}>
                  <StyledView
                    style={{
                      alignContent: "center",
                      justifyContent: "center",
                      borderRadius: 50,
                      padding: 15,
                    }}
                  >
                    <MaterialCommunityIcons
                      color={activeColors.accent}
                      size={75}
                      name="lock-open"
                    />
                  </StyledView>
                </View>
                <View
                  style={{
                    width: "80%",
                  }}
                >
                  <OTPTextView
                    ref={input}
                    containerStyle={{ marginVertical: 20, borderRadius: 50 }}
                    handleTextChange={setOTP}
                    offTintColor={activeColors.accent}
                    tintColor={activeColors.tint}
                    textInputStyle={{
                      // @ts-ignore
                      color: activeColors.tint,
                      fontSize: 30,
                      fontWeight: "bold",
                      borderRadius: 50,
                    }}
                    inputCount={4}
                    keyboardType="numeric"
                  />
                </View>

                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20,
                  }}
                >
                  <StyledTouchableOpacityLight
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={submitHandler}
                  >
                    Verify
                  </StyledTouchableOpacityLight>
                  {/* <StyledText bold>
                    Didn't receive the code?{" "}
                    <StyledText
                      style={{
                        color: activeColors.accent,
                      }}
                      big
                      bold
                    >
                      Resend
                    </StyledText> */}
                  {/* </StyledText> */}
                </View>
              </View>
            </View>
          </View>
          <StatusBar
            // backgroundColor={activeColors.primary}
            style={theme.mode === "dark" ? "light" : "dark"}
          />
        </MainContainer>
      </View>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{
            borderRadius: 15,
            backgroundColor: activeColors.secondary,
          }}
          onDismiss={() => setIsOpen(false)}
          handleIndicatorStyle={{
            backgroundColor: activeColors.tint,
          }}
          style={{
            backgroundColor: activeColors.secondary,
            paddingVertical: 20,
          }}
        >
          <View
            style={[
              {
                alignItems: "center",
                // flex: 1,
                height: "80%",
                justifyContent: "space-between",
                paddingVertical: 100,
                // gap: 100,
              },
            ]}
          >
            <StyledView
              style={{
                alignContent: "center",
                justifyContent: "center",
                borderRadius: 60,
                padding: 15,
                borderColor: activeColors.accent,
                borderWidth: 2,
              }}
            >
              <MaterialCommunityIcons
                color={activeColors.accent}
                size={75}
                name="check"
              />
            </StyledView>
            <View
              style={{
                gap: 70,
                alignItems: "center",
              }}
            >
              <Text
                className="text-base pr-1"
                style={{
                  color: activeColors.tint,
                  fontSize: 22,
                  fontFamily: "H",
                }}
              >
                Veified
              </Text>
              <StyledTouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "H",
                }}
                onPress={HandleNext}
              >
                Proceed
              </StyledTouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
}
