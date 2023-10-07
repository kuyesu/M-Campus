import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  Pressable,
  Platform,
  Share,
  useWindowDimensions,
} from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
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
import Barcode from "@kichiyaki/react-native-barcode-generator";
import { router } from "expo-router";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "../Text/StyledText";

const TicketListingScreen = () => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
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
  const [isOpen, setIsOpen] = useState(false);
  const [ticketId, setTicketId] = useState("");
  // Modal settings
  const bottomSheetModalRefAccount = useRef(null);
  // function handlePresentModal() {
  //   bottomSheetModalRefAccount.current?.present();
  //   setActiveId(item.id);
  //   setTimeout(() => {
  //     setIsOpen(true);
  //   }, 100);
  // }

  const snapPoints = ["95%", "100%"];

  const [activeId, setActiveId] = useState("");

  const ticket = tickets.find((item) => item.id === activeId);

  // /////////////////
  // shareable link
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
    <>
      <View
        style={[styles.container, { backgroundColor: activeColors.primary }]}
      >
        <FlashList
          data={tickets}
          // estimatedItemSize={114}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.ticketItem,
                { backgroundColor: activeColors.secondary },
              ]}
              className="    "
              onPress={() => {
                bottomSheetModalRefAccount.current?.present();
                setActiveId(item.id);
                setTimeout(() => {
                  setIsOpen(true);
                }, 100);
              }}
            >
              <View style={styles.ticketItemLeft} className="space-y-5">
                <View className="flex   flex-row justify-between">
                  <Text
                    style={{ color: activeColors.tint }}
                    className="font-semibold text-base"
                  >
                    {item.subject}
                  </Text>
                  <View style={styles.ticketItemRight} className=" ">
                    <Text
                      style={{
                        color: activeColors.tertiary,
                      }}
                      className=" font-semibold"
                    >
                      {item.date}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: activeColors.tertiary,
                  }}
                  className=" truncate overflow-hidden font-medium "
                >
                  {item.description}
                </Text>
                <View className="flex flex-row items-center justify-between">
                  <View className="flex flex-row ">
                    <View className="flex flex-col">
                      <View className="flex relative  flex-row  pt-2 ">
                        <View
                          className={
                            ` relative flex-row items-center justify-center  m-1 py-1 ` +
                            `${
                              item.status === "Resolved"
                                ? "bg-[#eff0fb]"
                                : item.status === "Pending"
                                ? "bg-[#fff5e9]"
                                : "bg-[#ffeeef]"
                            }  `
                          }
                          style={{
                            paddingVertical: 6,
                            paddingHorizontal: 12,
                            borderRadius: 20,
                            // rerColor: COLORS.secondary, //COLORS.gray2,
                          }}
                        >
                          <View className="flex items-center justify-center"></View>
                          <Text className="text-sm text-center items-center font-bold text-[#3b3f57]">
                            {item.status}
                          </Text>
                        </View>
                      </View>
                      <View className="flex absolute -z-20 left-0.5 top-1   flex-row  pt-2 ">
                        <View
                          className={
                            ` relative flex-row items-center justify-center  m-1 py-1 ` +
                            `${
                              item.status === "Resolved"
                                ? "bg-[#6a6fc5]"
                                : item.status === "Pending"
                                ? "bg-[#F9A825]"
                                : "bg-[#D32F2F]"
                            }  `
                          }
                          style={{
                            paddingVertical: 6,
                            paddingHorizontal: 12,
                            borderRadius: 20,
                            // borderWidth: 1,
                            // borderColor: COLORS.secondary, //COLORS.gray2,
                          }}
                        >
                          <View className="flex items-center justify-center"></View>
                          <Text className="text-sm text-center items-center font-bold text-[#041633]">
                            {item.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View className="flex flex-row space-x-3 items-center">
                    <Text
                      style={{
                        color: activeColors.tint,
                      }}
                      className=" font-semibold"
                    >
                      {item.toWhom}
                    </Text>
                    {/* Fix this image */}
                    {/* <Image
                      source={images.notice2}
                      className="h-8 w-8 rounded-full"
                    /> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRefAccount}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{
            borderRadius: 0,
            backgroundColor: activeColors.secondary,
          }}
          onDismiss={() => setIsOpen(false)}
          backdropComponent={({ style }) => (
            <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.9)" }]} />
          )}
        >
          <View className="p-5">
            <StyledText bold>Ticket Information</StyledText>
            <View className="py-5">
              <View className="py-2 flex flex-row space-x-1 items-center">
                <DevicePhoneMobileIcon size={18} color={"#3b3f57"} />
                <StyledText>{ticket?.id}</StyledText>
              </View>
              <View className="py-2 flex flex-row space-x-1 items-center">
                <CursorArrowRaysIcon size={18} color={"#3b3f57"} />
                <StyledText>{ticket?.subject}</StyledText>
              </View>
              <View className="py-2 flex flex-row space-x-1 items-center">
                <ClockIcon size={18} color={"#3b3f57"} />
                <StyledText>08:00-23:00AM .Mon</StyledText>
              </View>
              <View className="py-2 flex flex-row space-x-1 items-center">
                <UserIcon size={18} color={"#3b3f57"} />
                <StyledText>{ticket?.toWhom}</StyledText>
              </View>
              <View className="py-2 flex flex-row space-x-1 items-center">
                <ArrowTrendingUpIcon size={18} color={"#3b3f57"} />
                <StyledText>{ticket?.status}</StyledText>
              </View>
              <View className="py-4 flex flex-row space-x-1 items-center justify-between">
                <TouchableOpacity
                  onPress={() => {
                    setIsOpen(false);
                    router.push(`/inquiries/${ticket.id}`);
                  }}
                  style={{
                    backgroundColor: activeColors.accent,
                  }}
                  className="py-2   px-4 flex flex-row space-x-1 items-center justify-end "
                >
                  <ViewfinderCircleIcon
                    size={18}
                    strokeWidth={2}
                    color={"#041633"}
                  />
                  <StyledText
                    style={{
                      color: "#041633",
                    }}
                  >
                    View
                  </StyledText>
                </TouchableOpacity>
                <Pressable
                  className="py-2 absolute  -z-10 top-5 px-4 flex flex-row space-x-1 items-center justify-end"
                  style={{
                    backgroundColor: activeColors.primary,
                  }}
                >
                  <ViewfinderCircleIcon
                    size={18}
                    strokeWidth={2}
                    color={"#041633"}
                  />
                  <Text className="font-semibold">View</Text>
                </Pressable>
                <TouchableOpacity
                  onPress={onShare}
                  style={{
                    backgroundColor: activeColors.accent,
                  }}
                  className="py-2 relative right-2 px-4 flex flex-row space-x-1 items-center justify-end"
                >
                  <Text className="font-semibold">Share</Text>
                  <ShareIcon size={18} strokeWidth={2} color={"#041633"} />
                </TouchableOpacity>
                <View
                  className="py-2 absolute right-1  bottom-3 -z-10 px-4 flex flex-row space-x-1 items-center justify-end"
                  style={{
                    backgroundColor: activeColors.primary,
                  }}
                >
                  <StyledText
                    style={{
                      color: "#041633",
                    }}
                  >
                    Share
                  </StyledText>
                  <ShareIcon size={18} strokeWidth={2} color={"#041633"} />
                </View>
              </View>
              <View className="">
                <Barcode
                  format="CODE128B"
                  value="0000002021954Q"
                  text="0000002021954Q"
                  maxWidth={(Dimensions.get("window").width * 2) / 2.6}
                  height={70}
                />
              </View>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 16,
  },
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

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#ff5722",
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  ticketItem: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginBottom: 2,
    marginTop: 16,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  ticketItemLeft: {
    flex: 1,
  },
  ticketId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ticketSubject: {
    fontSize: 14,
    marginBottom: 4,
  },
  ticketDetails: {
    fontSize: 12,
    color: "#666",
  },
  ticketItemRight: {
    marginLeft: 0,
    alignItems: "flex-end",
  },
  ticketDate: {
    fontSize: 12,
    color: "#666",
  },
});

export default TicketListingScreen;
