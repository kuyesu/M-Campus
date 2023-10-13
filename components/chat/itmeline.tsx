import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import React, { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Share,
  Pressable,
} from "react-native";
import StyledText from "../Text/StyledText";
import { router } from "expo-router";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  ArrowTrendingUpIcon,
  ClockIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  ShareIcon,
  UserIcon,
  ViewfinderCircleIcon,
} from "react-native-heroicons/outline";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getTimeDuration from "@/common/TimeGenerator";

const TimelineItem = ({ tickets }: any) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const bottomSheetModalRefAccount = useRef(null);

  const snapPoints = ["35%", "55%", "80%"];

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      // onPress={() => {
      //   router.push(`/inquiries/${ticketId}`);
      // }}
      onPress={() => {
        bottomSheetModalRefAccount.current?.present();

        setTimeout(() => {
          setIsOpen(true);
        }, 100);
      }}
    >
      <View
        style={{
          flexDirection: "column",
        }}
      >
        {tickets.map((ticket: any, index: any) => (
          <View
            key={index}
            style={[
              styles.ticketContainer,
              ticket.status === "reviewing" && styles.ticketAnswered,
              ticket.status === "closed" && [
                styles.ticketPending,
                { borderLeftColor: activeColors.accent },
              ],
              ticket.status === "in-progress" && styles.ticketUnanswered,
            ]}
            className="relative "
          >
            <View
              style={[
                styles.ticketItem,
                {
                  backgroundColor: activeColors.secondary,
                  borderColor: activeColors.primary,
                },
              ]}
              className="  rounded-xl border "
            >
              <View style={styles.ticketStatusIndicator} />
              <View className="flex   flex-row justify-between w-full items-center">
                <StyledText style={{ color: activeColors.tint }}>
                  {ticket.title}
                </StyledText>
                <View className=" relative ">
                  <Text
                    style={{
                      color: activeColors.tint,
                    }}
                    className=" font-semibold"
                  >
                    {getTimeDuration(ticket.createdAt)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    // gap: 5,
                  }}
                  className="  space-x-2 "
                >
                  <MaterialCommunityIcons
                    name="account"
                    size={15}
                    color={activeColors.tertiary}
                  />
                  <StyledText>{ticket.assignedToUser.name}</StyledText>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                  className="  space-x-2 "
                >
                  <MaterialCommunityIcons
                    name="card-text-outline"
                    size={15}
                    color={activeColors.tertiary}
                  />
                  <StyledText>{ticket.assignedToUser.role.position}</StyledText>
                </View>
              </View>
              <View className="flex   flex-row justify-between w-full items-center ">
                <Text
                  style={{
                    color: activeColors.tint,
                  }}
                  className=" font-semibold "
                >
                  Mi ID: {ticket._id}
                </Text>

                <Image
                  source={{ uri: ticket.assignedToUser.avatar.url }}
                  style={{
                    borderRadius: 50,
                    height: 60,
                    width: 60,
                  }}
                />
              </View>
            </View>
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
                <View
                  style={[style, { backgroundColor: "rgba(0, 0, 0, 0.9)" }]}
                />
              )}
            >
              <View className="p-5">
                <StyledText big>Submission</StyledText>
                <View className="py-5">
                  <View className="py-2 flex flex-row space-x-1 items-center">
                    <MaterialCommunityIcons
                      name="phone-dial"
                      size={20}
                      color={activeColors.accent}
                    />
                    <StyledText>{ticket.id}</StyledText>
                  </View>
                  <View className="py-2 flex flex-row space-x-1 items-center">
                    <MaterialCommunityIcons
                      name="content-duplicate"
                      size={20}
                      color={activeColors.accent}
                    />
                    <StyledText>{ticket.title}</StyledText>
                  </View>
                  <View className="py-2 flex flex-row space-x-1 items-center">
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={20}
                      color={activeColors.accent}
                    />
                    <StyledText>08:00-23:00AM .Mon</StyledText>
                  </View>
                  <View className="py-2 flex flex-row space-x-1 items-center">
                    <MaterialCommunityIcons
                      name="account"
                      size={20}
                      color={activeColors.accent}
                    />
                    <StyledText>{ticket?.toWhom}</StyledText>
                  </View>
                  <View className="py-2 flex flex-row space-x-1 items-center">
                    <MaterialCommunityIcons
                      name="cog-sync"
                      size={20}
                      color={activeColors.accent}
                    />
                    <StyledText>{ticket?.status}</StyledText>
                  </View>
                  <View className="py-4 flex flex-row space-x-1 items-center justify-between">
                    <TouchableOpacity
                      onPress={() => {
                        bottomSheetModalRefAccount.current?.close();

                        setTimeout(() => {
                          setIsOpen(false);
                        }, 100);
                        router.push(`/inquiries/${ticket.id}`);
                      }}
                      style={{
                        backgroundColor: activeColors.accent,
                      }}
                      className="py-2   px-4 flex flex-row space-x-1 items-center justify-end "
                    >
                      <MaterialCommunityIcons
                        name="eye-outline"
                        size={20}
                        color={activeColors.tint}
                      />
                      <StyledText
                        style={{
                          color: activeColors.tint,
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
                      <MaterialCommunityIcons
                        name="eye-outline"
                        size={20}
                        color={activeColors.grayAccent}
                      />
                      <StyledText>View</StyledText>
                    </Pressable>
                    <TouchableOpacity
                      onPress={onShare}
                      style={{
                        backgroundColor: activeColors.accent,
                      }}
                      className="py-2 relative right-2 px-4 flex flex-row space-x-1 items-center justify-end"
                    >
                      <StyledText>Share</StyledText>
                      <MaterialCommunityIcons
                        name="share-outline"
                        size={20}
                        color={activeColors.tint}
                      />
                    </TouchableOpacity>
                    <View
                      className="py-2 absolute right-1  bottom-3 -z-10 px-4 flex flex-row space-x-1 items-center justify-end"
                      style={{
                        backgroundColor: activeColors.primary,
                      }}
                    >
                      <StyledText>Share</StyledText>
                      <ShareIcon size={18} strokeWidth={2} color={"#041633"} />
                    </View>
                  </View>
                  <View className="">
                    <Barcode
                      format="CODE128B"
                      value="0000002021954Q"
                      text="0000002021954Q"
                      maxWidth={(Dimensions.get("window").width * 2) / 1.6}
                      height={70}
                    />
                  </View>
                </View>
              </View>
            </BottomSheetModal>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const Timeline = ({ data }: any) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const bottomSheetModalRefAccount = useRef(null);
  const [activeId, setActiveId] = useState("");

  const snapPoints = ["95%", "100%"];

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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces>
      <View style={styles.timelineContainer}>
        <TimelineItem tickets={data} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  timelineContainer: {
    flex: 1,
    // paddingHorizontal: 20,
  },
  container: {
    flexDirection: "column",
    marginVertical: 10,
    // alignItems: "baseline",
  },
  dateContainer: {
    alignItems: "flex-start",
    marginRight: 10,
    flex: 1,
  },
  dateLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E9EAED",
  },
  dateText: {
    marginTop: 5,
    color: "#041633",
    fontSize: 12,
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
  ticketItem: {
    // flexDirection: "row",
    alignItems: "baseline",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    // marginBottom: 2,
    margin: 16,
    marginVertical: 10,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  ticketStatusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  ticketText: {
    fontSize: 16,
    paddingVertical: 5,
    // margin: 20,
    fontWeight: "600",
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
});

export default Timeline;
