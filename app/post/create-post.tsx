import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import { createPostAction, getAllPosts } from "@/redux/actions/postAction";
import MainContainer from "@/components/container/MainContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "@/components/Text/StyledText";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { router } from "expo-router";
type Props = {
  navigation: any;
};

const CreatePost = ({ navigation }: Props) => {
  const { user } = useSelector((state: any) => state.user);
  const { isSuccess, isLoading } = useSelector((state: any) => state.post);
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  useEffect(() => {
    if (
      replies.length === 1 &&
      replies[0].title === "" &&
      replies[0].image === ""
    ) {
      setReplies([]);
    }
    if (isSuccess) {
      getAllPosts()(dispatch);
    }
    setReplies([]);
    setTitle("");
    setImage("");
  }, [isSuccess]);

  const [replies, setReplies] = useState([
    {
      title: "",
      image: "",
      user,
    },
  ]);

  const handleTitleChange = (index: number, text: string) => {
    setReplies((prevPost) => {
      const updatedPost = [...prevPost];
      updatedPost[index] = { ...updatedPost[index], title: text };
      return updatedPost;
    });
  };

  const uploadImage = (index: number) => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.9,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        setReplies((prevPost) => {
          const updatedPost = [...prevPost];
          updatedPost[index] = {
            ...updatedPost[index],
            // @ts-ignore
            image: "data:image/jpeg;base64," + image?.data,
          };
          return updatedPost;
        });
      }
    });
  };

  const addNewThread = () => {
    if (
      replies[activeIndex].title !== "" ||
      replies[activeIndex].image !== ""
    ) {
      setReplies((prevPost) => [...prevPost, { title: "", image: "", user }]);
      setActiveIndex(replies.length);
    }
  };

  const removeThread = (index: number) => {
    if (replies.length > 0) {
      const updatedPost = [...replies];
      updatedPost.splice(index, 1);
      setReplies(updatedPost);
      setActiveIndex(replies.length - 1);
    } else {
      setReplies([{ title: "", image: "", user }]);
    }
  };

  const addFreshNewThread = () => {
    if (title !== "" || image !== "") {
      setActive(true);
      setReplies((prevPost) => [...prevPost, { title: "", image: "", user }]);
      setActiveIndex(replies.length);
    }
  };

  const postImageUpload = () => {
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

  const createPost = () => {
    if (title !== "" || (image !== "" && !isLoading)) {
      createPostAction(title, image, user, replies)(dispatch);
    }
    if (isSuccess) {
      router.back();
    }
  };

  return (
    <MainContainer className="flex-1">
      <View className="w-full flex-row items-center m-3">
        <TouchableOpacity onPress={() => router.canGoBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={activeColors.tint}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        <StyledText className="pl-4 ">New Post</StyledText>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="m-3 flex-[1] justify-between">
          <View>
            {/* create post */}
            <View className="mt-3 flex-row">
              <Image
                source={{ uri: user?.avatar.url }}
                style={{ width: 40, height: 40 }}
                borderRadius={100}
              />
              <View className="pl-3">
                <View className="w-[78%] flex-row justify-between">
                  <StyledText className=" ">{user?.name}</StyledText>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="close"
                      size={24}
                      color={activeColors.tint}
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>
                </View>
                <StyledTextInput
                  placeholder="Start a thread..."
                  placeholderTextColor={activeColors.gray}
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                  style={{
                    fontSize: 16,
                    color: activeColors.tint,
                    marginTop: 10,
                    maxWidth: "75%",
                    width: "750%",
                    borderRadius: 10,
                    backgroundColor: activeColors.primary,
                  }}
                  multiline={true}
                  rows={5}
                  verticalAlign="top"
                  textAlignVertical="top"
                />

                <TouchableOpacity className="mt-2" onPress={postImageUpload}>
                  <MaterialCommunityIcons
                    name="image-plus"
                    size={24}
                    color={activeColors.tint}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {image && (
              <View className="m-2">
                <Image
                  source={{ uri: image }}
                  width={350}
                  height={300}
                  resizeMethod="auto"
                  alt=""
                />
              </View>
            )}
            {replies.length === 0 && (
              <View className="flex-row m-3 w-full items-start mt-5 opacity-7">
                <Image
                  source={{ uri: user?.avatar.url }}
                  style={{ width: 30, height: 30 }}
                  borderRadius={100}
                />
                <StyledText
                  className="pl-3 text-center justify-center items-center  "
                  onPress={addFreshNewThread}
                >
                  Add to post ...
                </StyledText>
              </View>
            )}

            {replies.map((item, index) => (
              <View key={index}>
                <View className="mt-3 flex-row">
                  <Image
                    source={{ uri: user?.avatar.url }}
                    style={{ width: 40, height: 40 }}
                    borderRadius={100}
                  />
                  <View className="pl-3">
                    <View className="w-[78%] flex-row justify-between">
                      <StyledText className="">{user?.name}</StyledText>
                      <TouchableOpacity onPress={() => removeThread(index)}>
                        <MaterialCommunityIcons
                          name="tag-remove"
                          size={24}
                          color={activeColors.tint}
                          style={{ width: 30, height: 30 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <StyledTextInput
                      placeholder="Start a thread..."
                      placeholderTextColor={activeColors.gray}
                      value={item.title}
                      onChangeText={(text) => handleTitleChange(index, text)}
                      className="mt-2 "
                      style={{
                        fontSize: 16,
                        color: activeColors.tint,
                        marginTop: 10,
                        width: "75%",
                        borderRadius: 10,
                        backgroundColor: activeColors.primary,
                      }}
                    />
                    <TouchableOpacity
                      className="mt-2"
                      onPress={() => uploadImage(index)}
                    >
                      <MaterialCommunityIcons
                        name="image-plus"
                        size={24}
                        color={activeColors.tint}
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {item.image && (
                  <View className="m-2">
                    <Image
                      source={{ uri: item.image }}
                      width={350}
                      height={300}
                      resizeMethod="auto"
                      alt=""
                    />
                  </View>
                )}
                {index === activeIndex && (
                  <View className="flex-row m-3 w-full items-start mt-5 opacity-7">
                    <Image
                      source={{ uri: user?.avatar.url }}
                      style={{ width: 30, height: 30 }}
                      borderRadius={100}
                    />
                    <StyledText className="pl-3 " onPress={addNewThread}>
                      Add to thread ...
                    </StyledText>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="p-2 flex-row justify-between">
        <StyledText className=" px-1 py-1">Anyone can reply</StyledText>
        <TouchableOpacity onPress={createPost}>
          <StyledText
            style={{
              backgroundColor: activeColors.accent,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 5,
              color: activeColors.secondary,
              borderColor: activeColors.grayAccent,
              borderWidth: 1,
            }}
            className=""
          >
            Post
          </StyledText>
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

export default CreatePost;
