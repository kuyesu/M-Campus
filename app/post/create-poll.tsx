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
import RNAnimated from "react-native-animated-component";
import RNPoll, { IChoice } from "react-native-poll";
import { router } from "expo-router";
import StyledView from "@/components/View/StyledView";
type Props = {
  navigation: any;
};

const CreatePoll = ({ navigation }: Props) => {
  const { user } = useSelector((state: any) => state.user);
  const { isSuccess, isLoading, posts } = useSelector(
    (state: any) => state.post
  );
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

  const choices: Array<IChoice> = [
    { id: 1, choice: "Yes", votes: 12 },
    { id: 2, choice: "No", votes: 1 },
    { id: 3, choice: "Nuetral", votes: 3 },
  ];

  const createPost = () => {
    if (title !== "" || (image !== "" && !isLoading)) {
      createPostAction(title, image, user, replies)(dispatch);
    }
    if (isSuccess) {
      const post = posts.find((post: any) => post.user._id === user._id);
      console.log(post._id);
      if (post) {
        // wait for 1 second
        setTimeout(() => {
          router.push({
            pathname: `/post/${post._id}`,
            params: {
              postId: post._id,
            },
          });
        }, 1000);
      }
    }
  };

  return (
    <MainContainer className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="m-3 flex-[1] justify-between py-2 px-2">
          <View>
            {/* create post */}
            <View className="mt-3 flex-row">
              <Image
                source={{ uri: user?.avatar.url }}
                style={{ width: 40, height: 40 }}
                borderRadius={100}
              />
              <View className="pl-3">
                <View className="w-[75%] flex-row justify-between">
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
              </View>
            </View>
            <StyledTextInput
              placeholder="What do you want to talk about?"
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
                paddingHorizontal: 0,
                paddingLeft: 0,
                backgroundColor: activeColors.primary,
              }}
              multiline={true}
              // rows={5}
              verticalAlign="top"
              textAlignVertical="top"
            />
            <StyledView
              className="h-full w-full "
              style={{
                backgroundColor: activeColors.primary,

                flex: 1,
              }}
              big
            >
              <RNPoll
                totalVotes={30}
                choices={choices}
                onChoicePress={(selectedChoice: IChoice) =>
                  console.log("SelectedChoice: ", selectedChoice)
                }
                text={"Which brand do you prefer?"}
                onPress={function (): void {
                  throw new Error("Function not implemented.");
                }}
                style={{
                  backgroundColor: activeColors.primary,
                  borderRadius: 5,
                  borderColor: activeColors.grayAccent,
                  borderWidth: 1,
                  padding: 10,
                  paddingTop: 10,
                }}
                choiceTextStyle={{
                  color: activeColors.tint,
                  fontSize: 14,
                  fontWeight: "600",
                }}
                percentageTextStyle={{
                  color: activeColors.tint,
                  fontSize: 14,
                  fontWeight: "600",
                }}
                pollId={0}
                percentage={100}
                PollContainer={RNAnimated}
                PollItemContainer={RNAnimated}
              />
            </StyledView>
          </View>
        </View>
      </ScrollView>
      <View className="p-2 flex-row justify-between pb-8 px-4">
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
            Create Poll
          </StyledText>
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

export default CreatePoll;
