import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  Pressable,
  Share,
} from "react-native";
import {
  ArrowTrendingUpIcon,
  ClockIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  FingerPrintIcon,
  ShareIcon,
  UserIcon,
  ViewfinderCircleIcon,
} from "react-native-heroicons/outline";
// components
import MainContainer from "@/components/container/MainContainer";
import { colors } from "@/constants/Colors";
import { useContext, useRef, useState } from "react";
import { ThemeContext } from "@/context/themeContext";
import StyledView from "@/components/View/StyledView";
import {
  ChevronRightIcon,
  ShieldCheckIcon,
} from "react-native-heroicons/outline";
import StyledText from "@/components/Text/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledMenuItem from "@/components/Menu/StyledMenuItem";
import StyledWeatherView from "@/components/weather/StyledWeatherView";

import TimelineComponent from "@/components/chat/itmeline";

import { Link, router } from "expo-router";
import TicketListingScreen from "@/components/ticket";
import InsightUser from "@/components/insights";
import { ScrollView } from "react-native-gesture-handler";
import data from "@/data/inquiries";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import { useSelector } from "react-redux";

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
  const [modalVisible, setModalVisible] = useState(false);

  // const { user } = useSelector((state: any) => state.user);
  // const { isSuccess, isLoading } = useSelector((state: any) => state.post);

  // const [userData, setUserData] = useState({
  //   user,
  // });

  const [tickets, setTickets] = useState([
    {
      id: "CYM0972",
      subject: "Network Connectivity Issue",
      status: "Resolved",
      priority: "High",
      date: "2023-07-15",
      toWhom: "AR office",
      description: "Personal access or OAuth tokens will ",
    },
    {
      id: "CYM09342",
      subject: "Network Connectivity Issue",
      status: "Withdrawn",
      priority: "High",
      date: "2023-07-15",
      toWhom: "AR office",
      description: "Personal access or OAuth tokens will ",
    },
    {
      id: "CYM09753",
      subject: "Software Installation Request",
      status: "Pending",
      priority: "Medium",
      date: "2023-07-14",
      toWhom: "Software Department",
      description: "Personal access or OAuth tokens will  ",
    },
    {
      id: "CYM097",
      subject: "Printer Not Working",
      status: "Resolved",
      priority: "High",
      date: "2023-07-13",
      toWhom: "Solomon Agum",
      description: "Personal access or OAuth tokens will ",
    },
    // Add more ticket data here
  ]);

  const [ticketId, setTicketId] = useState("");

  const withdrawn = data.map((item, index) => {
    item.tickets.filter((item, index) => {
      item.status === "unanswered";
    });
  });

  const pending = data.map((item, index) => {
    item.tickets.filter((item, index) => {
      item.status === "pending";
    });
  });

  const answered = data.map((item, index) => {
    item.tickets.filter((item, index) => {
      item.status === "answered";
    });
  });

  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRefAccount = useRef(null);
  function handlePresentModal() {
    bottomSheetModalRefAccount.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }

  const snapPoints = ["95%", "100%"];

  const [activeId, setActiveId] = useState("");

  const ticket = tickets.find((item) => item.id === activeId);

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

  return (
    <MainContainer
      style={[styles.container]}
      contentContainerStyle={{ flexGrow: 1, gap: 40 }}
    >
      <View style={{ paddingTop: 0, height: 90 }}>
        <View
          className=" p-2 shadow-md bg-[#287ed0] py-4 flex-row  w-full items-center  justify-between"
          style={{ height: "100%" }}
        >
          <View className="flex  ">
            <ShieldCheckIcon size={20} color="#cfe5f1" />
          </View>
          <View className="flex  flex-col">
            <Text className="text-md text-left items-center font-bold truncate text-[#cfe5f1]">
              Asurance for your safety 54
            </Text>
            <Text className="text-xs text-left items-center font-light truncate text-[#cfe5f1]">
              Up to 54% of students are assured of their safety
            </Text>
          </View>
          <View className="flex  ">
            <ChevronRightIcon size={18} color="#cfe5f1" />
          </View>
        </View>
      </View>
      <View style={{}} className="h-full space-y-8">
        {/* top landing */}
        <View
          style={{
            height: "15%",
            // backgroundColor: "steelblue",
            gap: 20,
          }}
        >
          <View
            style={{
              height: "60%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <StyledWeatherView />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 20,
              }}
            >
              <StyledMenuItem icon="timetable" />
              <StyledMenuItem icon="line-scan" />
              <StyledMenuItem icon="briefcase-outline" />
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: activeColors.accent,
                  padding: 10,
                }}
              >
                <Modal
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.9)",
                    height: Dimensions.get("window").height,
                  }}
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View
                    style={[
                      styles.centeredView,
                      {
                        height: Dimensions.get("window").height,
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.9)",
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.modalView,
                        {
                          backgroundColor: activeColors.secondary,
                        },
                      ]}
                    >
                      <Pressable
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          padding: 10,
                        }}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <MaterialCommunityIcons
                          name={"close"}
                          // name="view-dashboard-outline"
                          size={25}
                          color={activeColors.tint}
                        />
                      </Pressable>
                      <View
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 40,
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            gap: 20,
                            width: "100%",
                          }}
                        >
                          <StyledMenuItem
                            style={{ width: "20%" }}
                            name="Lineup"
                            icon="timetable"
                          />
                          <TouchableOpacity
                            style={[
                              {
                                alignItems: "center",
                                width: "15%",
                                gap: 10,
                              },
                            ]}
                            onPress={() => {
                              setModalVisible(!modalVisible);
                              router.push("/hostels");
                            }}
                          >
                            <MaterialCommunityIcons
                              name={"home-outline"}
                              // name="view-dashboard-outline"
                              size={30}
                              color={activeColors.accent}
                            />
                            <StyledText style={{ fontSize: 12 }}>
                              Hostel
                            </StyledText>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={[
                              {
                                alignItems: "center",
                                width: "15%",
                                gap: 10,
                              },
                            ]}
                            onPress={() => {
                              setModalVisible(!modalVisible);
                              router.push("/jobs");
                            }}
                          >
                            <MaterialCommunityIcons
                              name={"briefcase-outline"}
                              // name="view-dashboard-outline"
                              size={30}
                              color={activeColors.accent}
                            />
                            <StyledText style={{ fontSize: 12 }}>
                              Jobs
                            </StyledText>
                          </TouchableOpacity>
                          <StyledMenuItem
                            style={{ width: "20%" }}
                            name="Update"
                            icon="alarm-multiple"
                          />
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            gap: 20,
                            width: "100%",
                          }}
                        >
                          <StyledMenuItem
                            style={{ width: "20%" }}
                            name="Health"
                            icon="medical-bag"
                          />
                          <StyledMenuItem
                            style={{ width: "20%" }}
                            name="VR"
                            icon="line-scan"
                          />
                          <StyledMenuItem
                            style={{ width: "20%" }}
                            name="Eco"
                            icon="recycle-variant"
                          />
                          <TouchableOpacity
                            style={[
                              {
                                alignItems: "center",
                                width: "15%",
                                gap: 10,
                              },
                            ]}
                            onPress={() => {
                              setModalVisible(!modalVisible);
                              router.push("/feed");
                            }}
                          >
                            <MaterialCommunityIcons
                              name={"alarm-bell"}
                              // name="view-dashboard-outline"
                              size={30}
                              color={activeColors.accent}
                            />
                            <StyledText style={{ fontSize: 12 }}>
                              Tweets
                            </StyledText>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            gap: 20,
                            width: "100%",
                          }}
                        >
                          <StyledMenuItem
                            style={{ width: "20%" }}
                            name="Lineup"
                            icon="timetable"
                          />
                          <StyledMenuItem
                            style={{ width: "20%" }}
                            name="Hostel"
                            icon="home-outline"
                          />
                          <TouchableOpacity
                            style={[
                              {
                                alignItems: "center",
                                width: "15%",
                                gap: 10,
                              },
                            ]}
                            onPress={() => {
                              setModalVisible(!modalVisible);
                              router.push("/jobs");
                            }}
                          >
                            <MaterialCommunityIcons
                              name={"briefcase-outline"}
                              // name="view-dashboard-outline"
                              size={30}
                              color={activeColors.accent}
                            />
                            <StyledText style={{ fontSize: 12 }}>
                              Jobs
                            </StyledText>
                          </TouchableOpacity>
                          <StyledMenuItem
                            style={{ width: "20%" }}
                            name="Update"
                            icon="alarm-multiple"
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <MaterialCommunityIcons
                    name={"apps"}
                    // name="view-dashboard-outline"
                    size={30}
                    color={activeColors.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <StyledText
                style={{
                  color: activeColors.accent,
                  fontSize: 30,
                  alignItems: "flex-end",
                  fontFamily: "H",
                  padding: 5,
                  borderRadius: 50,
                  backgroundColor: activeColors.secondary,
                }}
                bold
              >
                {answered.length < 10 ? `0${answered.length}` : answered.length}
              </StyledText>
              <StyledText
                style={{
                  color: activeColors.tint,
                  fontSize: 20,
                  paddingLeft: 20,
                  fontFamily: "H",
                }}
                bold
              >
                Resolved
              </StyledText>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <StyledText
                style={{
                  color: activeColors.accent,
                  fontSize: 30,
                  alignItems: "flex-end",
                  fontFamily: "H",
                  padding: 5,
                  borderRadius: 50,
                  backgroundColor: activeColors.secondary,
                }}
                bold
              >
                {pending.length < 10 ? `0${pending.length}` : pending.length}
              </StyledText>
              <StyledText
                style={{
                  color: activeColors.tint,
                  fontSize: 20,
                  padding: 10,
                  fontFamily: "H",
                }}
                bold
              >
                P
              </StyledText>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <StyledText
                style={{
                  color: activeColors.accent,
                  fontSize: 30,
                  alignItems: "flex-end",
                  fontFamily: "H",
                  padding: 5,
                  borderRadius: 50,
                  backgroundColor: activeColors.secondary,
                }}
                bold
              >
                {withdrawn.length < 10
                  ? `0${withdrawn.length}`
                  : withdrawn.length}
              </StyledText>
              <StyledText
                style={{
                  color: activeColors.tint,
                  fontSize: 20,
                  padding: 10,
                  fontFamily: "H",
                }}
                bold
              >
                W
              </StyledText>
            </View>
          </View>
        </View>

        {/* <View
          style={{
            height: "20%",
          }}
        >
          <StyledCharts />
        </View> */}
        <View style={{ flex: 1 }}>
          <TimelineComponent data={data} />
        </View>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
});
