import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import StyledText from "../Text/StyledText";
import { TextInput } from "react-native";
import axios from "axios";
import { URI } from "@/redux/URI";
import { getAllUsers } from "@/redux/actions/userAction";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user, token, users } = useSelector((state: any) => state.user);
  const userId = user._id;
  const navigation = useNavigation();
  const router = useRouter();
  const userWhoSentRequest = users.find((i) => i._id === item._id);
  const senderId = item._id;
  const recepientId = userId;
  const acceptRequest = async () => {
    try {
      await axios
        .post(
          `${URI}/friend-request/accept`,
          { senderId, recepientId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setFriendRequests(
              friendRequests.filter((request) => request._id !== item._id)
            );
            // router.replace(`"Chats"`);
          }
        })
        .catch((err) => {
          console.log("error accepting the friend request", err);
        });

      console.log(senderId, recepientId);
      // const response = await fetch(`${URI}/friend-request/accept`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     senderId,
      //     recepientId,
      //   }),
      // });

      // if (response.ok) {
      //   setFriendRequests(
      //     friendRequests.filter((request) => request._id !== item._id)
      //   );
      // navigation.navigate("Chats");
      // }
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
        source={{ uri: userWhoSentRequest?.avatar?.url }}
      />

      <View>
        <StyledText style={{ marginLeft: 10, flex: 1 }}>
          {item?.name}
        </StyledText>
        <StyledText style={{ marginLeft: 10, flex: 1 }}>
          sent you a friend request!!
        </StyledText>
      </View>

      <Pressable
        className=" items-center justify-end flex-row ml-2"
        onPress={acceptRequest}
        style={{}}
      >
        <StyledText
          style={{
            textAlign: "center",

            color:
              theme.mode === "dark" ? activeColors.accent : activeColors.accent,
          }}
          bold
          className=" underline"
        >
          Accept
        </StyledText>
        <MaterialCommunityIcons
          name="account-plus-outline"
          size={24}
          style={{ marginLeft: 5 }}
          color={
            theme.mode === "dark" ? activeColors.secondary : activeColors.accent
          }
        />
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});
