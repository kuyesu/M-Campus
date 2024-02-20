import {
  Alert,
  Image,
  Keyboard,
  SafeAreaView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from "react";
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledView from "@/components/View/StyledView";
import { useSelector } from "react-redux";
import { Animated } from "react-native";
import StyledText from "@/components/Text/StyledText";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { RadixIcon } from "radix-ui-react-native-icons";
import { v4 as uuidv4 } from "uuid";
import { URIGCP } from "@/redux/URIGCP";
import axios from "axios";
import CustomMessage from "@/components/assistant/CustomMessage";
import { StyledLoading } from "@/components/loading/StyledLoading";
import Loader from "react-native-three-dots-loader";

export default function TabOneScreen() {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user, isAuthenticated, token } = useSelector(
    (state: any) => state.user
  );
  const [messages, setMessages] = useState([]);

  const [chat_id, setChat_id] = useState("");

  useEffect(() => {
    setChat_id(uuidv4());
  }, []);

  const [currentTab, setCurrentTab] = useState("Home");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  // For multiple Buttons...
  const TabButton = (currentTab, setCurrentTab, title) => {
    const { theme } = useContext(ThemeContext);
    // @ts-ignore
    let activeColors = colors[theme.mode];
    const { user, isAuthenticated } = useSelector((state: any) => state.user);
    return (
      <TouchableOpacity
        onPress={() => {
          setCurrentTab(title);
          Animated.timing(scaleValue, {
            toValue: showMenu ? 1 : 0.88,
            duration: 300,
            useNativeDriver: true,
          }).start();

          Animated.timing(offsetValue, {
            // YOur Random Value...
            toValue: showMenu ? 0 : 230,
            duration: 300,
            useNativeDriver: true,
          }).start();

          Animated.timing(closeButtonOffset, {
            // YOur Random Value...
            toValue: !showMenu ? -30 : 0,
            duration: 300,
            useNativeDriver: true,
          }).start();

          setShowMenu(!showMenu);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 10,
          backgroundColor:
            currentTab == title ? activeColors.primary : "transparent",

          borderRadius: 5,
          padding: 10,
          gap: 10,
          width: "55%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "flex-start",
            backgroundColor:
              currentTab == title ? activeColors.primary : "transparent",
            borderRadius: 5,
            gap: 10,
            width: "73%",
          }}
        >
          <MaterialCommunityIcons
            name={title == "Home" ? "white-balance-sunny" : "message-outline"}
            size={16}
            color={currentTab == title ? activeColors.tint : activeColors.tint}
          />

          <StyledText
            style={{
              color:
                currentTab == title ? activeColors.tint : activeColors.tint,
              // handle text overflow
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
            className="text-ellipsis text-center"
          >
            {title == "Home" ? "Mi New chat" : title}
          </StyledText>
          {currentTab == title && title != "Home" && (
            <MaterialCommunityIcons
              name="share-outline"
              onPress={() => {
                const onShare = async () => {
                  try {
                    const reversedData = messages.slice().reverse();
                    const texts = reversedData.map((obj) => obj.text);
                    const combinedText = texts.join("\n\n\n\n");
                    const result = await Share.share({
                      message: combinedText,
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
                  } catch (error: any) {
                    Alert.alert("Can not share message");
                  }
                };
                onShare();
              }}
              size={18}
              color={
                currentTab == title ? activeColors.tint : activeColors.tint
              }
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  ///////////////////////////////////
  // Chatbot
  ///////////////////////////////////
  const [chatFaceColor, setChatFaceColor] = useState();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const CHAT_BOT_FACE =
    "https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png";
  useEffect(() => {
    checkFaceId();
  }, []);

  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem("chatFaceId");

    // setChatFaceColor(ChatFaceData[id].primary);
    setMessages([
      // {
      //   _id: 1,
      //   text: "Hello, I am Mi" + ", How can I help you?",
      //   createdAt: new Date(),
      //   user: {
      //     _id: 2,
      //     name: "Mi assistant",
      //     avatar: CHAT_BOT_FACE,
      //   },
      // },
    ]);
  };

  const onSend = useCallback((messages = []) => {
    Keyboard.dismiss();
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, []);

  // Simulate user typing (you can replace this with actual typing logic)

  const getBardResp = async (user_prompt) => {
    setLoading(true);

    if (!user_prompt) return;
    setResult("");
    setLoading(true);

    var formdata = new FormData();
    formdata.append("prompt", user_prompt);

    await axios
      .post(
        `${URIGCP}/prompt_route`,
        { prompt: user_prompt },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response.data)
      .then((result) => {
        console.log("result", result);
        const { data } = result;
        setResult(data);
        if (result) {
          setLoading(false);
          const chatAIResp: any = {
            _id: Math.random() * (9999999 - 1),

            text: data,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "Mi assistant",
              avatar: CHAT_BOT_FACE,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, chatAIResp)
          );
        } else {
          setLoading(false);
          const chatAIResp: any = {
            _id: Math.random() * (9999999 - 1),
            text: "Sorry, I can not help with it",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "Mi assistant",
              avatar: CHAT_BOT_FACE,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, chatAIResp)
          );
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        return (
          <StyledText
            style={{
              color: activeColors.tint,
            }}
          >
            Sorry 🥺. Mi assistant is not available at the moment."
          </StyledText>
        );
      });
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: activeColors.primary,
            borderRadius: 0,
            marginLeft: 0,
            paddingLeft: 0,
            width: "100%",
            // borderBottomColor: activeColors.grayAccent,
            // borderBottomWidth: 1,
          },
          left: {
            backgroundColor: activeColors.secondary,
            borderRadius: 5,
            // marginLeft: -5,
            width: "100%",
            borderBottomColor: activeColors.grayAccent,
            borderBottomWidth: 1,
            // marginTop: 10,
          },
        }}
        textStyle={{
          right: {
            // fontSize:20,
            textAlign: "justify",
            color: activeColors.gray,
            padding: 2,
          },
          left: {
            color: activeColors.tint,
            // fontSize:20,
            padding: 2,
            textAlign: "justify",
          },
        }}
        renderUsernameOnMessage={true}
        // avatarStyle={{ display: "none" }}

        optionTitles={{
          copy: "copy",
          delete: "delete",
          forward: "forward",
          share: "share",
          edit: "edit",
          reply: "reply",
        }}
        // optionTintColor={activeColors.tint}
      />
    );
  };

  const renderInputToolbar = (props) => {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          // padding: 3,
          paddingLeft: 0,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          backgroundColor: activeColors.secondary,
          borderTopColor: activeColors.grayAccent,
          borderTopWidth: 1,
          gap: 10,
          height: 60,
          paddingRight: 10,
        }}
        textInputStyle={{
          color: activeColors.tint,
          fontSize: 16,
          padding: 5,
          backgroundColor: activeColors.secondary,
          // backgroundColor:
          //   theme.mode == "dark" ? "rgba(255, 255, 255, 0.1)" : "#fff",
          paddingHorizontal: 0,
          borderRadius: 25,
          borderColor: activeColors.grayAccent,
          // borderTopColor: "rgba(255, 255, 255, 0.3)",
          borderWidth: 0,
          // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          PaddingVertical: 10,
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send
        {...props}
        containerStyle={{
          borderWidth: 0,
          marginBottom: 5,
          marginLeft: 10,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          alignContent: "flex-end",
        }}
      >
        <View
          style={{
            borderColor: activeColors.grayAccent,
            borderWidth: 1,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            height: 35,
            width: 35,
            padding: 5,
            backgroundColor: activeColors.primary,
          }}
        >
          <MaterialCommunityIcons
            name="subdirectory-arrow-left"
            color={activeColors.tint}
            size={20}
          />
        </View>
      </Send>
    );
  };
  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: activeColors.primary,
        },
        styles.container,
      ]}
    >
      <View style={{ flex: 1, backgroundColor: activeColors.secondary }}>
        <View style={{ justifyContent: "flex-start", padding: 15 }}>
          <View style={{ flexGrow: 1 }}>
            {
              // Tab Bar Buttons....
            }
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: 10,
                borderColor: activeColors.grayAccent,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                gap: 10,
                width: "52%",
              }}
              onPress={() => {
                setCurrentTab("Home");

                Animated.timing(scaleValue, {
                  toValue: showMenu ? 1 : 0.88,
                  duration: 300,
                  useNativeDriver: true,
                }).start();

                Animated.timing(offsetValue, {
                  // YOur Random Value...
                  toValue: showMenu ? 0 : 230,
                  duration: 300,
                  useNativeDriver: true,
                }).start();

                Animated.timing(closeButtonOffset, {
                  // YOur Random Value...
                  toValue: !showMenu ? -30 : 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();

                setShowMenu(!showMenu);
              }}
            >
              <MaterialCommunityIcons
                name="plus"
                size={20}
                color={activeColors.tint}
              />
              <StyledText
                style={{
                  color: activeColors.tint,
                }}
              >
                New Question
              </StyledText>
            </TouchableOpacity>
            {TabButton(currentTab, setCurrentTab, "Home")}
            {TabButton(currentTab, setCurrentTab, chat_id)}
            {/* {TabButton(currentTab, setCurrentTab, "Search")}
            {TabButton(currentTab, setCurrentTab, "Notifications")}
            {TabButton(currentTab, setCurrentTab, "Settings")} */}
          </View>
        </View>

        {
          // Over lay View...
        }

        <Animated.View
          style={{
            flexGrow: 1,
            backgroundColor: activeColors.primary,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: showMenu ? 15 : 0,
            paddingVertical: showMenu ? 20 : 0,
            borderRadius: showMenu ? 15 : 0,
            borderColor: showMenu ? activeColors.grayAccent : "transparent",
            borderWidth: showMenu ? 1 : 0,
            // Transforming View...
            transform: [{ scale: scaleValue }, { translateX: offsetValue }],
          }}
        >
          {
            // Menu Button...
          }

          <Animated.View
            style={{
              flex: 1,
              transform: [
                {
                  translateY: closeButtonOffset,
                },
              ],
            }}
          >
            <View
              style={{
                // marginTop: showMenu ? 25 : 0,
                // backgroundColor: !showMenu
                //   ? activeColors.secondary
                //   : "transparent",
                padding: !showMenu ? 10 : 0,
                backgroundColor: !showMenu
                  ? theme.mode == "dark"
                    ? "rgba(31, 41, 55, 0.9)"
                    : "rgba(255, 255, 255, 0.8)"
                  : activeColors.primary,

                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
                position: "absolute",
                top: 0,
                width: "100%",
                zIndex: 999,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: showMenu ? 10 : 0,
                  borderRadius: showMenu ? 10 : 0,
                  alignItems: showMenu ? "center" : "center",
                  justifyContent: showMenu ? "space-between" : "space-between",
                  borderColor: showMenu
                    ? activeColors.grayAccent
                    : "transparent",
                  borderWidth: showMenu ? 1 : 0,
                  width: showMenu ? 50 : "100%",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: showMenu ? "center" : "center",
                    justifyContent: showMenu ? "center" : "space-between",
                  }}
                  onPress={() => {
                    // Do Actions Here....
                    // Scaling the view...
                    Animated.timing(scaleValue, {
                      toValue: showMenu ? 1 : 0.88,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();

                    Animated.timing(offsetValue, {
                      // YOur Random Value...
                      toValue: showMenu ? 0 : 230,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();

                    Animated.timing(closeButtonOffset, {
                      // YOur Random Value...
                      toValue: !showMenu ? -30 : 0,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();

                    setShowMenu(!showMenu);
                    closeButtonOffset.setValue(0);
                  }}
                >
                  {showMenu ? (
                    <MaterialCommunityIcons
                      name={showMenu ? "close" : "menu"}
                      size={showMenu ? 30 : 24}
                      color={activeColors.tint}
                    />
                  ) : (
                    <Feather
                      name="sidebar"
                      size={20}
                      color={activeColors.tint}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // Do Actions Here....
                    setCurrentTab("Home");
                  }}
                >
                  <StyledText
                    style={{
                      color: activeColors.gray,
                    }}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    className="text-ellipsis text-center"
                  >
                    {showMenu ? "" : "Mi Assistant - Mbarara University"}
                  </StyledText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // Do Actions Here....
                    setCurrentTab("Home");
                  }}
                >
                  {!showMenu && (
                    <MaterialCommunityIcons
                      name="plus"
                      size={20}
                      color={activeColors.tint}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {/* check if tab title is home */}

            {messages.length > 0 && currentTab != "Home" ? (
              <GiftedChat
                messages={messages}
                // isTyping={loading}
                // alwaysShowSend
                renderLoading={() => (
                  <View
                    style={{
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      padding: 10,
                      height: "100%",
                      // transform: [{ scaleY: -1 }],
                    }}
                  >
                    <StyledLoading />
                  </View>
                )}
                renderChatFooter={() => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      // borderColor: activeColors.grayAccent,
                      // borderWidth: 1,
                      borderRadius: 0,
                      padding: 5,
                      gap: 10,
                      width: "100%",
                    }}
                  >
                    {loading && (
                      <View
                        style={{
                          borderRadius: 5,
                          backgroundColor: activeColors.secondary,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center",
                          borderColor: activeColors.grayAccent,
                          borderWidth: 1,
                          marginVertical: 15,
                          padding: 10,
                          paddingVertical: 5,
                          gap: 8,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="stop-circle-outline"
                          size={18}
                          color={activeColors.tint}
                        />

                        <StyledText
                          style={{
                            fontFamily: "B",

                            color: activeColors.tint,
                          }}
                          small
                        >
                          Mi is typing <Loader />
                        </StyledText>
                      </View>
                    )}
                  </View>
                )}
                renderActions={(props) => (
                  <Actions
                    {...props}
                    containerStyle={{
                      position: "relative",
                      left: 0,
                      top: 3,
                      zIndex: 9999,
                      // backgroundColor: activeColors.secondary,
                      backgroundColor: activeColors.primary,
                      borderRadius: 50,
                      padding: 0,
                      height: 35,
                      width: 35,
                      marginRight: 0,
                      borderColor: activeColors.grayAccent,
                      borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPressActionButton={() => {
                      setCurrentTab("Home");
                    }}
                    icon={() => (
                      <MaterialCommunityIcons
                        name="plus"
                        size={20}
                        color={activeColors.tint}
                      />
                    )}
                  />
                )}
                showUserAvatar
                showAvatarForEveryMessage
                renderAvatar={(props) => {
                  const { currentMessage } = props;
                  if (currentMessage.user._id === 2) {
                    // This is the current user's message

                    return (
                      <StyledView
                        style={{
                          backgroundColor: activeColors.secondary,
                          borderRadius: 5,
                          padding: 5,
                          marginRight: 5,
                          width: 30,
                          height: 30,
                          justifyContent: "center",
                          alignItems: "center",
                          borderColor: activeColors.grayAccent,
                          borderWidth: 1,
                        }}
                      >
                        <Image
                          source={require("@/assets/chats/bot.png")}
                          // source={require("@/assets/images/must.png")}
                          className="h-7 w-7 "
                          // style={{
                          //   width: 26,
                          //   height: 26,
                          // }}
                        />
                      </StyledView>
                    );
                  } else {
                    return (
                      <StyledView
                        style={{
                          backgroundColor: activeColors.secondary,
                          borderRadius: 5,
                          padding: 5,
                          marginRight: 5,
                          width: 30,
                          height: 30,
                          justifyContent: "center",
                          alignItems: "center",
                          borderColor: activeColors.grayAccent,
                          borderWidth: 1,
                        }}
                      >
                        <Image
                          source={{ uri: user?.avatar?.url }}
                          style={{
                            borderRadius: 5,
                            // borderColor: activeColors.gray2,
                            // borderWidth: 2,
                            width: 26,
                            height: 26,
                          }}
                        />
                      </StyledView>
                    );
                  }
                }}
                keyboardShouldPersistTaps="never"
                onSend={(messages) => onSend(messages)}
                // renderBubble={renderBubble}
                renderMessage={(props) => <CustomMessage {...props} />}
                renderInputToolbar={renderInputToolbar}
                renderSend={renderSend}
                placeholder="Ask for anything at Mbarara University..."
                renderAvatarOnTop
              />
            ) : (
              <GiftedChat
                messages={messages}
                // alwaysShowSend
                renderLoading={() => (
                  <View
                    style={{
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      padding: 10,
                      height: "100%",
                      transform: [{ scaleY: -1 }],
                    }}
                  >
                    <StyledLoading />
                  </View>
                )}
                // inverted={false}
                renderChatEmpty={() => (
                  <View
                    style={{
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      padding: 10,
                      height: "100%",
                      transform: [
                        { scaleY: -1 },
                        {
                          scaleX: -1,
                        },
                      ],
                    }}
                  >
                    <StyledText
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",

                        paddingTop: 20,
                      }}
                    >
                      {/* <Feather name="sun" size={24} color={activeColors.tint} /> */}
                      <MaterialCommunityIcons
                        name="white-balance-sunny"
                        size={30}
                        color={activeColors.tint}
                      />
                    </StyledText>
                    <View
                      style={{
                        marginTop: 40,
                      }}
                    >
                      <StyledText
                        style={{
                          fontWeight: "bold",
                          color: activeColors.tint,
                        }}
                        bold
                      >
                        Try asking question:
                      </StyledText>
                    </View>
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          onSend([
                            {
                              _id: Math.random() * (9999999 - 1),
                              text: "I want to generate a payment reference number for tuition fee",
                              createdAt: new Date(),
                              user: {
                                _id: 1,
                                name: "User",
                                avatar: user?.avatar?.url,
                              },
                            },
                          ]);
                        }}
                        style={{
                          backgroundColor: activeColors.peimary,
                          borderRadius: 5,
                          padding: 5,
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                          marginTop: 10,
                          width: "100%",
                          borderColor: activeColors.grayAccent,
                          borderWidth: 1,
                        }}
                      >
                        <StyledText
                          style={{
                            color: activeColors.tint,
                          }}
                          bold
                        >
                          Generate a payment reference number:
                        </StyledText>
                        <StyledText
                          style={{
                            color: activeColors.gray,
                          }}
                          small
                        >
                          Example: I want to generate a payment reference number
                          for tuition fee
                        </StyledText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          onSend([
                            {
                              _id: Math.random() * (9999999 - 1),
                              text: "What happens if I fail an exam or a course?",
                              createdAt: new Date(),
                              user: {
                                _id: 1,
                                name: "User",
                                avatar: user?.avatar?.url,
                              },
                            },
                          ]);
                        }}
                        style={{
                          backgroundColor: activeColors.peimary,
                          borderRadius: 5,
                          padding: 5,
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                          marginTop: 10,
                          width: "100%",
                          borderColor: activeColors.grayAccent,
                          borderWidth: 1,
                        }}
                      >
                        <StyledText
                          style={{
                            color: activeColors.tint,
                          }}
                          bold
                        >
                          Examination Regulations:
                        </StyledText>
                        <StyledText
                          style={{
                            color: activeColors.gray,
                          }}
                          small
                        >
                          Example: What happens if I fail an exam or a course?
                        </StyledText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          onSend([
                            {
                              _id: Math.random() * (9999999 - 1),
                              text: "What programs are offered at Mbarara university",
                              createdAt: new Date(),
                              user: {
                                _id: 1,
                                name: "User",
                                avatar: user?.avatar?.url,
                              },
                            },
                          ]);
                        }}
                        style={{
                          backgroundColor: activeColors.peimary,
                          borderRadius: 5,
                          padding: 5,
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                          marginTop: 10,
                          width: "100%",
                          borderColor: activeColors.grayAccent,
                          borderWidth: 1,
                        }}
                      >
                        <StyledText
                          style={{
                            color: activeColors.tint,
                          }}
                          bold
                        >
                          Programs offered in the university:
                        </StyledText>
                        <StyledText
                          style={{
                            color: activeColors.gray,
                          }}
                          small
                        >
                          Example: What programs are offered in the university?
                        </StyledText>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyboardShouldPersistTaps="never"
                renderChatFooter={() => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      marginBottom: 10,
                      // borderColor: activeColors.grayAccent,
                      // borderWidth: 1,
                      borderRadius: 0,
                      padding: 5,
                      gap: 10,
                      width: "100%",
                    }}
                  >
                    {loading && (
                      <View
                        style={{
                          borderRadius: 5,
                          backgroundColor: activeColors.secondary,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center",
                          borderColor: activeColors.grayAccent,
                          borderWidth: 1,
                          marginVertical: 15,
                          padding: 10,
                          paddingVertical: 5,
                          gap: 8,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="stop-circle-outline"
                          size={18}
                          color={activeColors.tint}
                        />

                        <StyledText
                          style={{
                            fontFamily: "B",

                            color: activeColors.tint,
                          }}
                          small
                        >
                          Mi is typing <Loader />
                        </StyledText>
                      </View>
                    )}
                  </View>
                )}
                renderActions={(props) => (
                  <Actions
                    {...props}
                    containerStyle={{
                      position: "relative",
                      left: 0,
                      top: 3,
                      zIndex: 9999,
                      // backgroundColor: activeColors.secondary,
                      backgroundColor: activeColors.primary,
                      borderRadius: 50,
                      padding: 0,
                      height: 35,
                      width: 35,
                      marginRight: 0,
                      borderColor: activeColors.grayAccent,
                      borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPressActionButton={() => {
                      setCurrentTab("Home");
                    }}
                    icon={() => (
                      <MaterialCommunityIcons
                        name="plus"
                        size={20}
                        color={activeColors.tint}
                      />
                    )}
                  />
                )}
                showUserAvatar
                showAvatarForEveryMessage
                renderAvatar={(props) => {
                  const { currentMessage } = props;
                  if (currentMessage.user._id === 2) {
                    // This is the current user's message

                    return (
                      <StyledView
                        style={{
                          backgroundColor: activeColors.secondary,
                          borderRadius: 5,
                          padding: 5,
                          marginRight: 5,
                          width: 30,
                          height: 30,
                          justifyContent: "center",
                          alignItems: "center",
                          borderColor: activeColors.grayAccent,
                          borderWidth: 1,
                        }}
                      >
                        <Image
                          source={require("@/assets/chats/bot.png")}
                          // source={require("@/assets/images/must.png")}
                          className="h-7 w-7 "
                          // style={{
                          //   width: 26,
                          //   height: 26,
                          // }}
                        />
                      </StyledView>
                    );
                  } else {
                    return (
                      <StyledView
                        style={{
                          backgroundColor: activeColors.secondary,
                          borderRadius: 5,
                          padding: 5,
                          marginRight: 5,
                          width: 30,
                          height: 30,
                          justifyContent: "center",
                          alignItems: "center",
                          borderColor: activeColors.grayAccent,
                          borderWidth: 1,
                        }}
                      >
                        <Image
                          source={{ uri: user?.avatar?.url }}
                          style={{
                            borderRadius: 5,
                            // borderColor: activeColors.gray2,
                            // borderWidth: 2,
                            width: 26,
                            height: 26,
                          }}
                        />
                      </StyledView>
                    );
                  }
                }}
                onSend={(messages) => onSend(messages)}
                // renderBubble={renderBubble}
                renderMessage={(props) => <CustomMessage {...props} />}
                renderInputToolbar={renderInputToolbar}
                renderSend={renderSend}
                placeholder="Ask for anything at Mbarara University..."
                renderAvatarOnTop
              />
            )}
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#5359D1',
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
