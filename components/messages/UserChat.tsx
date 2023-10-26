import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { URI } from "@/redux/URI";
import { getTimeDurationLong } from "@/common/TimeGenerator";
import StyledText from "../Text/StyledText";

const UserChat = ({ item }) => {
  const { user, token } = useSelector((state: any) => state.user);
  const [messages, setMessages] = useState([]);
  const userId = user._id;

  const router = useRouter();
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${URI}/messages/${userId}/${item._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.log("error showing messags", response.status);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  console.log(messages);

  const getLastMessage = () => {
    const userMessages = messages.filter(
      (message) => message.messageType === "text"
    );

    const n = userMessages.length;

    return userMessages[n - 1];
  };
  const lastMessage = getLastMessage();
  console.log(lastMessage);
  // const formatTime = (time) => {
  //   const options = { hour: "numeric", minute: "numeric" };
  //   return new Date(time).toLocaleString("en-US", options);
  // };
  return (
    <Pressable
      onPress={() =>
        router.replace({
          pathname: `/messages/${item._id}`,
          params: { recepientId: item._id },
        })
      }
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        // borderWidth: 0.7,
        // borderColor: "#D0D0D0",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 15,
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: item?.avatar?.url }}
        />

        <View style={{ flex: 1 }}>
          <View className=" justify-between flex-row">
            <StyledText style={{ fontSize: 15, fontWeight: "500" }}>
              {item?.name}
            </StyledText>
            <StyledText
              style={{ fontSize: 11, fontWeight: "400", color: "gray" }}
            >
              {lastMessage && getTimeDurationLong(lastMessage?.timeStamp)}
            </StyledText>
          </View>

          {lastMessage && (
            <Text
              className=" text-ellipsis truncate"
              style={{
                marginTop: 3,
                color: "gray",
                fontWeight: "500",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              numberOfLines={1}
            >
              {lastMessage?.message}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
