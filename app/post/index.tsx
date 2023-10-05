import {
  ActivityIndicator,
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
import * as ImagePicker from "expo-image-picker";
import { createPostAction, getAllPosts } from "@/redux/actions/postAction";
import MainContainer from "@/components/container/MainContainer";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "@/components/Text/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

type Props = {
  navigation: any;
};

export default function PostScreen({ navigation }: Props) {
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
      navigation.goBack();
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
  const uploadImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setReplies((prevPost) => {
        const updatedPost = [...prevPost];
        updatedPost[activeIndex] = {
          ...updatedPost[activeIndex],
          image: result.assets[0].uri,
        };
        return updatedPost;
      });
    }
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

  const postImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }


  };

  const createPost = () => {
    if (title !== "" || (image !== "" && !isLoading)) {
      createPostAction(title, image, user, replies)(dispatch);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: activeColors.primary,
        height: "100%",
        display: "flex",
      }}
    >
      <MainContainer
        className="flex-1"
        style={{
          paddingHorizontal: 10,
        }}
      >
        <View className="w-full flex-row items-center space-x-3 m-3">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={activeColors.tint}
            />
          </TouchableOpacity>
          <StyledText bold>New Thread</StyledText>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="m-3 flex-[1] justify-between">
            <View>
              {/* create post */}
              <View className="mt-3 flex-row">
                <Image
                  source={{ uri: user?.avatar?.url }}
                  style={{ width: 40, height: 40 }}
                  borderRadius={100}
                />
                <View className="pl-3">
                  <View className="w-[78%] flex-row justify-between mb-5">
                    <StyledText className="text-[20px] font-[400] ">
                      {user?.name}
                    </StyledText>
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name="close"
                        size={25}
                        color={activeColors.tint}
                      />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    placeholder="Start a thread..."
                    placeholderTextColor={activeColors.gray}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    className="mt-1  text-[16px]"
                    multiline
                    maxLength={100}
                    style={{
                      color: activeColors.gray,
                    }}
                  />
                  <TouchableOpacity className="mt-2" onPress={postImageUpload}>
                    <MaterialCommunityIcons
                      name="image"
                      size={25}
                      color={activeColors.gray}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {image && (
                <View className="m-2">
                  <Image
                    source={{ uri: image }}
                    width={310}
                    height={260}
                    resizeMethod="auto"
                    style={{ borderRadius: 10, alignSelf: "flex-end" }}
                  />
                </View>
              )}
              {replies.length === 0 && (
                <View className="flex-row m-3 w-full items-start mt-5 opacity-7">
                  <Image
                    source={{ uri: user?.avatar?.url }}
                    style={{ width: 30, height: 30 }}
                    borderRadius={100}
                  />
                  <StyledText className="pl-3 " onPress={addFreshNewThread}>
                    <StyledText bold big>
                      +
                    </StyledText>{" "}
                    Add to thread ...
                  </StyledText>
                </View>
              )}

              {replies.map((item, index) => (
                <View key={index}>
                  <View className="mt-3 flex-row">
                    <Image
                      source={{ uri: user?.avatar?.url }}
                      style={{ width: 40, height: 40 }}
                      borderRadius={100}
                    />
                    <View className="pl-3">
                      <View className="w-[78%] flex-row justify-between">
                        <StyledText
                          bold
                          big
                          className="text-[20px] font-[400] "
                        >
                          {user?.name}
                        </StyledText>
                        <TouchableOpacity onPress={() => removeThread(index)}>
                          <MaterialCommunityIcons
                            name="close"
                            size={25}
                            color={activeColors.tint}
                          />
                        </TouchableOpacity>
                      </View>
                      <TextInput
                        placeholder="Start a thread..."
                        placeholderTextColor={activeColors.gray}
                        value={item.title}
                        onChangeText={(text) => handleTitleChange(index, text)}
                        className="mt-2  text-[16px]"
                        multiline
                        maxLength={100}
                        style={{
                          color: activeColors.gray,
                        }}
                      />
                      <TouchableOpacity
                        className="mt-2"
                        onPress={() => uploadImage()}
                      >
                        <MaterialCommunityIcons
                          name="image"
                          size={25}
                          color={activeColors.gray}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {item.image && (
                    <View className="m-2">
                      <Image
                        source={{ uri: item.image }}
                        width={200}
                        height={300}
                        resizeMethod="auto"
                        style={{
                          borderRadius: 10,
                          width: 300,
                          height: 200,
                          alignSelf: "flex-end",
                        }}
                        alt=""
                      />
                    </View>
                  )}
                  {index === activeIndex && (
                    <View className="flex-row m-3 w-full items-start mt-5 opacity-7">
                      <Image
                        source={{ uri: user?.avatar?.url }}
                        style={{ width: 30, height: 30 }}
                        borderRadius={100}
                      />
                      <StyledText className="pl-3 " onPress={addNewThread}>
                        <StyledText bold big>
                          +
                        </StyledText>{" "}
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
          <StyledText medium className=" px-1 py-1" bold>
            Anyone can reply
          </StyledText>
          <TouchableOpacity onPress={createPost}>
            <View
              className="px-3 py-2 rounded-md  flex-row items-center"
              style={{ backgroundColor: activeColors.accent }}
            >
              <StyledText
                style={{
                  color: activeColors.grayAccent,
                }}
                className="text-white"
                bold
              >
                Post
              </StyledText>
              {isLoading && (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={{ marginLeft: 5 }}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </MainContainer>
    </View>
  );
}
