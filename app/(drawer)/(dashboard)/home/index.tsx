import {
  StyleSheet,
  TouchableOpacity,
  View,
  Share,
  Platform,
  Dimensions,
} from "react-native";

// components
import MainContainer from "@/components/container/MainContainer";
import { colors } from "@/constants/Colors";
import { useContext, useRef, useState } from "react";
import { ThemeContext } from "@/context/themeContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledMenuItem from "@/components/Menu/StyledMenuItem";
import StyledWeatherView from "@/components/weather/StyledWeatherView";

import TimelineComponent from "@/components/chat/itmeline";

import data from "@/data/inquiries";

import { useSelector } from "react-redux";
import MoreApps from "@/components/home/apps";
import StyledBottomSheet from "@/components/BottomSheet/StyledBottomSheet";
import UpdateCarousal from "@/components/home/update";
import ClassLocation from "@/components/home/class";
import { router } from "expo-router";
import { Image } from "react-native";
import StyledText from "@/components/Text/StyledText";
import { ImageBackground } from "react-native";
import StyledView from "@/components/View/StyledView";
import { Text } from "react-native";

export default function TabOneScreen() {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user } = useSelector((state: any) => state.user);
  const [isActive, setIsActivate] = useState(theme.mode === "dark");
  const handleSwitch = () => {
    updateTheme();
    setIsActivate((previousState) => !previousState);
  };

  const [isOpen, setIsOpen] = useState(false);

  const url =
    "https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_IN&gl=US";
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Instagram | A time wasting application" + "\n" + url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["48%", "75%", "90%"];

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }

  const handleAppOnPress = (route: any) => {
    router.push(route);
    setIsOpen(false);
    bottomSheetModalRef.current?.close();
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };
  return (
    <MainContainer
      style={[
        styles.container,
        { flexGrow: 1, paddingHorizontal: 20, paddingVertical: 0 },
      ]}
    >
      <View
        style={{
          paddingVertical: 15,
          // backgroundColor: activeColors.secondary,

          // borderTopColor: activeColors.grayAccent,
          // borderTopWidth: 1,
          width: "100%",
          // borderBottomEndRadius: 20,
          // borderBottomStartRadius: 20,
          // position: "relative",
          // left: -20,
        }}
      >
        <View
          style={{}}
          className="pt-4 items-center justify-between w-full flex flex-row"
        >
          {/* split name and take first name*/}

          <View className="flex flex-row gap-2">
            {/* <MaterialCommunityIcons
              name="collage"
              size={16}
              color={activeColors.tint}
            /> */}
            <StyledText>Hi! Good Morning </StyledText>
          </View>
        </View>
        <View style={{}} className="pt-2 items-start ">
          {/* split name and take first name*/}

          {/* <StyledText bold>Hi, {user?.name.split(" ")[1]} </StyledText> */}
          <StyledText big>{user?.name} </StyledText>
        </View>
        {/* <View
          style={{
            paddingHorizontal: 20,
          }}
          className=" items-center justify-between w-full flex flex-row"
        > */}
        {/* split name and take first name*/}

        {/* <StyledWeatherView />
        </View> */}

        {/* <View
          style={{
            paddingHorizontal: 20,
          }}
          className=" flex flex-row items-center justify-start gap-2"
        >
          <Image
            source={require("@/assets/images/must.png")}
            style={{ height: 60, width: 60 }}
          />
          <View className=" flex " style={{}}>
            <StyledText small>
              Mbarara University of Science & Technology
            </StyledText>
            <StyledText>Succeed We Must</StyledText>
          </View> */}
        {/* </View> */}
        <View className="pt-4 items-center justify-start gap-2">
          {/* <View
            style={{
              height: 100,
              width: "100%",
              position: "relative",
              borderRadius: 0,
            }}
          >
            <Image
              source={require("@/assets/images/fast.jpeg")}
              style={{ height: 100, width: "100%", borderRadius: 0 }}
              resizeMode="cover"
            />
          </View> */}
          {/* <View className="flex items-center justify-center gap-4">
            <Image
              source={{ uri: user?.avatar.url }}
              style={{
                height: 80,
                width: 80,
                borderRadius: 50,
                borderColor: activeColors.grayAccent,
                borderWidth: 1,
              }}
              resizeMode="cover"
              className="rounded-full  "
            />
          </View> */}
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 0,
        }}
        className="h-full "
      >
        {/* top landing */}
        <View
          style={{
            // height: "1%",
            paddingVertical: 25,
            // backgroundColor: "steelblue",
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              // height: "40%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <StyledWeatherView /> */}

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}
              className=" justify-between w-full"
            >
              <StyledMenuItem icon="calendar" name="Schedule" />
              <StyledMenuItem icon="hexagon-multiple-outline" name="Hostels" />
              <StyledMenuItem icon="selection-multiple" name="Career" />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* here is the modal bottomsheet */}
                <StyledBottomSheet
                  // setIsOpen={setIsOpen(false)}
                  index={1}
                  bottomSheetModalRef={bottomSheetModalRef}
                  snapPoints={snapPoints}
                >
                  <MoreApps handleOnPress={handleAppOnPress} />
                </StyledBottomSheet>
                <TouchableOpacity
                  style={{
                    alignItems: "center",

                    justifyContent: "center",
                  }}
                  onPress={handlePresentModal}
                >
                  <MaterialCommunityIcons
                    name={"apps"}
                    // name="view-dashboard-outline"
                    size={20}
                    style={{
                      marginBottom: 5,
                      backgroundColor: activeColors.backgroundColorOpacity,
                      borderRadius: 50,
                      padding: 10,
                    }}
                    color={activeColors.tint}
                  />
                  <StyledText style={{ fontSize: 12 }}>More</StyledText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.ticketItem,
            {
              backgroundColor: activeColors.secondary,
              borderRadius: 10,
              borderColor: activeColors.grayAccent,
              borderWidth: 1,
              // borderTopEndRadius: 20,
            },
          ]}
          className="    "
          // onPress={() => router.push(`/inquiries/${item.id}`)}
        >
          <View
            style={{
              paddingHorizontal: 20,
            }}
            className=" flex-1 rounded-3xl py-4 w-full "
          >
            <View className="flex flex-row pb-4 justify-between items-center ">
              <View className=" items-center space-x-2 flex flex-row">
                <MaterialCommunityIcons
                  size={20}
                  strokeWidth={2}
                  color={activeColors.accent}
                  name="calendar-month-outline"
                />
                <StyledText>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </StyledText>
              </View>
            </View>

            <StyledView
              className="    w-full "
              style={{ borderColor: activeColors.grayAccent }}
            >
              <View
                style={[
                  {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                    // paddingVertical: Platform.OS === "ios" ? 10 : 5,
                    // borderRadius: 5,
                    marginRight: 0,
                    marginTop: 10,
                  },
                  { borderWidth: 0, borderLeftWidth: 5 },
                  { borderColor: activeColors.accent },
                ]}
                className="py-4 "
              >
                <View />
                <View className="flex px-4 pb-2 flex-row justify-between items-center w-full">
                  <StyledText bold>Important Update</StyledText>
                  <MaterialCommunityIcons
                    size={20}
                    strokeWidth={2}
                    color={activeColors.accent}
                    name="piston"
                  />
                </View>
                <View className="flex px-4 flex-row justify-between items-center w-full">
                  <Text
                    className=" font-semibold"
                    style={{
                      color: activeColors.accent,
                    }}
                  >
                    Registration for Semester 1 2021/2022
                  </Text>
                </View>
              </View>
              <View
                style={[
                  {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                    // paddingVertical: Platform.OS === "ios" ? 10 : 5,
                    // borderRadius: 5,
                    marginRight: 0,
                    marginTop: 10,
                  },
                  {
                    borderColor: "#041633",
                    borderWidth: 0,
                    borderLeftWidth: 5,
                  },
                ]}
                className="py-4  "
              >
                <View />
                <View className="flex pb-2 flex-row justify-between items-center px-4 space-x-5 ">
                  <View className=" items-center space-x-2 flex flex-row">
                    <MaterialCommunityIcons
                      size={15}
                      strokeWidth={2}
                      color={activeColors.gray}
                      name="phone"
                    />
                    <Text
                      className="text-xs "
                      style={{
                        color: activeColors.gray,
                      }}
                    >
                      PHONE
                    </Text>
                  </View>
                  <View className=" items-center space-x-2 flex flex-row">
                    <MaterialCommunityIcons
                      size={15}
                      strokeWidth={2}
                      color={activeColors.gray}
                      name="email"
                    />
                    <Text
                      className="text-xs "
                      style={{
                        color: activeColors.gray,
                      }}
                    >
                      EMAIL
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row justify-between items-center px-4">
                  <View className=" items-center space-x-2 flex flex-row">
                    <MaterialCommunityIcons
                      size={15}
                      strokeWidth={2}
                      color={activeColors.gray}
                      name="identifier"
                    />
                    <Text
                      className=" font-medium"
                      style={{
                        color: activeColors.gray,
                      }}
                    >
                      Student ID
                    </Text>
                  </View>
                </View>
              </View>
            </StyledView>
          </View>
        </TouchableOpacity>
        {/* <View style={{}}>
          <TimelineComponent data={data} />
        </View> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <View
              style={[
                styles.ticketContainer,
                // styles.ticketAnswered,
                styles.ticketPending,
                // styles.ticketUnanswered,
              ]}
              className="relative "
            >
              <View
                style={[
                  styles.ticketItem,
                  {
                    // backgroundColor: activeColors.secondary,
                    // borderColor: activeColors.primary,
                  },
                ]}
                className="  "
              >
                <View style={styles.ticketStatusIndicator} />
                <View className="flex   flex-row justify-between  items-center">
                  <StyledText
                    style={{ color: activeColors.tint }}
                    className="font-semibold text-base"
                  >
                    Title
                  </StyledText>
                  <View className=" relative ">
                    <Text
                      style={{
                        color: activeColors.gray,
                      }}
                      className=" font-semibold"
                    >
                      time
                    </Text>
                  </View>
                </View>
                <View className="">
                  <Text
                    style={{
                      color: activeColors.tertiary,
                    }}
                    className=" truncate overflow-hidden font-medium "
                  >
                    Response
                  </Text>
                </View>
                <View className="flex   flex-row justify-between w-full items-center ">
                  <Text
                    style={{
                      color: activeColors.tint,
                    }}
                    className=" font-semibold "
                  >
                    AI:
                  </Text>

                  <Image
                    source={require("@/assets/chats/bot.gif")}
                    className="h-20 w-20 rounded-full"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "80%",
    height: "40%",
    borderRadius: 5,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  ticketItem: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  ticketContainer: {
    width: Dimensions.get("window").width - 20,
    flexDirection: "column",
    // alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    // borderRadius: 5,
    marginRight: 10,
    marginTop: 30,
    justifyContent: "center",
  },
  ticketAnswered: {
    // backgroundColor: "#eff0fb",
    borderColor: "#6a6fc5",
    borderWidth: 0,
    borderLeftWidth: 5,
  },
  ticketPending: {
    // backgroundColor: "#fff5e9",
    borderLeftColor: "#F9A825",
    borderWidth: 0,
    borderLeftWidth: 5,
  },
  ticketUnanswered: {
    // backgroundColor: "#ffeeef",
    borderColor: "#D32F2F",
    borderWidth: 0,
    borderLeftWidth: 5,
  },
  ticketItemRight: {
    marginLeft: 0,
    alignItems: "flex-end",
  },
  ticketStatusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
});
