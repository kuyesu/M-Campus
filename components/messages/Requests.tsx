import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import StyledTextInput from "../TextInput/StyledTextInput";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import StyledText from "../Text/StyledText";
import { getAllUsers } from "@/redux/actions/userAction";
const RequestScreen = () => {
  const navigation = useNavigation();
  const { user, token, users } = useSelector((state: any) => state.user);

  //medium.com/@WynneTran/sending-files-through-react-native-gifted-chat-cddd9b1be0a0

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

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

      <StyledText bold>Mi Friend Connection Requests</StyledText>
      <View style={{ paddingVertical: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({});
