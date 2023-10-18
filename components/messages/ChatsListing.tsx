import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UserChat from "./UserChat";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { URI } from "@/redux/URI";

const ChatsListing = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);

  const { user, token } = useSelector((state: any) => state.user);
  const userId = user._id;
  const router = useRouter();

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
  console.log("friends", acceptedFriends);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedFriends.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsListing;

const styles = StyleSheet.create({});
