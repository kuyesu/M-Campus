import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import getTimeDuration from "@/common/TimeGenerator";
import axios from "axios";
import { URI } from "../../redux/URI";
import { getAllPosts } from "../../redux/actions/postAction";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "@/components/Text/StyledText";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import MainContainer from "@/components/container/MainContainer";

type Props = {
  item: any;
  route: any;
  postId: string;
};

const CreateRepliesScreen = ({ route }: Props) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const params = useLocalSearchParams();
  const { postId }: any = params;
  const { posts, isLoading } = useSelector((state: any) => state.post);
  const { user, token } = useSelector((state: any) => state.user);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  useEffect(() => {
    if (posts && user) {
      const myPosts = posts.find((ticket: any) => ticket._id === postId);
      setData(myPosts);
    }
    // console.log(tickets);
  }, [posts]);
  const post = posts.find((post: any) => post._id === postId);
  const ImageUpload = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        // @ts-ignore
        setImage("data:image/jpeg;base64," + image.data);
      }
    });
  };

  const time = post.createdAt;
  const formattedDuration = getTimeDuration(time);

  const createReplies = async () => {
    if (!postId) {
      await axios
        .put(
          `${URI}/add-reply`,
          {
            postId: post._id,
            title,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res: any) => {
          getAllPosts()(dispatch);
          router.push({
            pathname: `/post/${postId}`,
            params: {
              data: res.data.post,
              postId: postId,
            },
          });
          setTitle("");
          setImage("");
        });
    } else {
      await axios
        .put(
          `${URI}/add-replies`,
          {
            postId,
            replyId: post._id,
            title,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res: any) => {
          router.push({
            pathname: `/post/${postId}`,
            params: {
              data: res.data.post,
              postId: postId,
            },
          });
          setTitle("");
          setImage("");
        });
    }
  };

  return (
    <MainContainer>
      <View className="flex-row items-center p-3">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="close"
            size={25}
            color={activeColors.tint}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
        <StyledText bold className="text-[20px] left-4 font-[600] ">
          Reply
        </StyledText>
      </View>
      <View className="h-[88vh] justify-between flex-col">
        <ScrollView className="relative" showsVerticalScrollIndicator={false}>
          <View className="flex-row w-full justify-between p-3">
            <View className="flex-row items-center">
              <Image
                source={{ uri: post?.user?.avatar.url }}
                width={40}
                height={40}
                borderRadius={100}
              />
              <View className="pl-3">
                <StyledText className="font-[500] text-[18px]">
                  {post?.user?.name}
                </StyledText>
                <StyledText className="font-[500] text-[16px]">
                  {post?.title}
                </StyledText>
              </View>
            </View>
            <View className="flex-row items-center">
              <StyledText className="">{formattedDuration}</StyledText>
              <TouchableOpacity>
                <StyledText className=" pl-4 font-[700] mb-[8px]">
                  ...
                </StyledText>
              </TouchableOpacity>
            </View>
          </View>
          <View className="ml-[50px] my-3">
            {post?.image && (
              <Image
                source={{ uri: post?.image?.url }}
                style={{
                  width: "90%",
                  aspectRatio: 1,
                  borderRadius: 10,
                  zIndex: 1111,
                }}
                resizeMode="contain"
              />
            )}
          </View>
          {post?.image ? (
            <View
              style={{
                backgroundColor: activeColors.postBorder,
              }}
              className="absolute top-[125] left-8 h-[75%] w-[1px] "
            />
          ) : (
            <View
              style={{
                backgroundColor: activeColors.postBorder,
              }}
              className="absolute top-12 left-5 h-[60%] w-[1px] "
            />
          )}

          <View className="p-3">
            <View className="flex-row ">
              <Image
                source={{ uri: user?.avatar?.url }}
                width={40}
                height={40}
                borderRadius={100}
              />
              <View
                className="pl-3"
                style={{
                  width: "80%",
                }}
              >
                <StyledText className=" font-[500] text-[18px] pb-4">
                  {user.name}
                </StyledText>
                <StyledTextInput
                  placeholder={`Reply to ${post?.user?.name}...`}
                  placeholderTextColor={activeColors.gray}
                  className="mt-[-5px] ml-1"
                  value={title}
                  onChangeText={setTitle}
                  textAlignVertical="top"
                  multiline
                  rows={4}
                  style={{
                    width: "100%",
                    color: activeColors.tint,
                    borderRadius: 10,
                    padding: 5,
                    paddingHorizontal: 0,
                    paddingLeft: 0,
                    backgroundColor: activeColors.primary,
                  }}
                />

                <TouchableOpacity className="mt-2" onPress={ImageUpload}>
                  <MaterialCommunityIcons
                    name="image-plus"
                    size={30}
                    color={activeColors.tint}
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: "85%",
                    aspectRatio: 1,
                    borderRadius: 10,
                    zIndex: 1111,
                    marginLeft: 45,
                    marginVertical: 20,
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <View>
          <View className="w-full flex-row justify-between pt-5 ">
            <StyledText className="left-3 ">Anyone can reply</StyledText>
            <TouchableOpacity
              style={{
                backgroundColor: activeColors.secondary,
                borderRadius: 25,
                padding: 10,
                paddingHorizontal: 20,
                marginRight: 10,
                borderColor: activeColors.grayAccent,
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={createReplies}
            >
              <StyledText className=" mr-[5px]" bold>
                Post
              </StyledText>
              <MaterialCommunityIcons
                name="reply"
                size={20}
                color={activeColors.accent}
                style={{
                  // rotate: "180deg",
                  transform: [{ rotateX: "180deg" }, { rotateZ: "180deg" }],
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </MainContainer>
  );
};

export default CreateRepliesScreen;
