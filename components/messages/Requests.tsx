import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "./User";
import { useSelector } from "react-redux";
import StyledText from "../Text/StyledText";
const RequestScreen = () => {
  const navigation = useNavigation();
  const { user, token } = useSelector((state: any) => state.user);
  const userId = user._id;

  const [users, setUsers] = useState([]);
  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerTitle: "",
  //       headerLeft: () => <StyledText bold>Mi Chat</StyledText>,
  //       headerRight: () => (
  //         <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
  //           <Ionicons
  //             // onPress={() => navigation.navigate("Chats")}
  //             name="chatbox-ellipses-outline"
  //             size={24}
  //             color="black"
  //           />
  //           <MaterialIcons
  //             // onPress={() => navigation.navigate("Friends")}
  //             name="people-outline"
  //             size={24}
  //             color="black"
  //           />
  //         </View>
  //       ),
  //     });
  //   }, []);
  //medium.com/@WynneTran/sending-files-through-react-native-gifted-chat-cddd9b1be0a0
  https: useEffect(() => {
    const fetchUsers = async () => {
      const { user, token } = useSelector((state: any) => state.user);
      const userId = user._id;
      // const decodedToken = jwt_decode(token);
      // const userId = decodedToken.userId;
      // setUserId(userId);

      axios
        .get(`http://localhost:8000/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
    };

    fetchUsers();
  }, []);

  console.log("users", users);
  return (
    <View>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({});
