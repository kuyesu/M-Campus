import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { Link, router, usePathname } from "expo-router";

import {
  CalendarDaysIcon,
  ChatBubbleLeftIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  InboxIcon,
  MapIcon,
  MapPinIcon,
  PhoneArrowUpRightIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { dummyMessages } from "@/data/messages";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { WithdrawTicket } from "@/components/ticket/bottomShets";

import { Entypo } from "@expo/vector-icons";
import MainContainer from "@/components/container/MainContainer";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "@/components/Text/StyledText";
import StyledView from "@/components/View/StyledView";

export default function InquiryId() {
  const [messages, setMessages] = useState(dummyMessages);
  const pathname = usePathname();
  const id = pathname.split("/").slice(-1);

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

  return (
    <MainContainer
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <View className="w-full ">
        <TouchableOpacity
          onPress={() => router.push("/inquiries/ticket/")}
          style={[
            styles.footer,
            {
              backgroundColor: activeColors.secondary,
              borderColor: activeColors.primary,
              borderWidth: 1,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,

              elevation: 1,
            },
          ]}
        >
          <View>
            <Text
              style={{
                color: activeColors.tint,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Submit a Ticket
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: activeColors.tertiary,
                fontWeight: "bold",
              }}
            >
              Did you know you can just ask AI?
            </Text>
          </View>
          <View className="flex">
            <View className="flex relative w-full flex-col space-y-3  ">
              <View>
                <TouchableOpacity
                  onPress={() => router.push("/assistant")}
                  className={` flex  right-0.5 items-center  w-full justify-center  p-2.5 font-bold rounded-full  `}
                  style={{
                    shadowColor: "#000",
                    backgroundColor: activeColors.accent,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    borderColor: "#041633",
                    borderWidth: 1,
                  }}
                >
                  <ChatBubbleLeftIcon
                    color="#041633"
                    // fill={"#041633"}
                    size={20}
                  />
                </TouchableOpacity>

                {/* <Link href={"/chat"} asChild> */}
                <View
                  className={` flex absolute -z-10  top-0.5 items-center  w-full justify-center bg-[#041633] p-2.5 font-bold rounded-full  `}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    borderColor: "#041633",
                    borderWidth: 1,
                  }}
                >
                  <ChatBubbleLeftIcon
                    color="#041633"
                    // fill={"#041633"}
                    size={20}
                  />
                </View>
                {/* </Link> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{}} className=" flex-1 rounded-3xl py-4 w-full ">
        <View className="flex flex-row pb-4 justify-between items-center ">
          <View className=" items-center space-x-2 flex flex-row">
            <CalendarDaysIcon size={20} strokeWidth={2} color={"gray"} />
            <StyledText>06 May, 2023</StyledText>
          </View>

          <View className=" items-center space-x-2 flex flex-row pr-2">
            <TouchableOpacity
              onPress={handlePresentModal}
              style={{
                backgroundColor: activeColors.accent,
              }}
              className={` flex   items-center -right-1  justify-center  p-1 font-bold  px-3 `}
            >
              <Text className="text-[#041633]  font-medium text-base">
                Withdraw
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={` flex absolute -z-10  top-1 items-center   justify-center bg-[#041633] p-1 font-bold  px-3`}
            >
              <Text className="text-[#041633] font-medium text-base">
                Withdraw
              </Text>
            </TouchableOpacity>
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
                <StyledText bold>Solomon Agum</StyledText>
                <Entypo name="star" size={18} color={"orange"} />
              </View>
              <View className="flex px-4 flex-row justify-between items-center w-full">
                <Text
                  className=" font-semibold"
                  style={{
                    color: activeColors.gray,
                  }}
                >
                  Ticket No: {id}
                </Text>
              </View>
            </View>
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
                    (256) 772 820 840
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
                    sagum@must.ac.ug
                  </Text>
                </View>
              </View>
              <View className="flex flex-row justify-between items-center px-4">
                <View className=" items-center space-x-2 flex flex-row">
                  <MapPinIcon size={15} strokeWidth={2} color={"gray"} />
                  <Text
                    className=" font-medium"
                    style={{
                      color: activeColors.gray,
                    }}
                  >
                    Admission (Office 6) - AR BLOCK
                  </Text>
                </View>
              </View>
            </View>
          </StyledView>
          <StyledView
            className="space-y-2   rounded-md border p-4  mt-4 w-full"
            style={{ borderColor: activeColors.primary }}
          >
            <Text
              className=" font-semibold  "
              style={{
                color: activeColors.tint,
              }}
            >
              Response - {id}
            </Text>
            <Text
              className=" font-normal  "
              style={{
                color: activeColors.gray,
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic{" "}
            </Text>
          </StyledView>
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
