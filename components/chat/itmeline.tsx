import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import StyledText from "../Text/StyledText";
import { router } from "expo-router";

const TimelineItem = ({ date, tickets, ticketId, ...props }: any) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.push(`/inquiries/${ticketId}`);
      }}
    >
      <View className=" items-center space-x-2 flex flex-row ">
        <TouchableOpacity
          // onPress={handlePresentModal}
          // style={{
          //   borderBottomColor: activeColors.accent,
          // }}
          className={` flex relative  items-center   justify-center  py-2 font-bold`}
        >
          <StyledText bold>{date}</StyledText>
        </TouchableOpacity>
      </View>

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
              ticket.status === "answered" && styles.ticketAnswered,
              ticket.status === "pending" && styles.ticketPending,
              ticket.status === "unanswered" && styles.ticketUnanswered,
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
                <StyledText
                  style={{ color: activeColors.tint }}
                  className="font-semibold text-base"
                >
                  {ticket.title}
                </StyledText>
                <View className=" relative ">
                  <Text
                    style={{
                      color:
                        ticket.status === "answered"
                          ? "#6a6fc5"
                          : ticket.status === "unanswered"
                          ? "#D32F2F"
                          : "#F9A825",
                    }}
                    className=" font-semibold"
                  >
                    {ticket.time}
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
                  {ticket.aiResponse}
                </Text>
              </View>
              <View className="flex   flex-row justify-between w-full items-center ">
                <Text
                  style={{
                    color:
                      ticket.status === "answered"
                        ? "#6a6fc5"
                        : ticket.status === "unanswered"
                        ? "#D32F2F"
                        : "#F9A825",
                  }}
                  className=" font-semibold "
                >
                  AI: {ticket.ai ? "True" : "False"}
                </Text>
                {ticket.ai ? (
                  <Image
                    source={require("@/assets/chats/bot.gif")}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <Image
                    source={require("@/assets/avatar/1.jpeg")}
                    className="h-10 w-10 rounded-full"
                  />
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const Timeline = ({ data }: any) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces>
      <View style={styles.timelineContainer}>
        {data.map((item: any, index: any) => (
          <TimelineItem
            key={index}
            date={item.date}
            tickets={item.tickets}
            ticketId={item.id}
          />
        ))}
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
