import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UserChat from "./UserChat";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { URI } from "@/redux/URI";
import StyledText from "../Text/StyledText";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";

const ChatsListing = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);

  const { user, token, isLoading } = useSelector((state: any) => state.user);
  const userId = user._id;
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await fetch(`${URI}/accepted-friends/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setAcceptedFriends(data);
        }
      } catch (error) {
        console.log("error showing the accepted friends", error);
      }
    };

    acceptedFriendsList();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {isLoading ? (
        <View
          style={{
            display: "flex",
            position: "fixed",
            backgroundColor: activeColors.primary,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <StyledText>
            <ActivityIndicator size="large" color={activeColors.accent} />
          </StyledText>
        </View>
      ) : (
        <Pressable>
          {acceptedFriends.map((item, index) => (
            <UserChat key={index} item={item} />
          ))}
        </Pressable>
      )}
    </ScrollView>
  );
};

export default ChatsListing;

const styles = StyleSheet.create({});
