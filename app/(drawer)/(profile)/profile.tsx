import { StyleSheet } from "react-native";
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
import { router } from "expo-router";
import StyledText from "@/components/Text/StyledText";

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
  const { user } = useSelector((state: any) => state.user);
  const { posts } = useSelector((state: any) => state.post);
  const [data, setData] = useState([]);
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
      <View>
        <View
          className="flex-row justify-between"
          style={{ width: width, padding: 10 }}
        >
          <View>
            <StyledText big bold>
              {user?.name}
            </StyledText>
            <StyledText
              bold
              style={{
                color: activeColors.gray,
              }}
            >
              {user?.userName}
            </StyledText>
          </View>

          <View className="relative">
            <Image
              source={{ uri: user?.avatar?.url }}
              height={80}
              width={80}
              borderRadius={100}
            />
            {user.role === "Admin" && (
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/1828/1828640.png",
                }}
                width={18}
                height={18}
                className="ml-2 absolute bottom-0 left-0"
              />
            )}
          </View>
        </View>
        <StyledText>{user?.bio}</StyledText>
        <View className="p-3">
          <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate("FollowerCard", {
          //     followers: user?.followers,
          //     following: user?.following,
          //   })
          // }
          >
            <StyledText
              style={{
                color: activeColors.gray,
              }}
            >
              {user?.followers.length} followers
            </StyledText>
          </TouchableOpacity>
        </View>
        <View className="px-8 py-3 flex-row w-full items-center">
          <TouchableOpacity
          // onPress={() => navigation.navigate("EditProfile")}
          >
            <StyledText
              className="w-[100] pt-2 text-center h-[40px]"
              style={{
                backgroundColor: activeColors.accent,
                borderColor: activeColors.accent,
                borderWidth: 1,
                borderRadius: 5,
                color: activeColors.accentGray,
                textAlign: "center",
              }}
            >
              Edit Profile
            </StyledText>
          </TouchableOpacity>
          <TouchableOpacity className="ml-5" onPress={logoutHandler}>
            <StyledText
              className="w-[100] pt-2 text-center h-[40px] "
              style={{
                borderColor: activeColors.gray,
                borderWidth: 1,
                borderRadius: 5,
                textAlign: "center",
              }}
            >
              Log Out
            </StyledText>
          </TouchableOpacity>
        </View>
        <View
          className="border-b border-b-[#00000032] px-4 py-3"
          style={{ width: "100%" }}
        >
          <View className="w-[80%] m-auto flex-row justify-between">
            <TouchableOpacity onPress={() => setActive(0)}>
              <Text
                className="text-[18px] pl-3 text-[#000]"
                style={{ opacity: active === 0 ? 1 : 0.6 }}
              >
                Threads
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive(1)}>
              <Text
                className="text-[18px] pl-3 text-[#000]"
                style={{ opacity: active === 1 ? 1 : 0.6 }}
              >
                Replies
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {active === 0 ? (
          <View className="w-[50%] absolute h-[1px] bg-black left-[-10px] bottom-0" />
        ) : (
          <View className="w-[50%] absolute h-[1px] bg-black right-[-10px] bottom-0" />
        )}
      </View>
      {active === 0 && (
        <>
          {data &&
            data.map((item: any) => (
              <PostCard navigation={router} key={item._id} item={item} />
            ))}
        </>
      )}

      {active === 1 && (
        <>
          {repliesData &&
            repliesData.map((item: any) => (
              <PostCard
                navigation={router}
                key={item._id}
                item={item}
                replies={true}
              />
            ))}
        </>
      )}

      {active === 0 && (
        <>
          {data.length === 0 && (
            <Text className="text-black text-[14px] mt-8 text-center">
              You have no posts yet!
            </Text>
          )}
        </>
      )}

      {active === 1 && (
        <>
          {repliesData.length === 0 && (
            <Text className="text-black text-[14px] mt-8 text-center">
              You have no replies yet!
            </Text>
          )}
        </>
      )}
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
});
