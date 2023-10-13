import {
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native";
import getTimeDuration from "@/common/TimeGenerator";
import { addLikes, getAllPosts, removeLikes } from "@/redux/actions/postAction";
import axios from "axios";
import { URI } from "@/redux/URI";
import PostDetailsCard from "./PostDetailsCard";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import StyledText from "../Text/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledView from "../View/StyledView";
import { router } from "expo-router";

type Props = {
  navigation: any;
  item: any;
  isReply?: boolean | null;
  postId?: string | null;
  replies?: boolean | null;
};

const PostCard = ({ item, isReply, navigation, postId, replies }: Props) => {
  const { user, token, users } = useSelector((state: any) => state.user);
  const { posts } = useSelector((state: any) => state.post);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: "",
    avatar: {
      url: "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png",
    },
    role: {
      name: "",
    },
  });
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

  const deletePostHandler = async (e: any) => {
    await axios
      .delete(`${URI}/delete-post/${e}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getAllPosts()(dispatch);
      });
  };

  useEffect(() => {
    if (users) {
      const updatedUsers = [...users, user];
      const userData = updatedUsers.find(
        (user: any) => user._id === item.user._id
      );
      setUserInfo(userData);
    }
  }, [users]);

  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <View
      className="p-[15px] border-b py-8 "
      style={{
        borderBottomColor: activeColors.grayAccent,
        borderBottomWidth: 1,
      }}
    >
      <View className="relative">
        <View className="flex-row w-full">
          <View className="flex-row w-[85%] items-start">
            <TouchableOpacity onPress={() => profileHandler(item.user)}>
              <Image
                source={{ uri: userInfo?.avatar?.url }}
                width={40}
                height={40}
                borderRadius={100}
              />
            </TouchableOpacity>
            <View className="pl-3 w-[100%]">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => profileHandler(userInfo)}
              >
                <StyledText
                  style={{
                    color: activeColors.gray,
                  }}
                  className=""
                  bold
                >
                  {userInfo?.name}
                </StyledText>
                {userInfo?.role.name != "user" && (
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/1828/1828640.png",
                    }}
                    width={15}
                    height={15}
                    className="ml-1"
                  />
                )}
              </TouchableOpacity>
              <StyledText className="">{item.title}</StyledText>
            </View>
          </View>
          <View className="flex-row items-start">
            <StyledText className="">{formattedDuration}</StyledText>
            <TouchableOpacity
              onPress={() => item.user._id === user._id && setOpenModal(true)}
            >
              <StyledText className=" pl-4  mb-[8px]">...</StyledText>
            </TouchableOpacity>
          </View>
        </View>
        <View className="ml-[50px] my-3">
          {item.image && (
            <Image
              source={{ uri: item.image.url }}
              style={{ aspectRatio: 1, borderRadius: 10, zIndex: 1111 }}
              resizeMode="contain"
            />
          )}
        </View>
        {item.image ? (
          <View
            className="absolute top-12 left-5 h-[90%] w-[1px] "
            style={{
              backgroundColor: activeColors.postBorder,
            }}
          />
        ) : (
          <View
            className="absolute top-12 left-5 h-[60%] w-[1px] "
            style={{
              backgroundColor: activeColors.postBorder,
            }}
          />
        )}
        <View className="flex-row items-center left-[50px] top-[5px]">
          <TouchableOpacity onPress={() => reactsHandler(item)}>
            {item.likes.length > 0 ? (
              <>
                {item.likes.find((i: any) => i.userId === user._id) ? (
                  <MaterialCommunityIcons
                    name="heart"
                    size={25}
                    color={activeColors.accent}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="heart"
                    size={25}
                    color={activeColors.accent}
                  />
                )}
              </>
            ) : (
              <MaterialCommunityIcons
                name="heart-outline"
                size={25}
                color={activeColors.accent}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/post/create-replies",
                params: {
                  post: item,
                  postId: postId ? postId : item._id,
                },
              })
            }
            className="ml-5"
          >
            <MaterialCommunityIcons
              name="comment-outline"
              size={25}
              color={activeColors.accent}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/post/create-replies",
                params: {
                  post: item,
                  postId: postId ? postId : item._id,
                },
              })
            }
            className="ml-5"
          >
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={25}
              color={activeColors.accent}
            />
          </TouchableOpacity>
        </View>
        {!isReply && (
          <View className="pl-[50px] pt-4 flex-row">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PostDetails", {
                  data: item,
                })
              }
            >
              <StyledText
                className=""
                small
                style={{
                  color: activeColors.gray,
                }}
              >
                {item?.replies?.length !== 0 &&
                  `${item?.replies?.length} replies ·`}{" "}
              </StyledText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                item.likes.length !== 0 &&
                navigation.navigate("PostLikeCard", {
                  item: item.likes,
                  navigation: navigation,
                })
              }
            >
              <StyledText
                className=""
                small
                style={{
                  color: activeColors.gray,
                }}
              >
                {item.likes.length} {item.likes.length > 1 ? "likes" : "like"}
              </StyledText>
            </TouchableOpacity>
          </View>
        )}

        {replies && (
          <>
            {item?.replies?.map((i: any) => (
              <PostDetailsCard
                navigation={navigation}
                key={i._id}
                item={i}
                isReply={true}
                postId={item._id}
              />
            ))}
          </>
        )}
        {openModal && (
          <View className="flex-[1] justify-center items-center mt-[22]">
            <Modal
              animationType="fade"
              transparent={true}
              visible={openModal}
              onRequestClose={() => {
                setOpenModal(!openModal);
              }}
            >
              <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
                <View className="flex-[1] justify-end bg-[#00000059]">
                  <TouchableWithoutFeedback onPress={() => setOpenModal(true)}>
                    <StyledView className="w-full  h-[200] rounded-[20px] p-[20px] items-center shadow-[#000] shadow-inner">
                      <TouchableOpacity
                        className="w-full    items-center flex-row "
                        style={{
                          borderColor: activeColors.grayAccent,
                          borderWidth: 1,
                          paddingVertical: 15,
                          borderRadius: 10,
                          paddingHorizontal: 20,
                        }}
                        onPress={() => deletePostHandler(item._id)}
                      >
                        <StyledText
                          className="text-[18px] font-[600] "
                          bold
                          style={{
                            color: activeColors.danger,
                          }}
                        >
                          Delete
                        </StyledText>
                      </TouchableOpacity>
                    </StyledView>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        )}
      </View>
    </View>
  );
};

export default PostCard;
