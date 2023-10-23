import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import TimelineComponent from "@/components/chat/itmeline";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import MainContainer from "@/components/container/MainContainer";
import StyledView from "@/components/View/StyledView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SubmitButton from "@/components/ticket/submitButton";
import { useDispatch, useSelector } from "react-redux";
import StyledText from "@/components/Text/StyledText";
import RNAnimated from "react-native-animated-component";
import RNPoll, { IChoice } from "react-native-poll";
import { useRouter } from "expo-router";

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

  // poll choices
  const choices: Array<IChoice> = [
    { id: 1, choice: "Yes", votes: 12 },
    { id: 2, choice: "No", votes: 1 },
    { id: 3, choice: "Nuetral", votes: 3 },
  ];
  //////////

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
      name: "Active Polls",
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
      name: "Outcome",
      icon: (
        <MaterialCommunityIcons
          name="poll"
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
                {tab.name === "Active Polls" && (
                  <MaterialCommunityIcons
                    name="poll"
                    size={20}
                    color={activeColors.accent}
                  />
                )}

                {tab.name === "Outcome" && (
                  <MaterialCommunityIcons
                    name="progress-check"
                    size={20}
                    color={activeColors.accent}
                  />
                )}
              </>
            ) : (
              <>
                {tab.name === "Active Polls" && (
                  <MaterialCommunityIcons
                    name="poll"
                    size={20}
                    color={activeColors.tint}
                  />
                )}

                {tab.name === "Outcome" && (
                  <MaterialCommunityIcons
                    name="progress-check"
                    size={20}
                    color={activeColors.tint}
                  />
                )}
              </>
            )}

            <StyledText
              style={{
                color:
                  activeTab === index ? activeColors.accent : activeColors.tint,
                fontWeight: "600",
                fontSize: 14,
              }}
              // className=" font-semibold"
            >
              {tab.name}
            </StyledText>
          </View>
        </Pressable>
      );
    });
  };

  // tab content for recent inquiries, asnwered pending AND AI
  const router = useRouter();
  const renderTabContent = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: activeColors.primary,
        }}
      >
        {activeTab === 0 && (
          <StyledView
            className="h-full  w-full "
            style={{
              backgroundColor: activeColors.primary,
              borderRadius: 5,
              flex: 1,
            }}
          >
            <RNPoll
              totalVotes={30}
              choices={choices}
              onChoicePress={(selectedChoice: IChoice) =>
                console.log("SelectedChoice: ", selectedChoice)
              }
              text={"Which brand do you prefer?"}
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
              style={{
                backgroundColor: activeColors.primary,
                borderRadius: 5,
                borderColor: activeColors.grayAccent,
                borderWidth: 1,
                padding: 10,
                paddingTop: 10,
              }}
              choiceTextStyle={{
                color: activeColors.tint,
                fontSize: 14,
                fontWeight: "600",
              }}
              percentageTextStyle={{
                color: activeColors.tint,
                fontSize: 14,
                fontWeight: "600",
              }}
              pollId={0}
              percentage={100}
              PollContainer={RNAnimated}
              PollItemContainer={RNAnimated}
            />
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
      </View>
    );
  };

  return (
    <MainContainer style={{ paddingHorizontal: 20, flex: 1 }}>
      {/* tabs for recent inquiries, asnwered pending AND AI */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          // borderBottomColor: activeColors.grayAccent,
          // borderBottomWidth: 1,
          marginBottom: 10,
          // paddingHorizontal: 8,
          // backgroundColor: "white"
        }}
        // className="w-full"
      >
        {renderTabs()}
      </View>
      <Pressable
        onPress={() => router.push("/post/create-poll/")}
        style={[
          {
            height: 70,
            borderRadius: 5,
            paddingHorizontal: 10,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          },
          {
            backgroundColor: activeColors.secondary,
            borderColor: activeColors.grayAccent,
            borderRadius: 5,
            borderWidth: 1,
          },
        ]}
      >
        <View className="flex">
          <View className="flex relative w-full flex-col space-x-3  ">
            <View>
              <View
                className={` flex  right-0.5 items-center  w-full justify-center  p-2.5 font-bold rounded-full  `}
                style={{}}
              >
                <StyledText className=" underline">
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={25}
                    color={
                      theme.mode === "dark"
                        ? activeColors.accent
                        : activeColors.tint
                    }
                  />
                </StyledText>
              </View>
            </View>
          </View>
        </View>
        <View>
          <StyledText>Create a New Poll</StyledText>
          <StyledText
            style={{
              fontSize: 12,
            }}
          >
            Mi poll is a great way to get feedback frm students
          </StyledText>
        </View>
      </Pressable>
      {/* tab content for recent inquiries, asnwered pending AND AI */}
      <View
        style={{
          flex: 1,
          backgroundColor: activeColors.primary,
        }}
      >
        {renderTabContent()}
      </View>
    </MainContainer>
  );
}
