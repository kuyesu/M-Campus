import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native";
import getTimeDuration from "@/common/TimeGenerator";
import {
  addLikes,
  addLikesToRepliesReply,
  addLikesToReply,
  removeLikes,
  removeLikesFromRepliesReply,
  removeLikesFromReply,
} from "@/redux/actions/postAction";
import axios from "axios";
import { URI } from "@/redux/URI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "@/components/Text/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
  navigation: any;
  item: any;
  isReply?: boolean | null;
  postId?: string | null;
  isRepliesReply?: boolean;
};

const PostDetailsCard = ({
  item,
  isReply,
  navigation,
  postId,
  isRepliesReply,
}: Props) => {
  const { user, token, users } = useSelector((state: any) => state.user);
  const { posts } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    userName: "",
    avatar: {
      url: "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png",
    },
  });

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const time = item?.createdAt;
  const formattedDuration = getTimeDuration(time);

  const profileHandler = async (e: any) => {
    await axios
      .get(`${URI}/get-user/${e._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.user._id !== user._id) {
          navigation.navigate("UserProfile", {
            item: res.data.user,
          });
        } else {
          navigation.navigate("Profile");
        }
      });
  };

  const reactsHandler = (e: any) => {
    if (item.likes.length !== 0) {
      const isLikedBefore = item.likes.find((i: any) => i.userId === user._id);
      if (isLikedBefore) {
        removeLikes({ postId: postId ? postId : e._id, posts, user })(dispatch);
      } else {
        addLikes({ postId: postId ? postId : e._id, posts, user })(dispatch);
      }
    } else {
      addLikes({ postId: postId ? postId : e._id, posts, user })(dispatch);
    }
  };

  const replyReactHanlder = (e: any) => {
    if (e.likes.length !== 0) {
      const isLikedBefore = e.likes.find((i: any) => i.userId === user._id);
      if (isLikedBefore) {
        removeLikesFromReply({
          postId: postId ? postId : e._id,
          posts,
          replyId: e._id,
          user,
          title: e.title,
        })(dispatch);
      } else {
        addLikesToReply({
          postId: postId ? postId : e._id,
          posts,
          replyId: e._id,
          user,
          title: e.title,
        })(dispatch);
      }
    } else {
      addLikesToReply({
        postId: postId ? postId : e._id,
        posts,
        replyId: e._id,
        user,
        title: e.title,
      })(dispatch);
    }
  };

  const handlePress = async (e: any) => {
    setActive(!active);
    await AsyncStorage.setItem("replyId", e._id);
  };

  const repliesReplyReactHandler = async (e: any) => {
    const replyId = await AsyncStorage.getItem("replyId");
    if (e.likes.length !== 0) {
      const isLikedBefore = e.likes.find((i: any) => i.userId === user._id);
      if (isLikedBefore) {
        removeLikesFromRepliesReply({
          postId: postId,
          posts,
          replyId,
          singleReplyId: e._id,
          user,
          title: e.title,
        })(dispatch);
      } else {
        addLikesToRepliesReply({
          postId: postId,
          posts,
          replyId,
          singleReplyId: e._id,
          user,
          title: e.title,
        })(dispatch);
      }
    } else {
      addLikesToRepliesReply({
        postId: postId,
        posts,
        replyId,
        singleReplyId: e._id,
        user,
        title: e.title,
      })(dispatch);
    }
  };

  useEffect(() => {
    if (users) {
      const updatedUsers = [...users, user];
      const userData = updatedUsers?.find(
        (user: any) => user?._id === item?.user?._id
      );
      setUserInfo(userData);
    }
  }, [users]);

  const router = useRouter();

  return (
    <View
      className={`p-[15px] ${!isReply && " border-b"}`}
      style={{
        left: isReply ? 20 : 0,
        width: isReply ? "95%" : "100%",
        borderBottomColor: activeColors.postBorder,
      }}
    >
      <View className="relative">
        <View className="flex-row w-[99%] items-start justify-between">
          <View className="flex-row items-start">
            <TouchableOpacity
              onPress={() =>
                router.replace({
                  pathname: `/user/${item?.user?._id}`,
                  params: { userId: item?.user?._id },
                })
              }
            >
              <Image
                source={{ uri: userInfo?.avatar?.url }}
                width={40}
                height={40}
                borderRadius={100}
              />
            </TouchableOpacity>
            <View className="pl-3">
              <TouchableOpacity
                onPress={() =>
                  router.replace({
                    pathname: `/user/${item?.user?._id}`,
                    params: { userId: item?.user?._id },
                  })
                }
              >
                <View className=" flex-row items-center justify-start">
                  <StyledText className=" font-[500] text-[16px]">
                    {userInfo?.name}
                  </StyledText>
                  {item?.user?.role?.name != "user" && (
                    <Image
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/1828/1828640.png",
                      }}
                      width={15}
                      height={15}
                      className="ml-1  mt-1"
                    />
                  )}
                </View>
                <StyledText className="text-[13px] pt-1 ">
                  @{userInfo?.userName}
                </StyledText>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row items-center">
            <StyledText className="">{formattedDuration}</StyledText>
            <TouchableOpacity>
              <StyledText className=" pl-4 font-[700] mb-[8px]">...</StyledText>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingLeft: 50,
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <StyledText
            className=" font-[500]  text-[13px]
              "
          >
            {item?.title}
          </StyledText>
        </View>
        <View className="ml-[50px] my-4">
          {item?.image && (
            <Image
              source={{ uri: item?.image?.url }}
              style={{ aspectRatio: 1, borderRadius: 10, zIndex: 1111 }}
              resizeMode="contain"
            />
          )}
        </View>
        {item?.image ? (
          <View
            className="absolute top-14 left-5 h-[90%] w-[1px] "
            style={{
              backgroundColor: activeColors.postBorder,
            }}
          />
        ) : (
          <View
            style={{
              backgroundColor: activeColors.postBorder,
            }}
            className="absolute top-12 left-5 h-[60%] w-[1px] "
          />
        )}
        <View className="flex-row items-center left-[50px] top-[5px]">
          <TouchableOpacity
            onPress={() =>
              !isRepliesReply
                ? !isReply
                  ? reactsHandler(item)
                  : replyReactHanlder(item)
                : repliesReplyReactHandler(item)
            }
          >
            {item?.likes?.length > 0 ? (
              <>
                {item?.likes.find((i: any) => i?.userId === user?._id) ? (
                  <MaterialCommunityIcons
                    name="heart"
                    size={30}
                    color={activeColors.accent}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={30}
                    color={activeColors.tint}
                  />
                )}
              </>
            ) : (
              <MaterialCommunityIcons
                name="heart-outline"
                size={30}
                color={activeColors.tint}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate("CreateReplies", {
              //   item: item,
              //   navigation: navigation,
              //   postId: postId,
              // });
              router.push({
                pathname: "/post/create-replies",
                params: {
                  post: item,
                  postId: postId ? postId : item?._id,
                },
              });
            }}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5948/5948565.png",
              }}
              width={20}
              height={20}
              className="ml-5"
            />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3905/3905866.png",
              }}
              width={25}
              height={25}
              className="ml-5"
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/10863/10863770.png",
              }}
              width={25}
              height={25}
              className="ml-5"
            />
          </TouchableOpacity> */}
        </View>

        <View className="pl-[50px] pt-4 flex-row">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PostDetails", {
                data: item,
              })
            }
          ></TouchableOpacity>
          <StyledText className="text-[16px[ ">
            {item?.likes?.length} {item?.likes?.length > 1 ? "likes" : "like"}
          </StyledText>
        </View>

        {isRepliesReply && (
          <View className="pl-[50px] pt-4 flex-row">
            <StyledText className="text-[16px[ ">
              {item?.likes?.length} {item?.likes?.length > 1 ? "likes" : "like"}
            </StyledText>
          </View>
        )}
      </View>
      {item?.reply && (
        <>
          {item?.reply?.length !== 0 && (
            <>
              <View className="flex-row items-center">
                <TouchableOpacity onPress={() => handlePress(item)}>
                  <StyledText className="ml-[50px] mt-[20px]  text-[16px]">
                    {active ? "Hide Replies" : "View Replies"}
                  </StyledText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <StyledText className="ml-[10px] mt-[20px] text-[16px]">
                    {item?.likes?.length}{" "}
                    {item?.likes?.length > 1 ? "likes" : "like"}
                  </StyledText>
                </TouchableOpacity>
              </View>
              {active && (
                <>
                  {item?.reply?.map((i: any) => (
                    <PostDetailsCard
                      navigation={navigation}
                      item={i}
                      key={i?._id}
                      isReply={true}
                      postId={postId}
                      isRepliesReply={true}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default PostDetailsCard;
