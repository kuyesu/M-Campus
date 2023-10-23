import {
  FlatList,
  Animated,
  Easing,
  RefreshControl,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/redux/actions/postAction";
import PostCard from "@/components/feed/PostCard";
import Loader from "@/common/Loader";
import Lottie from "lottie-react-native";
import { getAllUsers } from "@/redux/actions/userAction";
import { Platform } from "react-native";
import MainContainer from "@/components/container/MainContainer";

import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
const loader = require("@/assets/animation_lkbqh8co.json");

type Props = {
  navigation: any;
};

export default function PostScreen(props: Props) {
  const { posts, isLoading } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  const [offsetY, setOffsetY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extraPaddingTop] = useState(new Animated.Value(0));
  const refreshingHeight = 100;
  const lottieViewRef = useRef<Lottie>(null);

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  let progress = 0;
  if (offsetY < 0 && !isRefreshing) {
    const maxOffsetY = -refreshingHeight;
    progress = Math.min(offsetY / maxOffsetY, 1);
  }

  function onScroll(event: any) {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
    setOffsetY(y);
  }

  function onRelease() {
    if (offsetY <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        getAllPosts()(dispatch);
        setIsRefreshing(false);
      }, 3000);
    }
  }

  function onScrollEndDrag(event: any) {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
    setOffsetY(y);

    if (y <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        getAllPosts()(dispatch);
        setIsRefreshing(false);
      }, 3000);
    }
  }

  useEffect(() => {
    getAllPosts()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (isRefreshing) {
      Animated.timing(extraPaddingTop, {
        toValue: refreshingHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();
      lottieViewRef.current?.play();
    } else {
      Animated.timing(extraPaddingTop, {
        toValue: 0,
        duration: 400,
        easing: Easing.elastic(1.3),
        useNativeDriver: false,
      }).start();
    }
  }, [isRefreshing]);

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: activeColors.primary,
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <MainContainer>
          <Lottie
            ref={lottieViewRef}
            style={{
              height: refreshingHeight,
              display: isRefreshing ? "flex" : "none",
              position: "absolute",
              top: 15,
              left: 0,
              right: 0,
              backgroundColor: activeColors.primary,
            }}
            loop={false}
            source={loader}
            progress={progress}
          />
          {/* custom loader not working in android that's why I used here built in loader for android and custom loader for android but both working perfectly */}
          {Platform.OS === "ios" ? (
            <FlatList
              data={posts}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <PostCard navigation={props.navigation} item={item} />
              )}
              onScroll={onScroll}
              onScrollEndDrag={onScrollEndDrag}
              onResponderRelease={onRelease}
              ListHeaderComponent={
                <Animated.View
                  style={{
                    paddingTop: extraPaddingTop,
                  }}
                />
              }
            />
          ) : (
            <FlatList
              data={posts}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <PostCard navigation={props.navigation} item={item} />
              )}
              onScroll={onScroll}
              onScrollEndDrag={onScrollEndDrag}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    setRefreshing(true);
                    getAllPosts()(dispatch);
                    getAllUsers()(dispatch).then(() => {
                      setRefreshing(false);
                    });
                  }}
                  progressViewOffset={refreshingHeight}
                />
              }
              onResponderRelease={onRelease}
              ListHeaderComponent={
                <Animated.View
                  style={{
                    paddingTop: extraPaddingTop,
                  }}
                />
              }
            />
          )}
          {/* add post button */}
        </MainContainer>
      )}
      <View
        className="absolute bottom-2 right-2 "
        style={{
          zIndex: 1111,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: activeColors.primary,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
          }}
          onPress={() => router.push("/post/create-post")}
        >
          <MaterialCommunityIcons
            name="pencil-plus-outline"
            size={30}
            lineBreakStrategyIOS="hangul-word"
            color={activeColors.accent}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
