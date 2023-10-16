import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

import FriendRequest from "./FriendRequest";
import { useSelector } from "react-redux";
import StyledTextInput from "../TextInput/StyledTextInput";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import StyledText from "../Text/StyledText";
import { TextInput } from "react-native";

const FriendsScreen = () => {
  const { user, token } = useSelector((state: any) => state.user);
  const userId = user._id;

  const [friendRequests, setFriendRequests] = useState([]);
  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/friend-request/${userId}`
      );
      if (response.status === 200) {
        const friendRequestsData = response.data.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image,
        }));

        setFriendRequests(friendRequestsData);
      }
    } catch (err) {
      console.log("error message", err);
    }
  };
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  console.log(friendRequests);
  return (
    <View style={{ padding: 10, flex: 1, gap: 20 }}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 10,
        }}
      >
        <StyledTextInput
          small
          bigPadding
          inlineImageLeft="search_icon"
          placeholder="Search for a friend"
          placeholderTextColor={activeColors.gray}
          style={{
            width: "100%",
            padding: Platform.OS === "ios" ? 6 : 6,
          }}
        />

        <AntDesign
          name="search1"
          size={20}
          color={activeColors.gray}
          style={{
            position: "relative",
            right: 35,
            top: 10,
          }}
        />
      </View>
      {friendRequests && (
        <StyledText bold>Mi Friend Connection Requests</StyledText>
      )}

      {friendRequests.map((item, index) => (
        <FriendRequest
          key={index}
          item={item}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
        />
      ))}
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
