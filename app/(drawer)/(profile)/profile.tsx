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
      <View
        style={{
          width: "100%",
          borderBottomColor: activeColors.grayAccent,
          borderBottomWidth: 1,
        }}
      >
        <View
          className="flex-row justify-between"
          style={{ width: "100%", padding: 10 }}
        >
          <View>
            <StyledText big bold>
              {user?.name}
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

          <View className="relative">
            <Image
              source={{ uri: user?.avatar.url }}
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
            {/* <StyledText style={{}}>Update your profile info</StyledText> */}
          </TouchableOpacity>
        </View>
        <StyledView
          className="px-4 py-5 my-5 flex-row w-full items-center justify-between rounded-none"
          style={{
            borderColor: activeColors.grayAccent,
            borderWidth: 1,
          }}
        >
          <Link href="/EditProfile" asChild>
            <Pressable>
              {({ pressed }) => (
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
                  bold
                >
                  Edit Profile
                </StyledText>
              )}
            </Pressable>
          </Link>

          <TouchableOpacity className="ml-5" onPress={logoutHandler}>
            <StyledText
              className="w-[100] pt-2 text-center h-[40px] "
              style={{
                borderColor: activeColors.grayAccent,
                borderWidth: 1,
                borderRadius: 5,
                textAlign: "center",
              }}
              bold
            >
              Log Out
            </StyledText>
          </TouchableOpacity>
        </StyledView>
        <View
          className=" px-4 py-3"
          style={{
            width: "100%",
            borderBottomColor: activeColors.grayAccent,
            borderBottomWidth: 1,
          }}
        >
          <View className="w-[80%] m-auto flex-row justify-between">
            <TouchableOpacity onPress={() => setActive(1)}>
              <StyledText bold style={{ opacity: active === 1 ? 1 : 0.6 }}>
                Replies
              </StyledText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive(0)}>
              <StyledText bold style={{ opacity: active === 0 ? 1 : 0.6 }}>
                Posts
              </StyledText>
            </TouchableOpacity>
          </View>
        </View>
        {active === 0 ? (
          <View
            className="w-[50%] absolute h-[1px]  left-[-10px] bottom-0"
            style={{
              backgroundColor: activeColors.grayAccent,
              borderBottomWidth: 2,
            }}
          />
        ) : (
          <View
            className="w-[50%] absolute h-[1px]  right-[-10px] bottom-0"
            style={{
              backgroundColor: activeColors.grayAccent,
              borderBottomWidth: 2,
            }}
          />
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
            <StyledText className="  mt-8 text-center">
              There are no posts yet!
            </StyledText>
          )}
        </>
      )}

      {active === 1 && (
        <>
          {repliesData.length === 0 && (
            <StyledText className="  mt-8 text-center">
              You have no reply yet!
            </StyledText>
          )}
        </>
      )}
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
});
