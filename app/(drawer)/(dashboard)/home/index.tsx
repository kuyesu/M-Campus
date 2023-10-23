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
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/context/themeContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledMenuItem from "@/components/Menu/StyledMenuItem";
import StyledWeatherView from "@/components/weather/StyledWeatherView";

import { useDispatch, useSelector } from "react-redux";
import MoreApps from "@/components/home/apps";
import StyledBottomSheet from "@/components/BottomSheet/StyledBottomSheet";
import { Link, router } from "expo-router";
import { Image } from "react-native";
import StyledText from "@/components/Text/StyledText";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

import { URI } from "@/redux/URI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImportantUpdates from "@/components/home/update/ImportantUpdates";
const { width } = Dimensions.get("screen");

export default function TabOneScreen() {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user, toke } = useSelector((state: any) => state.user);
  const [posts, setPosts] = useState([]);

  const [isActive, setIsActivate] = useState(theme.mode === "dark");
  const handleSwitch = () => {
    updateTheme();
    setIsActivate((previousState) => !previousState);
  };

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   getAllPosts()(dispatch);
  // }, [dispatch]);
  useEffect(() => {
    // Some synchronous code.

    (async () => {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.get(`${URI}/get-all-posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(data.posts);
    })();

    return () => {
      // Some synchronous cleanup code.
    };
  }, []);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["25%", "30%", "55%"];

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
          width: "100%",
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
          }}
          className=" pt-4 flex-row justify-between w-full items-center"
        >
          <View>
            <View
              style={{}}
              className="items-center justify-between w-full flex flex-row"
            >
              <View className="flex flex-row gap-2">
                <StyledText>Hi! Good Evening </StyledText>
              </View>
            </View>
            <View style={{}} className="pt-2 items-start ">
              <StyledText big>{user?.name} </StyledText>
            </View>
          </View>
          <View>
            <StyledWeatherView />
          </View>
        </View>
        <View className="pt-4 items-center justify-start gap-2"></View>
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
              <StyledMenuItem
                icon="calendar"
                name="Schedule"
                onPress={() => router.push("/timetable")}
              />
              <StyledMenuItem
                icon="hexagon-multiple-outline"
                name="Hostels"
                onPress={() => router.push("/hostels")}
              />
              <StyledMenuItem
                icon="selection-multiple"
                name="Career"
                onPress={() => router.push("/jobs")}
              />
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
                  style={{
                    backgroundColor: activeColors.secondary,
                    borderTopColor: activeColors.grayAccent,
                    borderTopWidth: 1,
                    width: "100%",
                    borderBottomEndRadius: 20,
                    borderBottomStartRadius: 20,
                    position: "relative",
                    left: -20,
                  }}
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
                    size={25}
                    style={{
                      marginBottom: 5,
                      backgroundColor: activeColors.backgroundColorOpacity,
                      borderRadius: 50,
                      padding: 10,
                      borderColor: activeColors.grayAccent,
                      borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    color={activeColors.tint}
                  />
                  <StyledText style={{ fontSize: 12 }}>More</StyledText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("/notifications/update")}
            >
              <StyledText
                small
                style={{ marginBottom: 10, color: activeColors.gray }}
                className=" italic"
              >
                show all{" "}
                <MaterialCommunityIcons
                  color={activeColors.gray}
                  name="arrow-right"
                />
              </StyledText>
            </TouchableOpacity>
          </View>
          <ImportantUpdates />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity onPress={() => router.push("/feed")}>
            <StyledText
              small
              style={{ marginTop: 25, color: activeColors.gray }}
              className=" italic"
            >
              show all trending{" "}
              <MaterialCommunityIcons
                color={activeColors.gray}
                name="arrow-right"
              />
            </StyledText>
          </TouchableOpacity>
        </View>
        <View style={styles.optionListsContainer}>
          <ScrollView horizontal className=" flex-row ">
            {posts.slice(0, 6).map((item, index) => (
              <Link
                key={index}
                href="/feed"
                className=" items-start justify-center flex-row"
              >
                <View>
                  <View style={styles.optionsCard}>
                    {/* House image */}
                    <Image
                      source={{ uri: item?.image?.url }}
                      style={styles.optionsCardImage}
                    />

                    {/* Option title */}
                  </View>
                  <View className="w-44 px-4">
                    <StyledText
                      style={{
                        marginTop: 5,
                      }}
                      className="text-start  text-ellipsis whitespace-nowrap"
                      numberOfLines={1}
                      small
                    >
                      {item.title}
                    </StyledText>
                  </View>
                </View>
              </Link>
            ))}
          </ScrollView>
        </View>
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
  optionsCard: {
    height: Platform.OS === "ios" ? 90 : 90,
    shadowColor: "none",
    width: width / 2 - 30,
    elevation: 15,
    alignItems: "center",
    // backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCardImage: {
    height: 75,
    borderRadius: 5,
    width: "100%",
  },
  optionListsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 20,
    // paddingHorizontal: 20,
  },

  activeCategoryListText: {
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 40,
  },
  card: {
    height: 500,
    // backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    // borderRadius: 20,
  },
  cardImage: {
    width: "100%",
    height: 140,
    borderRadius: 5,
  },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5 },
});
