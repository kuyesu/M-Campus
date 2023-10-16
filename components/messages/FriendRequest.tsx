import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import StyledText from "../Text/StyledText";
import { TextInput } from "react-native";

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user, token } = useSelector((state: any) => state.user);
  const userId = user._id;
  const navigation = useNavigation();
  const router = useRouter();
  const acceptRequest = async (friendRequestId) => {
    try {
      const response = await fetch(
        "http://localhost:8000/friend-request/accept",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: friendRequestId,
            recepientId: userId,
          }),
        }
      );

      if (response.ok) {
        setFriendRequests(
          friendRequests.filter((request) => request._id !== friendRequestId)
        );
        router.push({
          pathname: `/messages/${userId}`,
          params: {
            id: userId,
          },
        });
        // navigation.navigate("Chats");
      }
    } catch (err) {
      console.log("error acceptin the friend request", err);
    }
  };
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: item.image }}
      />

      <StyledText style={{ marginLeft: 10, flex: 1 }}>
        {item?.name} sent you a friend request!!
      </StyledText>

      <Pressable
        onPress={() => acceptRequest(item._id)}
        style={{
          backgroundColor: activeColors.accent,
          padding: 10,
          borderRadius: 10,
          borderColor: activeColors.accent,
          borderWidth: 1,
        }}
      >
        <StyledText
          style={{
            textAlign: "center",
            color:
              theme.mode === "dark"
                ? activeColors.secondary
                : activeColors.tint,
          }}
        >
          Accept
        </StyledText>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});
