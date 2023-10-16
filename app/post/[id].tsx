import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import PostDetailsCard from "@/components/feed/PostDetailsCard";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "@/components/Text/StyledText";

type Props = {
  navigation: any;
  route: any;
};

const PostDetailsScreen = ({ navigation, route }: Props) => {
  const params = useLocalSearchParams();
  const { postId }: any = params;
  const { posts } = useSelector((state: any) => state.post);

  useEffect(() => {
    if (posts) {
      const d = posts.find((i: any) => i._id === postId);
    }
  }, [posts]);

  const post = posts.find((post: any) => post._id === postId);
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <SafeAreaView
      style={{
        backgroundColor: activeColors.primary,
      }}
    >
      <View className="relative flex-col justify-between">
        <View className="h-[102%]">
          <ScrollView showsVerticalScrollIndicator={false}>
            <PostDetailsCard
              navigation={navigation}
              item={post}
              postId={post._id}
            />
            <View>
              {post?.replies?.map((i: any, index: number) => {
                return (
                  <PostDetailsCard
                    navigation={navigation}
                    item={i}
                    key={index}
                    isReply={true}
                    postId={post._id}
                  />
                );
              })}
              <View className="mb-[150px]"></View>
            </View>
          </ScrollView>
        </View>
        <View
          className="absolute bottom-8 flex-row w-full justify-center  h-[60px] items-center"
          style={{
            backgroundColor: activeColors.secondary,
          }}
        >
          <TouchableOpacity
            className="w-[92%]  h-[30px]  flex-row items-center"
            onPress={() =>
              navigation.replace("CreateReplies", {
                item: post,
                navigation: navigation,
              })
            }
          >
            <Image
              source={{ uri: post?.user?.avatar?.url }}
              width={30}
              height={30}
              borderRadius={50}
              className="ml-3 mr-3"
            />
            <StyledText className="text-[16px] ">
              Reply to {post.user.name}
            </StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostDetailsScreen;
