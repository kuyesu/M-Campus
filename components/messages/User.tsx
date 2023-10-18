import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StyledText from "../Text/StyledText";
import { URI } from "@/redux/URI";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
const User = ({ item }) => {
  const { user, token } = useSelector((state: any) => state.user);
  const userId = user._id;

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(`${URI}/friend-requests/sent/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setFriendRequests(data);
        } else {
          console.log("error", response.status);
        }
        // await axios
        //   .get(`${URI}/friend-requests/sent/${userId}`, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   })
        //   .then((response) => {
        //     const data = response.data;
        //     setFriendRequests(data);
        //   })
        //   .catch((err) => {
        //     console.log("error message", err);
        //   });
        // const response = await fetch(`${URI}/friend-requests/sent/${userId}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // const response = await fetch(
        //   `http://localhost:8000/friend-requests/sent/${userId}`
        // );
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchFriendRequests();
  }, []);

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        await axios
          .get(`${URI}/friends/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const data = response.data;
            setUserFriends(data);
          })
          .catch((err) => {
            console.log("error message", err);
          });
        // const response = await fetch(`${URI}/friends/${userId}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // const response = await fetch(`http://localhost:8000/friends/${userId}`);
      } catch (error) {
        console.log("Error message", error);
      }
    };

    fetchUserFriends();
  }, []);
  const sendFriendRequest = async () => {
    const currentUserId = userId;
    const selectedUserId = item._id;
    try {
      const response = await fetch(`${URI}/friend-request`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selectedUserId }),
      });

      if (response.ok) {
        setRequestSent(true);
      }
      console.log("friend requests sent", friendRequests);
      console.log("user friends", userFriends);
      // await axios
      //   .post(`${URI}/friend-request`, {
      //     currentUserId,
      //     selectedUserId,
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //   .then((response) => {
      //     setRequestSent(true);
      //   })
      //   .catch((err) => {
      //     console.log("error message", err);
      //   });
      // const response = await fetch(`${URI}/friend-request`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ currentUserId, selectedUserId }),
      // });
      // const response = await fetch("http://localhost:8000/friend-request", {
      //   method: "POST",
      //   headers: {
      //   },
      // });
    } catch (error) {
      console.log("error", error);
    }
  };
  const router = useRouter();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingBottom: 20,
        // borderBottomColor: activeColors.grayAccent,
        // borderBottomWidth: 1,
      }}
    >
      {userFriends.includes(item._id) ? (
        <>
          <TouchableOpacity onPress={() => router.push(`/user/${item._id}`)}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                resizeMode: "cover",
              }}
              source={{ uri: item.avatar?.url }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace(`/messages/${item._id}`)}
            style={{ marginLeft: 12, flex: 1 }}
          >
            <StyledText bold>{item?.name}</StyledText>
            <StyledText style={{ marginTop: 4, color: "gray" }}>
              {item?.userName}
            </StyledText>
          </TouchableOpacity>
          <Pressable
            style={{
              backgroundColor: "#82CD47",
              borderColor: activeColors.grayAccent,
              borderWidth: 1,
              padding: 10,
              width: 105,
              borderRadius: 25,
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
          </Pressable>
        </>
      ) : requestSent ||
        friendRequests.some((friend) => friend._id === item._id) ? (
        <>
          <View>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                resizeMode: "cover",
              }}
              source={{ uri: item.avatar?.url }}
            />
          </View>

          <View style={{ marginLeft: 12, flex: 1 }}>
            <StyledText bold>{item?.name}</StyledText>
            <StyledText style={{ marginTop: 4, color: "gray" }}>
              {item?.userName}
            </StyledText>
          </View>
          <Pressable
            style={{
              backgroundColor: "gray",
              padding: 10,
              width: 105,
              borderColor: activeColors.grayAccent,
              borderWidth: 1,
              borderRadius: 25,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
              Request Sent
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          <View>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                resizeMode: "cover",
              }}
              source={{ uri: item.avatar?.url }}
            />
          </View>

          <View style={{ marginLeft: 12, flex: 1 }}>
            <StyledText bold>{item?.name}</StyledText>
            <StyledText style={{ marginTop: 4, color: "gray" }}>
              {item?.userName}
            </StyledText>
          </View>
          <Pressable
            onPress={sendFriendRequest}
            style={{
              backgroundColor: activeColors.secondary,
              borderColor: activeColors.grayAccent,
              borderWidth: 1,
              padding: 10,
              borderRadius: 25,
              width: 105,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: activeColors.tint,
                fontSize: 13,
              }}
            >
              Add Friend
            </Text>
          </Pressable>
        </>
      )}
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});
