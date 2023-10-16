import { Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";
import { loadUser, logoutUser } from "@/redux/actions/userAction";
import PostCard from "@/components/feed/PostCard";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
// components
import MainContainer from "@/components/container/MainContainer";
import { colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Link, router } from "expo-router";
import StyledText from "@/components/Text/StyledText";
import StyledView from "@/components/View/StyledView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import axios from "axios";
import { URI } from "@/redux/URI";
import { Touchable } from "react-native";

const { width } = Dimensions.get("window");

export default function TabOneScreen() {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const [isActive, setIsActivate] = useState(theme.mode === "dark");
  const handleSwitch = () => {
    updateTheme();
    setIsActivate((previousState) => !previousState);
  };

  const [active, setActive] = useState(0);
  const { user, token } = useSelector((state: any) => state.user);
  const { posts } = useSelector((state: any) => state.post);
  const [data, setData] = useState([]);
  const [avatar, setAvatar] = useState();
  const [repliesData, setRepliesData] = useState([]);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    logoutUser()(dispatch);
  };

  useEffect(() => {
    if (posts && user) {
      const myPosts = posts.filter((post: any) => post.user._id === user._id);
      setData(myPosts);
    }
  }, [posts, user]);

  useEffect(() => {
    if (posts && user) {
      const myReplies = posts.filter((post: any) =>
        post.replies.some((reply: any) => reply.user._id === user._id)
      );
      setRepliesData(myReplies.filter((post: any) => post.replies.length > 0));
    }
  }, [posts, user]);

  return (
    <MainContainer style={styles.container}>
      <View
        style={{
          width: "100%",
          // borderBottomColor: activeColors.grayAccent,
          // borderBottomWidth: 1,
        }}
      >
        <View
          className="flex-col justify-center items-center"
          style={{ width: "100%", padding: 10 }}
        >
          <View className="relative pt-5">
            <Image
              source={{ uri: avatar || user?.avatar.url }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 150 / 2,
                backgroundColor: activeColors.secondary,
              }}
            />
          </View>
          <View className="pt-10 items-center">
            <StyledText big bold>
              {user?.name}{" "}
              {user.role.name === "user" && (
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/1828/1828640.png",
                  }}
                  width={18}
                  height={18}
                  className="ml-2 absolute bottom-0 left-0"
                />
              )}
            </StyledText>
            <StyledText
              style={{
                color: activeColors.gray,
                textTransform: "none",
                fontStyle: "italic",
              }}
            >
              @{user?.userName}
            </StyledText>
          </View>
        </View>
        {/* <StyledText>{user?.bio}</StyledText> */}
        <View className=" items-center justify-center">
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 52,
              width: "55%",
              borderRadius: 26,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 26,
              backgroundColor: activeColors.secondary,
              marginTop: 40,
            }}
          >
            <MaterialCommunityIcons
              name="account-plus-outline"
              size={20}
              color={activeColors.tint}
              style={{ marginRight: 12 }}
            />
            <Text
              style={{
                fontWeight: "bold",
                color: activeColors.tint,
              }}
            >
              Request Connection
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    flex: 1,
  },
});
