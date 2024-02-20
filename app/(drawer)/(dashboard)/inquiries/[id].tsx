/* tslint:disable */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "expo-router";

import {
  CalendarDaysIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneArrowUpRightIcon,
} from "react-native-heroicons/outline";
import { dummyMessages } from "@/data/messages";
import { WithdrawTicket } from "@/components/ticket/bottomShets";

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import MainContainer from "@/components/container/MainContainer";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "@/components/Text/StyledText";
import StyledView from "@/components/View/StyledView";
import AssistantButton from "@/components/ticket/assistantButton";
import { useDispatch, useSelector } from "react-redux";
import getTimeDuration, {
  getLocaleDateString,
  getTimeDurationLong,
} from "@/common/TimeGenerator";
import { Image } from "react-native";
import StyledMenuItem from "@/components/Menu/StyledMenuItem";

export default function InquiryId({ navigation }) {
  const { tickets, isLoadingTicket } = useSelector(
    (state: any) => state.ticket
  );
  const [data, setData] = useState({});
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const setStatus = (id: string, status: string, dispatch: any) => {
    dispatch({
      type: "ticket/setStatus",
      payload: {
        id,
        status,
      },
    });
  };
  const pathname = usePathname();
  const id = pathname.split("/").slice(-1);
  const stringId = id.toString();

  const router = useRouter();
  useEffect(() => {
    if (tickets && user) {
      const myPosts = tickets.find((ticket: any) => ticket._id === stringId);
      setData(myPosts);
    }
  }, [tickets]);
  const ticket = tickets.find((ticket: any) => ticket._id === stringId);

  // bOTTOM SHEET
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRef = useRef(null);
  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }

  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const [active, setActive] = useState(0);
  const labels = ["Key Details", "Replies", "Student Info"];
  const handleTabPress = (index: number) => {
    setActive(index);
  };

  return (
    <MainContainer
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <View className="w-full ">
        <AssistantButton />
      </View>

      <View style={{}} className=" flex-1 rounded-3xl py-4 w-full ">
        <View className="flex flex-row pb-4 justify-between items-center ">
          <View className=" items-center space-x-2 flex flex-row">
            <MaterialCommunityIcons
              size={20}
              strokeWidth={2}
              color={activeColors.accent}
              name="calendar-month-outline"
            />

            {user?._id === ticket?.assignedToUser._id ? (
              <StyledText>{getLocaleDateString(ticket?.createdAt)}</StyledText>
            ) : (
              <StyledText>{getTimeDurationLong(ticket?.createdAt)}</StyledText>
            )}
          </View>

          <View className=" items-center space-x-2 flex flex-row pr-2">
            {user?._id === ticket?.assignedToUser._id ? (
              <TouchableOpacity
                className={` flex   items-center   justify-center  p-1 font-bold  px-1 `}
                onPress={() =>
                  router.replace({
                    pathname: "/inquiries/reply",
                    params: { id: ticket?._id },
                  })
                }
              >
                <StyledText
                  style={{
                    color: activeColors.accent,
                  }}
                >
                  <StyledText
                    style={{
                      color: activeColors.accent,
                    }}
                    className="ml-1 underline"
                  >
                    <MaterialCommunityIcons
                      name="pencil-outline"
                      color={activeColors.accent}
                      size={25}
                    />
                  </StyledText>{" "}
                  reply
                </StyledText>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  className={` flex   items-center   justify-center  p-1 font-bold  px-1 `}
                  onPress={() => setStatus(ticket?._id, "resolved", dispatch)}
                >
                  <StyledText
                    style={{
                      color: activeColors.accent,
                    }}
                    className=" underline"
                  >
                    {ticket?.status === "resolved"
                      ? "resolved"
                      : "Mark as resolved"}
                  </StyledText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handlePresentModal}
                  className={` flex   items-center   justify-center  p-1 font-bold  px-1 `}
                >
                  <MaterialCommunityIcons
                    name="dots-horizontal"
                    color={activeColors.accent}
                    size={25}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <ScrollView bounces showsVerticalScrollIndicator={false}>
          <StyledView
            className="  rounded-md border  w-full "
            style={{ borderColor: activeColors.primary }}
          >
            <View
              style={[
                styles.ticketContainer,
                styles.ticketAnswered,
                { borderColor: activeColors.accent },
              ]}
              className="py-4 "
            >
              <View style={styles.ticketStatusIndicator} />
              <View className="flex px-4 pb-2 flex-row justify-between items-center w-full">
                <StyledText bold>
                  {user?._id === ticket?.user._id
                    ? `${ticket?.assignedToUser?.name}`
                    : `${ticket?.user?.name}`}
                </StyledText>
              </View>
              <View className="flex px-4 flex-row justify-between items-center w-full">
                <Text
                  className=" font-semibold"
                  style={{
                    color: activeColors.gray,
                  }}
                >
                  Title: {ticket?.title}
                </Text>
                <View>
                  <Entypo name="star" size={18} color={"orange"} />
                </View>
              </View>
            </View>
            {user?._id === ticket?.user._id ? (
              <View
                style={[styles.ticketContainer, styles.ticketAnswered2]}
                className="py-4  "
              >
                <View style={styles.ticketStatusIndicator} />
                <View className="flex pb-2 flex-row justify-between items-center px-4 space-x-5 ">
                  <View className=" items-center space-x-2 flex flex-row">
                    <PhoneArrowUpRightIcon
                      size={15}
                      strokeWidth={2}
                      color={"gray"}
                    />
                    <Text
                      className="text-xs "
                      style={{
                        color: activeColors.gray,
                      }}
                    >
                      {ticket?.assignedToUser.phone}
                    </Text>
                  </View>
                  <View className=" items-center space-x-2 flex flex-row">
                    <EnvelopeIcon size={15} color={"gray"} strokeWidth={2} />
                    <Text
                      className="text-xs "
                      style={{
                        color: activeColors.gray,
                      }}
                    >
                      {ticket?.assignedToUser.email}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row justify-between items-center px-4">
                  <View className=" items-center space-x-2 flex flex-row">
                    <MaterialCommunityIcons
                      name="school"
                      size={15}
                      color={"gray"}
                    />
                    <Text
                      className=" font-medium"
                      style={{
                        color: activeColors.gray,
                      }}
                    >
                      Role ( Office ) - {ticket?.assignedToUser.role.position}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={[styles.ticketContainer, styles.ticketAnswered2]}
                className="py-4  "
              >
                <View style={styles.ticketStatusIndicator} />
                <View className="flex pb-2 flex-row justify-between items-center px-4 space-x-5 ">
                  <View className=" items-center space-x-2 flex flex-row">
                    <PhoneArrowUpRightIcon
                      size={15}
                      strokeWidth={2}
                      color={"gray"}
                    />
                    <Text
                      className="text-xs "
                      style={{
                        color: activeColors.gray,
                      }}
                    >
                      {ticket?.user?.phone}
                    </Text>
                  </View>
                  <View className=" items-center space-x-2 flex flex-row">
                    <EnvelopeIcon size={15} color={"gray"} strokeWidth={2} />
                    <Text
                      className="text-xs "
                      style={{
                        color: activeColors.gray,
                      }}
                    >
                      {ticket?.user?.email}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row justify-between items-center px-4">
                  <View className=" items-center space-x-2 flex flex-row">
                    <MaterialCommunityIcons
                      name="school"
                      size={15}
                      color={"gray"}
                    />
                    <Text
                      className=" font-medium"
                      style={{
                        color: activeColors.gray,
                      }}
                    >
                      Registration - {ticket?.description?.studentID}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </StyledView>
          {/* tab */}
          <View className="flex-row items-center my-3 justify-center w-full">
            <View
              className=" w-full flex-row my-3  items-center justify-between "
              style={{
                backgroundColor: activeColors.grayAccent,
                height: 40,
                borderRadius: 5,
                paddingHorizontal: 1.5,
              }}
            >
              {labels.map((label, index) => (
                <>
                  {user._id === ticket?.user._id ? (
                    <>
                      {label != "Student Info" && (
                        <TouchableOpacity
                          key={index}
                          className="w-[180px] h-[38px] "
                          style={{
                            backgroundColor:
                              active === index
                                ? activeColors.secondary
                                : activeColors.grayAccent,
                            borderWidth: active === index ? 1 : 0,
                            borderColor: activeColors.grayAccent,
                            borderRadius: 5,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onPress={() => handleTabPress(index)}
                        >
                          <StyledText
                            className={`text-center `}
                            style={{
                              color:
                                active !== index
                                  ? activeColors.tint
                                  : activeColors.tint,
                            }}
                          >
                            {label}
                          </StyledText>
                        </TouchableOpacity>
                      )}
                    </>
                  ) : (
                    <TouchableOpacity
                      key={index}
                      className="w-[120px] h-[38px] "
                      style={{
                        backgroundColor:
                          active === index
                            ? activeColors.secondary
                            : activeColors.grayAccent,
                        borderWidth: active === index ? 1 : 0,
                        borderColor: activeColors.grayAccent,
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => handleTabPress(index)}
                    >
                      <StyledText
                        className={`text-center `}
                        style={{
                          color:
                            active !== index
                              ? activeColors.tint
                              : activeColors.tint,
                        }}
                      >
                        {label}
                      </StyledText>
                    </TouchableOpacity>
                  )}
                </>
              ))}
            </View>
          </View>
          {/* tab content */}
          {active === 0 && (
            <ScrollView
              bounces
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              className="space-y-5    w-full"
            >
              <StyledView
                className="space-y-2   rounded-md border p-4   w-full"
                style={{ borderColor: activeColors.primary }}
              >
                <Text
                  className=" font-semibold  "
                  style={{
                    color: activeColors.tint,
                  }}
                >
                  Key Details - {id}
                </Text>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                    // paddingVertical: Platform.OS === "ios" ? 10 : 5,
                    // borderRadius: 5,
                    marginRight: 0,
                    marginTop: 10,
                  }}
                >
                  {Object.values(ticket?.description || {}).map((obj, i) => {
                    return (
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                        key={i}
                      >
                        {obj != ticket?.assignedToUser._id ? (
                          <StyledText
                            style={{
                              color: activeColors.gray,
                            }}
                            bold
                          >
                            {1 + i + ":: "}
                          </StyledText>
                        ) : (
                          <></>
                        )}

                        {obj != ticket?.assignedToUser._id ? (
                          <StyledText
                            style={{
                              color: activeColors.gray,
                            }}
                          >
                            {obj}
                          </StyledText>
                        ) : (
                          <></>
                        )}
                      </View>
                    );
                  })}
                </View>
              </StyledView>

              <View className=" my-3">
                {ticket?.image && (
                  <View className=" space-y-3">
                    <StyledText bold>Attachment</StyledText>
                    <Image
                      source={{ uri: ticket?.image?.url }}
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                        borderRadius: 10,
                        zIndex: 1111,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          )}

          {/* All Replies */}
          {active === 2 && (
            <View
              className="w-full  flex items-start justify-start"
              style={{
                flex: 1,
              }}
            >
              <Image
                source={{ uri: ticket?.user?.avatar.url }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 90,
                }}
              />
              <View className="mt-3 items-start justify-start">
                <StyledText
                  style={{
                    color: activeColors.gray,
                  }}
                >
                  {ticket?.user?.name}
                </StyledText>
                <StyledText
                  style={{
                    color: activeColors.gray,
                  }}
                  small
                >
                  {ticket?.user?.email}
                </StyledText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 30,
                    paddingTop: 30,
                  }}
                >
                  <StyledMenuItem icon="phone" />
                  <StyledMenuItem icon="email" />
                </View>
              </View>
              <View
                className="w-full"
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: activeColors.secondary,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 30,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <StyledText
                    style={{
                      color: activeColors.gray,
                    }}
                  >
                    Name {"  "}:
                  </StyledText>
                  <StyledText
                    style={{
                      color: activeColors.gray,
                    }}
                  >
                    {ticket?.user?.name}
                  </StyledText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 30,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <StyledText
                    style={{
                      color: activeColors.gray,
                    }}
                  >
                    Email{"    "}:
                  </StyledText>
                  <StyledText
                    style={{
                      color: activeColors.gray,
                    }}
                  >
                    {ticket?.user?.email}
                  </StyledText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 30,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <StyledText
                    style={{
                      color: activeColors.gray,
                    }}
                  >
                    Reg no. :
                  </StyledText>
                  <StyledText
                    style={{
                      color: activeColors.gray,
                    }}
                  >
                    {ticket?.description?.studentID}
                  </StyledText>
                </View>
              </View>
            </View>
          )}

          {/* All Replies */}
          {active === 1 && (
            <View
              style={{
                flex: 1,
              }}
              className="w-full h-full flex items-start justify-start"
            >
              {ticket?.replies.map((reply: any, i: number) => {
                return (
                  <View key={i} className="w-full mb-6 items-end justify-end">
                    {user._id === reply?.user?._id ? (
                      <View
                        style={{
                          // paddingHorizontal: Platform.OS === "ios" ? 20 : 20,
                          // paddingVertical: Platform.OS === "ios" ? 10 : 10,
                          width: "100%",
                        }}
                        className=" items-end justify-end"
                      >
                        <View
                          className=" items-end justify-end"
                          style={{
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              width: "70%",
                              flexDirection: "row",
                              justifyContent: "flex-end",
                              gap: 10,
                            }}
                            className=" items-start justify-start"
                          >
                            <StyledText bold className=" text-[18px]">
                              {reply?.user?.name}
                            </StyledText>
                            <Image
                              source={{ uri: reply?.user?.avatar?.url }}
                              width={40}
                              height={40}
                              borderRadius={100}
                            />
                          </View>
                          <View
                            style={{
                              width: "100%",
                            }}
                            className="pr-10 bottom-5 items-end justify-end"
                          >
                            <View
                              className=" items-end justify-end  "
                              style={{
                                // backgroundColor: activeColors.secondary,
                                borderRadius: 0,
                                padding: 10,
                                marginTop: 0,

                                width: "70%",
                                borderTopStartRadius: 0,
                                flexDirection: "row",
                                justifyContent: "flex-end",
                              }}
                            >
                              <StyledText className=" text-right w-full items-end justify-end">
                                {reply.title}
                              </StyledText>
                            </View>

                            <View
                              style={{
                                borderBottomColor: activeColors.grayAccent,
                                borderBottomWidth: 1,
                                paddingBottom: 10,
                              }}
                              className="mt-2 items-end"
                            >
                              {reply?.image && (
                                <Image
                                  source={{ uri: reply?.image.url }}
                                  style={{
                                    width: "70%",
                                    aspectRatio: 8 / 3,
                                    borderRadius: 10,
                                    zIndex: 1111,
                                    marginLeft: 0,
                                    marginVertical: 20,
                                  }}
                                />
                              )}
                            </View>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          // paddingHorizontal: Platform.OS === "ios" ? 20 : 20,
                          // paddingVertical: Platform.OS === "ios" ? 10 : 10,
                          width: "100%",
                        }}
                        className=" items-start justify-start"
                      >
                        <View
                          className=" items-start justify-start"
                          style={{
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              width: "70%",
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              gap: 10,
                            }}
                            className=" items-start justify-start"
                          >
                            <Image
                              source={{ uri: reply?.user?.avatar?.url }}
                              width={40}
                              height={40}
                              borderRadius={100}
                            />
                            <StyledText bold className=" text-[18px]">
                              {reply?.user?.name}
                            </StyledText>
                          </View>
                          <View
                            style={{
                              width: "100%",
                            }}
                            className="pl-10 bottom-5 items-start justify-start"
                          >
                            <View
                              className=" items-start justify-start  "
                              style={{
                                // backgroundColor: activeColors.secondary,
                                borderRadius: 0,
                                padding: 10,
                                marginTop: 0,

                                width: "70%",
                                borderTopStartRadius: 0,
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <StyledText className=" text-left w-full items-start justify-start">
                                {reply.title}
                              </StyledText>
                            </View>

                            <View
                              style={{
                                borderBottomColor: activeColors.grayAccent,
                                borderBottomWidth: 1,
                                paddingBottom: 10,
                              }}
                              className="mt-2 items-start"
                            >
                              {reply?.image && (
                                <Image
                                  source={{ uri: reply?.image.url }}
                                  style={{
                                    width: "70%",
                                    aspectRatio: 8 / 3,
                                    borderRadius: 10,
                                    zIndex: 1111,
                                    marginLeft: 0,
                                    marginVertical: 20,
                                  }}
                                />
                              )}
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 0,
                }}
              >
                <TouchableOpacity
                  className={` flex   items-center   justify-center  p-1 font-bold  px-1 `}
                  onPress={() =>
                    router.replace({
                      pathname: "/inquiries/reply",
                      params: { id: ticket?._id },
                    })
                  }
                >
                  <StyledText
                    style={{
                      color: activeColors.accent,
                    }}
                  >
                    <StyledText
                      style={{
                        color: activeColors.accent,
                      }}
                      className="ml-1 underline"
                    >
                      <MaterialCommunityIcons
                        name="pencil-outline"
                        color={activeColors.accent}
                        size={25}
                      />
                    </StyledText>{" "}
                    reply
                  </StyledText>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      <WithdrawTicket
        bottomSheetModalRef={bottomSheetModalRef}
        setIsOpen={setIsOpen}
        zIndex={50}
      />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 70,
    backgroundColor: "#FAFAFC",
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    borderColor: "#C1C0C8",
    borderWidth: 1,
  },
  ticketContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
    // paddingVertical: Platform.OS === "ios" ? 10 : 5,
    // borderRadius: 5,
    marginRight: 0,
    marginTop: 10,
  },
  ticketStatusIndicator: {
    // width: 10,
    // height: 10,
    // borderRadius: 5,
    // marginRight: 5,
  },
  ticketText: {
    fontSize: 16,
    // paddingVertical: 5,
    // margin: 20,
    fontWeight: "600",
    color: "#333333",
  },
  ticketAnswered: {
    // backgroundColor: "#eff0fb",
    // flex: 1,

    borderWidth: 0,
    borderLeftWidth: 5,
  },
  ticketAnswered2: {
    // backgroundColor: "#eff0fb",
    // flex: 1,
    borderColor: "#041633",
    borderWidth: 0,
    borderLeftWidth: 5,
  },
});
