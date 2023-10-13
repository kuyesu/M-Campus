import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import TimelineComponent from "@/components/chat/itmeline";

import TicketListingScreen from "@/components/ticket";
import InsightUser from "@/components/insights";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import MainContainer from "@/components/container/MainContainer";
import StyledView from "@/components/View/StyledView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SubmitButton from "@/components/ticket/submitButton";
import { useDispatch, useSelector } from "react-redux";

export default function index() {
  const { tickets, isLoadingTicket } = useSelector(
    (state: any) => state.ticket
  );
  const [data, setData] = useState([]);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  useEffect(() => {
    if (tickets && user) {
      const myPosts = tickets.filter(
        (tcikect: any) => tcikect.user._id === user._id
      );
      setData(myPosts);
    }
  }, [tickets, user]);
  const tabs = [
    {
      name: "Mi Inquiries",
      icon: (
        <MaterialCommunityIcons
          name="sort-variant"
          color={activeColors.tint}
          // check if is active

          size={20}
        />
      ),
    },
    {
      name: "Replies",
      icon: (
        <MaterialCommunityIcons
          name="ticket-outline"
          color={activeColors.tint}
          size={20}
        />
      ),
    },
    {
      name: "Insight",
      icon: (
        <MaterialCommunityIcons
          name="trending-up"
          color={activeColors.tint}
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
              // shadowColor: "#000",
              // shadowOffset: {
              //   width: 0,
              //   height: 1,
              // },
              // shadowOpacity: 0.18,
              // shadowRadius: 1.0,

              // elevation: 1,
              // borderBottomColor:
              //   activeTab === index
              //     ? activeColors.secondary
              //     : activeColors.secondary,
              // borderBottomWidth: 1,
              // borderBottomWidth: activeTab === index ? 2 : 1,
              paddingHorizontal: 15,
              paddingVertical: 6,
              // borderRadius: 5,
              marginVertical: 10,

              marginTop: 20,
              // alignItems: "center",
              backgroundColor:
                activeTab === index
                  ? activeColors.primary
                  : activeColors.primary,
            }}
            className="flex justify-start items-center flex-row space-x-1 pr-3 rounded-3xl  "
          >
            {activeTab === index ? (
              <>
                {tab.name === "Mi Inquiries" && (
                  <MaterialCommunityIcons
                    name="content-duplicate"
                    size={20}
                    color={activeColors.accent}
                  />
                )}
                {tab.name === "Replies" && (
                  <MaterialCommunityIcons
                    name="source-commit"
                    size={20}
                    color={activeColors.accent}
                  />
                )}
                {tab.name === "Insight" && (
                  <MaterialCommunityIcons
                    name="google-analytics"
                    size={20}
                    color={activeColors.accent}
                  />
                )}
              </>
            ) : (
              <>
                {tab.name === "Mi Inquiries" && (
                  <MaterialCommunityIcons
                    name="content-duplicate"
                    size={20}
                    color={activeColors.tint}
                  />
                )}
                {tab.name === "Replies" && (
                  <MaterialCommunityIcons
                    name="source-commit"
                    size={20}
                    color={activeColors.tint}
                  />
                )}
                {tab.name === "Insight" && (
                  <MaterialCommunityIcons
                    name="google-analytics"
                    size={20}
                    color={activeColors.tint}
                  />
                )}
              </>
            )}

            <Text
              style={{
                color:
                  activeTab === index ? activeColors.accent : activeColors.tint,
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

  const renderTabContent = () => {
    return (
      <View>
        {activeTab === 0 && (
          <StyledView
            className="  w-full"
            style={{ backgroundColor: activeColors.primary, borderRadius: 5 }}
          >
            <TicketListingScreen />
          </StyledView>
        )}
        {activeTab === 1 && (
          <StyledView
            style={{
              flex: 1,
              // paddingTop: 50,
              backgroundColor: activeColors.primary,
              borderRadius: 5,
            }}
          >
            <TimelineComponent data={data} />
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
          borderBottomColor: activeColors.grayAccent,
          borderBottomWidth: 2,
          marginBottom: 10,
          // paddingHorizontal: 8,
          // backgroundColor: "white"
        }}
        // className="w-full"
      >
        {renderTabs()}
      </View>
      <SubmitButton />
      {/* tab content for recent inquiries, asnwered pending AND AI */}
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
