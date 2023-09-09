import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  TextInput,
  ToastAndroid,
  Platform,
  Alert,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { useToast } from "react-native-toast-notifications";

import AuthPages from "@/components/auth";
import MainContainer from "@/components/container/MainContainer";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import PhoneInput from "react-native-phone-number-input";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, registerUser } from "@/redux/actions/userAction";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledView from "@/components/View/StyledView";
import StyledCodeInput from "@/components/code/StyledCodeInput";
// import ToastManager, { Toast } from "toastify-react-native";
import OTPTextView from "react-native-otp-textinput";
import Clipboard from "@react-native-clipboard/clipboard";
import StyledText from "@/components/Text/StyledText";
import {
  StyledTouchableOpacity,
  StyledTouchableOpacityLight,
} from "@/components/buttons/StyledTouchableOpacity";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

export default function Register() {
  const [code, setCode] = useState<string>("");

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const input = useRef<OTPTextView>(null);

  const clear = () => input.current?.clear();

  const updateOtpText = () => input.current?.setValue(code);
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["25%", "90%", "100%"];
  const params = useLocalSearchParams();
  const { name, phone } = params;

  return (
    <ToastProvider>
      <BottomSheetModalProvider>
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
                    justifyContent: "flex-start",
                    paddingHorizontal: 25,
                  }}
                >
                  <StyledText bold>
                    Let's get started, what is your name?
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
                      handleTextChange={setCode}
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
                      onPress={() => {
                        fetch("http://localhost:5005/api/users/verify-phone", {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            name: name,
                            phone: phone,
                            code: code,
                          }),
                        })
                          .then((res) => res.json())
                          .then((json) => {
                            if (json.success) {
                              bottomSheetModalRef.current?.present();
                              setTimeout(() => {
                                setIsOpen(true);
                              }, 100);
                            } else {
                              bottomSheetModalRef.current?.present();
                              setTimeout(() => {
                                setIsOpen(true);
                              }, 100);
                            }
                          })
                          .catch((e) => {
                            bottomSheetModalRef.current?.present();
                            setTimeout(() => {
                              setIsOpen(true);
                            }, 100);
                          });
                      }}
                    >
                      Verify
                    </StyledTouchableOpacityLight>
                    <StyledText bold>
                      Didn't receive the code?{" "}
                      <StyledText
                        style={{
                          color: activeColors.accent,
                        }}
                        big
                        bold
                      >
                        Resend
                      </StyledText>
                    </StyledText>
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
                onPress={() => {
                  router.push("/auth/phone");
                }}
              >
                Proceed
              </StyledTouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
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
