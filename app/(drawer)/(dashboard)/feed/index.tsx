import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import MainContainer from "@/components/container/MainContainer";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { FlatList, Animated, Easing, RefreshControl } from "react-native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/redux/actions/postAction";
import PostCard from "@/components/feed/PostCard";
import Loader from "@/common/Loader";
import Lottie from "lottie-react-native";
import { getAllUsers } from "@/redux/actions/userAction";
import { Platform } from "react-native";
import StyledText from "@/components/Text/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
const loader = require("@/assets/animation_lkbqh8co.json");

type Props = {
  navigation: any;
};

export default function index({ navigation: props }) {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const { posts, isLoading } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  const [offsetY, setOffsetY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extraPaddingTop] = useState(new Animated.Value(0));
  const refreshingHeight = 100;
  const lottieViewRef = useRef<Lottie>(null);

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
    getAllUsers()(dispatch);
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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <MainContainer
          style={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            height: Dimensions.get("window").height - 100,
            width: "100%",
          }}
        >
          <Lottie
            ref={lottieViewRef}
            style={{
              height: refreshingHeight,
              display: isRefreshing ? "flex" : "none",
              position: "absolute",
              top: 15,
              left: 0,
              right: 0,
            }}
            loop={false}
            source={loader}
            progress={progress}
          />
          {posts.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                paddingHorizontal: 25,
                paddingVertical: 35,
              }}
            >
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  // alignItems: "center",
                  // justifyContent: "center",
                  height: "100%",
                }}
              >
                <StyledText bold large>
                  No feed available
                </StyledText>
                <TouchableOpacity
                  onPress={() => router.push("/post")}
                  style={{
                    display: "flex",
                    marginTop: 50,
                    width: 380,
                    alignSelf: "flex-start",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 400,
                    borderColor: activeColors.gray,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderStyle: "dashed",
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={50}
                    color={activeColors.gray}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
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
            </>
          )}
          {/* custom loader not working in android that's why I used here built in loader for android and custom loader for android but both working perfectly */}

          <StatusBar
            style={theme.mode === "dark" ? "light" : "dark"}
            backgroundColor={activeColors.primary}
          />
        </MainContainer>
      )}
    </>
  );
}
