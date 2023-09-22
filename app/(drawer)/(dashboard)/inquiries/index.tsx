import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useContext, useRef, useState } from "react";
import TimelineComponent from "@/components/chat/itmeline";

import {
  ChatBubbleLeftIcon,
  ClipboardDocumentCheckIcon,
  CogIcon,
  CursorArrowRaysIcon,
  DocumentCheckIcon,
  ListBulletIcon,
  PresentationChartLineIcon,
  Square2StackIcon,
  TicketIcon,
  ViewColumnsIcon,
} from "react-native-heroicons/outline";
import { Link, router } from "expo-router";
import TicketListingScreen from "@/components/ticket";
import InsightUser from "@/components/insights";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import MainContainer from "@/components/container/MainContainer";
import StyledView from "@/components/View/StyledView";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function index() {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const tabs = [
    {
      name: "Iquiries",
      icon: (
        <MaterialCommunityIcons
          name="sort-variant"
          color={"#041633"}
          size={20}
        />
      ),
    },
    {
      name: "Tickets",
      icon: (
        <MaterialCommunityIcons
          name="ticket-outline"
          color={"#041633"}
          size={20}
        />
      ),
    },
    {
      name: "Insight",
      icon: (
        <MaterialCommunityIcons
          name="trending-up"
          color={"#041633"}
          size={20}
        />
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => {
      return (
        <Pressable
          onPress={() => handleTabPress(index)}
          className=" items-center "
        >
          <View
            key={index}
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,

              elevation: 1,
              borderColor:
                activeTab === index
                  ? activeColors.secondary
                  : activeColors.secondary,
              borderWidth: 1,
              // borderBottomWidth: activeTab === index ? 4 : 1,
              paddingHorizontal: 15,
              paddingVertical: 6,
              // borderRadius: 5,
              marginVertical: 10,
              marginTop: 20,
              // alignItems: "center",
              backgroundColor:
                activeTab === index
                  ? activeColors.accent
                  : activeColors.secondary,
            }}
            className="flex justify-start items-center flex-row space-x-1 pr-3 rounded-3xl  "
          >
            {tab.icon}

            <Text
              style={{
                color: activeTab === index ? "#041633" : "#717680",
                fontWeight: "600",
                fontSize: 14,
              }}
              // className=" font-semibold"
            >
              {tab.name}
            </Text>
          </View>
        </Pressable>
      );
    });
  };

  // tab content for recent inquiries, asnwered pending AND AI
  const data = [
    {
      date: "June 20, 2023",
      tickets: [
        {
          title: "Missing Marks",
          status: "answered",
          ai: true,
          time: "10:00AM",
          aiResponse: "This is a response from AI",
        },
        {
          title: "Payment",
          status: "unanswered",
          ai: false,
          time: "11:00AM",
          aiResponse: "This is a response from AI",
        },
        {
          title: "Login credential",
          status: "pending",
          ai: true,
          time: "04:00PM",
          aiResponse: "This is a response from AI",
        },
      ],
    },
    {
      date: "2023-07-11",
      tickets: [
        {
          title: "Lesson",
          status: "answered",
          ai: true,
          time: "10:00AM",
          aiResponse: "This is a response from AI",
        },
      ],
    },
    {
      date: "2023-07-11",
      tickets: [
        { title: "Lecture room", status: "pending" },
        {
          title: "Map around",
          status: "unanswered",
          ai: true,
          time: "10:00AM",
          aiResponse: "This is a response from AI",
        },
      ],
    },
    // Add more dates and tickets as needed
  ];
  const renderTabContent = () => {
    return (
      <View>
        {activeTab === 0 && (
          <StyledView
            className="rounded-md  w-full"
            style={{ backgroundColor: activeColors.primary }}
          >
            <TimelineComponent data={data} />
          </StyledView>
        )}
        {activeTab === 1 && (
          <StyledView
            style={{
              flex: 1,
              // paddingTop: 50,
              backgroundColor: "#FFFFFF",
            }}
          >
            <TicketListingScreen />
          </StyledView>
        )}
        {activeTab === 2 && (
          <ScrollView
            style={{
              flex: 1,
              // paddingTop: 50,
              backgroundColor: "#FFFFFF",
            }}
            showsVerticalScrollIndicator={false}
            bounces
          >
            <InsightUser />
          </ScrollView>
        )}
      </View>
    );
  };

  return (
    <MainContainer style={{ paddingHorizontal: 20 }}>
      {/* tabs for recent inquiries, asnwered pending AND AI */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // paddingHorizontal: 8,
          // backgroundColor: "white"
        }}
        // className="w-full"
      >
        {renderTabs()}
      </View>
      <Pressable
        onPress={() => router.push("/assistant")}
        style={[
          style.footer,
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
              <View
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
              </View>

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
      </Pressable>
      <View
        style={{
          flex: 1,
        }}
      >
        {renderTabContent()}
      </View>
    </MainContainer>
  );
}

const style = StyleSheet.create({
  footer: {
    height: 70,
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
