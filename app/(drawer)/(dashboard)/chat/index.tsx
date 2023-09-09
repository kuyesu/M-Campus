import { SafeAreaView, StyleSheet, View } from "react-native";
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
import ChatApi from "@/api/ChatApi";

export default function TabOneScreen() {

  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];


  const [messages, setMessages] = useState([]);
  const [chatFaceColor, setChatFaceColor] = useState();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    checkFaceId();
  }, []);

  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem("chatFaceId");

    // setChatFaceColor(ChatFaceData[id].primary);
    setMessages([
      {
        _id: 1,
        text: "Hello, I am "  + ", How Can I help you?",
        createdAt: new Date(),
        user: {
          _id: 2,
          // name: "React Native",
          // avatar: CHAT_BOT_FACE,
        },
      },
    ]);
  };





  const getBardResp = async (msg) => {
    setLoading(true);

      if (!msg) return;
      setResult("");
      setLoading(true);
      try {
        const result = await fetch("http://192.168.137.114:3000/api/read", {
          method: "POST",
          body: JSON.stringify(msg),
        });
        const json = await result.json();
        console.log("Got Thsi: ", json);
        const data = json.data;
        setResult(data);
        console.log("result: ", data);
        if (json.data) {
           setLoading(false);
           const chatAIResp: any = {
             _id: Math.random() * (9999999 - 1),

             text: data,
             createdAt: new Date(),
             user: {
               _id: 2,
              //  name: "Mi Campus",
              //  avatar: "https://placeimg.com/140/140/any",
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
              // name: "Mi Campus",
              // avatar: CHAT_BOT_FACE,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, chatAIResp)
          );
        }

        setLoading(false);
      } catch (err) {
        console.log("err:", err);
        setLoading(false);
      }

  };


    const onSend = useCallback((messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      if (messages[0].text) {
        getBardResp(messages[0].text);
      }
    }, []);


  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: activeColors.secondary,
            borderRadius: 0,
            marginLeft: 0,
          },
          left: {
            backgroundColor: activeColors.secondary,
            borderRadius: 0,
            marginLeft: 0,
          },
        }}
        textStyle={{
          right: {
            // fontSize:20,
            padding: 2,
          },
          left: {
            color: activeColors.tint,
            // fontSize:20,
            padding: 2,
          },
        }}

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
          <StyledText style={{ color: activeColors.tint }}>Send</StyledText>
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
          // multiline={true}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}

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
