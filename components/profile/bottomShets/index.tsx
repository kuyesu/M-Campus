import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Pressable,
  Switch,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { ThemeContext } from "@/context/themeContext";
import { AntDesign, Entypo } from "@expo/vector-icons";
import StyledText from "@/components/Text/StyledText";
import { colors } from "@/constants/Colors";

export const AccountSettings = ({
  bottomSheetModalRef,
  setIsOpen,
  zIndex,
}: any) => {
  const snapPoints = ["35%", "70%", "90%"];
  const [name, setName] = useState("");
  const [device, setDevice] = useState("");
  const { width } = useWindowDimensions();
  const [year, setYear] = useState("1");
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 5, backgroundColor: "white" }}
        onDismiss={() => setIsOpen(false)}
        style={{
          zIndex: zIndex,
        }}
        backdropComponent={({ style }) => (
          <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]} />
        )}
      >
        <View
          className="flex-1 px-4 pt-4 z-50"
          style={{
            zIndex: zIndex,
          }}
        >
          <Text
            style={[styles.title, { marginBottom: 20, fontSize: 18 }]}
            className=""
          >
            Update account Info
          </Text>
          <View className="flex flex-col   items-center space-y-5 ">
            <StyledTextInput
              label="Full Name"
              value="Kuyeso Rogers"
              defaultValue="Kuyeso Rogers"
              onChangeText={(text: any) => setName(text)}
              mode="outlined"
              className="bg-white w-full"
            />
            <StyledTextInput
              label="Email address"
              onChangeText={(text: any) => setName(text)}
              mode="outlined"
              className="bg-white w-full"
            />
            <View className="pt-4 items-start flex w-full justify-start">
              <Text className=" font-medium text-base">
                Current year of study
              </Text>
            </View>
            <View className="flex px-5 pb-4 flex-row justify-between items-center w-full">
              <Pressable
                className="flex flex-row space-x-2 items-center"
                onPress={() => setYear("1")}
              >
                {year === "1" ? (
                  <AntDesign name="checkcircle" size={24} color="#86e63b" />
                ) : (
                  <Entypo name="circle" size={24} color="#031435" />
                )}
                <Text style={styles.subtitle} className="">
                  1
                </Text>
              </Pressable>
              <Pressable
                className="flex flex-row space-x-2 items-center"
                onPress={() => setYear("2")}
              >
                {year === "2" ? (
                  <AntDesign name="checkcircle" size={24} color="#86e63b" />
                ) : (
                  <Entypo name="circle" size={24} color="#031435" />
                )}
                <Text style={styles.subtitle} className="">
                  2
                </Text>
              </Pressable>
              <Pressable
                className="flex flex-row space-x-2 items-center"
                onPress={() => setYear("3")}
              >
                {year === "3" ? (
                  <AntDesign name="checkcircle" size={24} color="#86e63b" />
                ) : (
                  <Entypo name="circle" size={24} color="#031435" />
                )}
                <Text style={styles.subtitle} className="">
                  3
                </Text>
              </Pressable>
              <Pressable
                className="flex flex-row space-x-2 items-center"
                onPress={() => setYear("4")}
              >
                {year === "4" ? (
                  <AntDesign name="checkcircle" size={24} color="#86e63b" />
                ) : (
                  <Entypo name="circle" size={24} color="#031435" />
                )}
                <Text style={styles.subtitle} className="">
                  4
                </Text>
              </Pressable>
              <Pressable
                className="flex flex-row space-x-2 items-center"
                onPress={() => setYear("5")}
              >
                {year === "5" ? (
                  <AntDesign name="checkcircle" size={24} color="#86e63b" />
                ) : (
                  <Entypo name="circle" size={24} color="#031435" />
                )}
                <Text style={styles.subtitle}>5</Text>
              </Pressable>
            </View>
            <StyledTextInput
              label="Student Reg no."
              value="2019/BSE/031/PS"
              onChangeText={(text: any) => setName(text)}
              mode="outlined"
              className="bg-white w-full"
            />
            <StyledTextInput
              label="Contact number"
              onChangeText={(text: any) => setName(text)}
              mode="outlined"
              className="bg-white w-full"
            />
            <View className="flex w-full pr-1">
              <TouchableOpacity
                // onPress={handleNext}
                className="p-2.5 items-center  justify-center bg-[#86e63b] font-bold  w-full "
              >
                <Text className="font-semibold up text-lg text-[#041633]">
                  Update
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={handleNext}
                className="p-2.5 absolute -z-10 left-1.5 top-1.5 items-center  justify-center bg-[#041633] font-bold  w-full "
              >
                <Text className="font-semibold text-lg text-[#041633]">
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export const ManageNotifications = ({
  bottomSheetModalRef,
  setIsOpen,
}: any) => {
  const snapPoints = ["35%", "58%", "75%"];
  const [darkmode, setDarkmode] = useState(false);
  const [device, setDevice] = useState(true);
  const { width } = useWindowDimensions();
  const [theme, setTheme] = useState("dim");
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 5 }}
        onDismiss={() => setIsOpen(false)}
        backdropComponent={({ style }) => (
          <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]} />
        )}
      >
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { marginBottom: 20 }]} className="">
            Manage Notifications
          </Text>
          <View style={styles.row}>
            <Text style={styles.subtitle}>
              Allow all Incoming Notifications
            </Text>
            <Switch
              style={
                {
                  // borderColor: "#031435",
                  // borderWidth: 1,
                }
              }
              ios_backgroundColor="#031435"
              value={darkmode}
              onChange={() => setDarkmode(!darkmode)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.subtitle}>Important Notifications</Text>
            <Switch
              disabled
              value={device}
              style={
                {
                  // borderColor: "#031435",
                  // borderWidth: 1,
                }
              }
              ios_backgroundColor="#031435"
              onChange={() => setDevice(!device)}
            />
          </View>
          <Text style={styles.description}>
            Stay in control by disabling updates / notifications from the posts,
            but never miss out on important updates.
          </Text>
          <View
            style={{
              width: width,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "gray",
              marginVertical: 30,
            }}
          />
          <Text style={[styles.title, { width: "100%" }]}>News & Forum</Text>
          <Pressable style={styles.row} onPress={() => setTheme("dim")}>
            <Text style={styles.subtitle}>I don{"'"}t want to know</Text>
            {theme === "dim" ? (
              <AntDesign
                name="checkcircle"
                size={24}
                color="#86e63b"
                style={
                  {
                    // borderColor: "#031435",
                    // borderWidth: 1,
                    // borderRadius: 13,
                  }
                }
              />
            ) : (
              <Entypo name="circle" size={24} color="#031435" />
            )}
          </Pressable>
          <Pressable style={styles.row} onPress={() => setTheme("lightsOut")}>
            <Text style={styles.subtitle}>Allows</Text>
            {theme === "lightsOut" ? (
              <AntDesign name="checkcircle" size={24} color="#86e63b" />
            ) : (
              <Entypo name="circle" size={24} color="#031435" />
            )}
          </Pressable>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export const UserAccountStatus = ({ bottomSheetModalRef, setIsOpen }: any) => {
  const snapPoints = ["35%", "58%", "75%"];
  const [darkmode, setDarkmode] = useState(false);
  const [device, setDevice] = useState(true);
  const { width } = useWindowDimensions();
  const [themeIcons, setTheme] = useState("dim");
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{
          borderRadius: 50,
          backgroundColor: activeColors.secondary,
        }}
        onDismiss={() => setIsOpen(false)}
        backdropComponent={({ style }) => (
          <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]} />
        )}
      >
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <View
              style={{
                height: 220,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 20,

                gap: 15,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
                className="flex w-full flex-row item-center justify-between"
              >
                <Image
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
                  }}
                  style={[
                    {
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      // marginRight: 10,
                    },
                  ]}
                />
              </View>
              <View
                style={{
                  // width: "100%",
                  gap: 2,
                }}
              >
                <StyledText
                  style={[{ color: activeColors.tint, fontSize: 18 }]}
                  bold
                >
                  Kuyeso Rogers
                </StyledText>
                <StyledText
                  style={[{ color: activeColors.primary, fontSize: 14 }]}
                  bold
                >
                  2019/bse/031/ps
                </StyledText>
              </View>
              <View
                style={{
                  width: "100%",

                  gap: 2,
                }}
              ></View>
            </View>
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subtitle: {
    color: "#101318",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 14,
    fontWeight: "normal",
    width: "100%",
  },
});
