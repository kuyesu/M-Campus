import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

// components
import MainContainer from "@/components/container/MainContainer";
import StyledText from "@/components/Text/StyledText";

import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledView from "@/components/View/StyledView";
import { RadixIcon } from "radix-ui-react-native-icons";
import axios from "axios";
import fetch from "isomorphic-fetch";
import { useSelector } from "react-redux";

export default function TabOneScreen() {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user, isAuthenticated } = useSelector((state: any) => state.user);
  const [messages, setMessages] = useState([]);
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
      {
        _id: 1,
        text: "Hello, I am Mi" + ", How can I help you?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Mi assistant",
          avatar: CHAT_BOT_FACE,
        },
      },
    ]);
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, []);

  // Simulate user typing (you can replace this with actual typing logic)
  const startTyping = () => {
    setIsTyping(true);
  };

  // Simulate user stopping typing
  const stopTyping = () => {
    setIsTyping(false);
  };

  function TypingIndicator() {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <StyledText style={{ color: activeColors.tint }}>
          Mi is typing
        </StyledText>
        <StyledView
          style={{
            backgroundColor: activeColors.accent,
            borderRadius: 10,
            padding: 5,
            marginLeft: 5,
          }}
        >
          <RadixIcon name="pencil" size={16} color={activeColors.tint} />
        </StyledView>
      </View>
    );
  }
  const getBardResp = async (user_prompt) => {
    setLoading(true);

    if (!user_prompt) return;
    setResult("");
    setLoading(true);

    var formdata = new FormData();
    formdata.append("user_prompt", user_prompt);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    await fetch(
      "https://snipe-pumped-heron.ngrok-free.app/api/prompt_route",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("++======================: ", result);
        const { Answer } = result;
        setResult(Answer);
        console.log("result: ", Answer);
        if (result) {
          setLoading(false);
          const chatAIResp: any = {
            _id: Math.random() * (9999999 - 1),

            text: Answer,
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
      .catch((error) => console.log("error", error));
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
            width: "97%",
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
        inverted={true}
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
          padding: 3,

          backgroundColor: activeColors.secondary,
          color: activeColors.tint,
        }}
        textInputStyle={{ color: activeColors.tint }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View
          style={{
            marginRight: 10,
            marginBottom: 5,
            padding: 7,
            paddingHorizontal: 15,
            backgroundColor: activeColors.accent,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <StyledText style={{ color: activeColors.secondary }}>
            Send
          </StyledText>
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
      <View style={{ flex: 1, backgroundColor: activeColors.primary }}>
        <GiftedChat
          messages={messages}
          isTyping={loading}
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
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: activeColors.gray2,
                    borderWidth: 1,
                  }}
                >
                  <Image
                    source={require("@/assets/chats/bot.png")}
                    className="h-10 w-10 "
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
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: activeColors.gray2,
                    borderWidth: 1,
                  }}
                >
                  <Image
                    source={{ uri: user?.avatar?.url }}
                    className="h-8 w-8 "
                  />
                </StyledView>
              );
            }
          }}
          onSend={(messages) => onSend(messages)}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
          placeholder="Ask anything..."
          renderAvatarOnTop
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
