import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  ToastAndroid,
  Platform,
  Alert,
  TouchableOpacity,
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
    if (isVerified) {
      loadUser()(dispatch);
      // navigate to profile
    }
  }, [error, isVerified, loading]);
  if (error) {
    if (Platform.OS === "android") {
      ToastAndroid.show(error, ToastAndroid.LONG);
    } else {
      Alert.alert(error);
    }
  }
  const submitHandler = (e: any) => {
    e.preventDefault();
    // use axios to send otp to server
    verifyEmail(email, otp)(dispatch);
    router.push("/");
    // router.push({
    //   pathname: "/",
    //   params: { email: email },
    // });
  };

  const HandleNext = (e: any) => {
    e.preventDefault();
    // navigation.navigate("Profile");
    router.push("/");
    // router.push({
    //   pathname: "/",
    //   params: { email: email },
    // });
  };

  const [countdownTime, setCountdownTime] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setCountdownTime((prevCountdownTime) => {
        if (prevCountdownTime <= 0) {
          clearInterval(timerInterval);
          // You can add any action you want when the countdown reaches 0 here.
          return 0;
        } else {
          return prevCountdownTime - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  // Convert remaining seconds into minutes and seconds
  const minutes = Math.floor(countdownTime / 60);
  const seconds = countdownTime % 60;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: activeColors.primary,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MainContainer
          // className="flex-1"
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <View
            className=" pt-0"
            style={{
              width: "100%",
              flex: 1,
              display: "flex",
              alignItems: "center",
              height: Dimensions.get("window").height,
              // paddingHorizontal: 25,
              justifyContent: "center",
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
              className="gap-20  "
            >
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  gap: 30,
                }}
              >
                <View style={[{ alignItems: "center" }]}>
                  <StyledView
                    style={{
                      alignContent: "center",
                      justifyContent: "center",
                      borderRadius: 15,
                      borderColor: activeColors.grayAccent,
                      borderWidth: 2,
                      padding: 15,
                    }}
                  >
                    <MaterialCommunityIcons
                      color={activeColors.accent}
                      size={60}
                      name="security"
                    />
                  </StyledView>
                </View>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 0,
                  }}
                >
                  <StyledText
                    style={{
                      // color: activeColors.accent,
                      fontSize: 25,
                      fontFamily: "H",
                    }}
                  >
                    Verify Your Email
                  </StyledText>

                  <StyledText
                    style={{
                      paddingTop: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "justify",
                      color: activeColors.gray,
                    }}
                    small
                  >
                    A 4-digit code has been sent to your email address{" "}
                    <StyledText bold>{email}</StyledText>. Please enter the code
                    in the box below to verify your email address.
                    <TouchableOpacity
                      onPress={() => {
                        bottomSheetModalRef.current?.present();
                      }}
                    >
                      <StyledText
                        style={{
                          color: activeColors.accent,
                          textDecorationLine: "underline",
                        }}
                      >
                        Change
                      </StyledText>
                    </TouchableOpacity>
                  </StyledText>
                </View>
                <View
                  style={{
                    width: "80%",
                  }}
                >
                  <OTPTextView
                    ref={input}
                    containerStyle={{ marginVertical: 30, borderRadius: 5 }}
                    handleTextChange={setOTP}
                    offTintColor={activeColors.accent}
                    tintColor={activeColors.grayAccent}
                    textInputStyle={{
                      // @ts-ignore
                      color: activeColors.tint,
                      fontSize: 30,
                      fontWeight: "bold",
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: activeColors.grayAccent,
                      backgroundColor: activeColors.secondary,
                      paddingVertical: 0,
                      height: 70,
                    }}
                    inputCount={4}
                    keyboardType="numeric"
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingHorizontal: 0,
                  }}
                >
                  <StyledText
                    style={{
                      textAlign: "left",
                      color: activeColors.gray,
                    }}
                    small
                  >
                    • This code will expire in{" "}
                    {
                      <StyledText
                        style={{
                          color: activeColors.accent,
                        }}
                      >
                        {minutes < 10 ? "0" : ""}
                        {minutes}:{seconds < 10 ? "0" : ""}
                        {seconds}
                      </StyledText>
                    }
                  </StyledText>
                  <StyledText
                    style={{
                      paddingTop: 10,
                      textAlign: "left",
                      color: activeColors.gray,
                    }}
                    small
                  >
                    • If you didn't receive the code,{" "}
                    <StyledText
                      style={{
                        color: activeColors.accent,
                        textDecorationLine: "underline",
                      }}
                    >
                      Resend Code
                    </StyledText>
                  </StyledText>
                </View>
                <View
                  style={{
                    width: "100%",
                    position: "relative",
                    top: 100,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    gap: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: activeColors.secondary,
                      borderColor: activeColors.grayAccent,
                      borderWidth: 1,
                      paddingVertical: 15,
                      borderRadius: 5,
                    }}
                    onPress={submitHandler}
                  >
                    <StyledText>Verify</StyledText>
                  </TouchableOpacity>
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
