import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { router } from "expo-router";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "../Text/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledView from "../View/StyledView";
import { FlatList, Animated, Easing, RefreshControl } from "react-native";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "@/redux/actions/ticketAction";
import Loader from "@/common/Loader";
import Lottie from "lottie-react-native";
import { getAllUsers } from "@/redux/actions/userAction";
import { Platform } from "react-native";
const loader = require("@/assets/animation_lkbqh8co.json");

const TicketListingScreen = () => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { tickets, isLoadingTicket } = useSelector(
    (state: any) => state.ticket
  );
  const [data, setData] = useState([]);
  const { user } = useSelector((state: any) => state.user);
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
        getAllTickets()(dispatch);
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
        getAllTickets()(dispatch);
        setIsRefreshing(false);
      }, 3000);
    }
  }
  useEffect(() => {
    if (tickets && user) {
      const myPosts = tickets.filter(
        (tcikect: any) => tcikect.user._id === user._id
      );
      setData(myPosts);
    }
  }, [tickets, user]);

  useEffect(() => {
    getAllTickets()(dispatch);
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

  if (isLoadingTicket) {
    return <Loader />;
  }

  // get time for a single ticket
  const getTimeDuration = (time: any) => {
    const today = new Date();
    const date = new Date(time);
    const diff = today.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else {
      return "Just now";
    }
  };

  // const formattedDuration = getTimeDuration(time);

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: activeColors.primary }]}
      >
        {Platform.OS === "ios" ? (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.ticketItem,
                  { backgroundColor: activeColors.secondary },
                ]}
                className="    "
                onPress={() => router.push(`/inquiries/${item.id}`)}
              >
                <View style={{}} className=" flex-1 rounded-3xl py-4 w-full ">
                  <View className="flex flex-row pb-4 justify-between items-center ">
                    <View className=" items-center space-x-2 flex flex-row">
                      <MaterialCommunityIcons
                        size={20}
                        strokeWidth={2}
                        color={activeColors.accent}
                        name="calendar-month-outline"
                      />
                      <StyledText>
                        {/* {new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })} */}
                        {getTimeDuration(item.createdAt)}
                      </StyledText>
                    </View>
                  </View>

                  <StyledView
                    className="  rounded-md border  w-full "
                    style={{ borderColor: activeColors.grayAccent }}
                  >
                    <View
                      style={[
                        {
                          flexDirection: "column",
                          alignItems: "flex-start",
                          paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                          // paddingVertical: Platform.OS === "ios" ? 10 : 5,
                          // borderRadius: 5,
                          marginRight: 0,
                          marginTop: 10,
                        },
                        { borderWidth: 0, borderLeftWidth: 5 },
                        { borderColor: activeColors.accent },
                      ]}
                      className="py-4 "
                    >
                      <View />
                      <View className="flex px-4 pb-2 flex-row justify-between items-center w-full">
                        <StyledText bold>{item.assignedToUser.name}</StyledText>
                        <MaterialCommunityIcons
                          size={20}
                          strokeWidth={2}
                          color={activeColors.accent}
                          name="star"
                        />
                      </View>
                      <View className="flex px-4 flex-row justify-between items-center w-full">
                        <Text
                          className=" font-semibold"
                          style={{
                            color: activeColors.accent,
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        {
                          flexDirection: "column",
                          alignItems: "flex-start",
                          paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                          // paddingVertical: Platform.OS === "ios" ? 10 : 5,
                          // borderRadius: 5,
                          marginRight: 0,
                          marginTop: 10,
                        },
                        {
                          borderColor: "#041633",
                          borderWidth: 0,
                          borderLeftWidth: 5,
                        },
                      ]}
                      className="py-4  "
                    >
                      <View />
                      <View className="flex pb-2 flex-row justify-between items-center px-4 space-x-5 ">
                        <View className=" items-center space-x-2 flex flex-row">
                          <MaterialCommunityIcons
                            size={15}
                            strokeWidth={2}
                            color={activeColors.gray}
                            name="email"
                          />
                          <Text
                            className="text-xs "
                            style={{
                              color: activeColors.gray,
                            }}
                          >
                            {item.assignedToUser.email}
                          </Text>
                        </View>
                        <View className=" items-center space-x-2 flex flex-row">
                          <MaterialCommunityIcons
                            size={15}
                            strokeWidth={2}
                            color={activeColors.gray}
                            name="account"
                          />
                          <Text
                            className="text-xs "
                            style={{
                              color: activeColors.gray,
                            }}
                          >
                            {item.assignedToUser.role.position}
                          </Text>
                        </View>
                      </View>
                      <View className="flex flex-row justify-between items-center px-4">
                        <View className=" items-center space-x-2 flex flex-row">
                          <MaterialCommunityIcons
                            size={15}
                            strokeWidth={2}
                            color={activeColors.gray}
                            name="check-circle-outline"
                          />
                          <Text
                            className=" font-medium capitalize"
                            style={{
                              color: activeColors.gray,
                            }}
                          >
                            {item.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </StyledView>
                </View>
              </TouchableOpacity>
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
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.ticketItem,
                  { backgroundColor: activeColors.secondary },
                ]}
                className="    "
                onPress={() => router.push(`/inquiries/${item.id}`)}
              >
                <View style={{}} className=" flex-1 rounded-3xl py-4 w-full ">
                  <View className="flex flex-row pb-4 justify-between items-center ">
                    <View className=" items-center space-x-2 flex flex-row">
                      <MaterialCommunityIcons
                        size={20}
                        strokeWidth={2}
                        color={activeColors.accent}
                        name="calendar-month-outline"
                      />
                      <StyledText>
                        {/* {new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })} */}
                        {getTimeDuration(item.createdAt)}
                      </StyledText>
                    </View>
                  </View>

                  <StyledView
                    className="  rounded-md border  w-full "
                    style={{ borderColor: activeColors.grayAccent }}
                  >
                    <View
                      style={[
                        {
                          flexDirection: "column",
                          alignItems: "flex-start",
                          paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                          // paddingVertical: Platform.OS === "ios" ? 10 : 5,
                          // borderRadius: 5,
                          marginRight: 0,
                          marginTop: 10,
                        },
                        { borderWidth: 0, borderLeftWidth: 5 },
                        { borderColor: activeColors.accent },
                      ]}
                      className="py-4 "
                    >
                      <View />
                      <View className="flex px-4 pb-2 flex-row justify-between items-center w-full">
                        <StyledText bold>{item.assignedToUser.name}</StyledText>
                        <MaterialCommunityIcons
                          size={20}
                          strokeWidth={2}
                          color={activeColors.accent}
                          name="star"
                        />
                      </View>
                      <View className="flex px-4 flex-row justify-between items-center w-full">
                        <Text
                          className=" font-semibold"
                          style={{
                            color: activeColors.accent,
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        {
                          flexDirection: "column",
                          alignItems: "flex-start",
                          paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                          // paddingVertical: Platform.OS === "ios" ? 10 : 5,
                          // borderRadius: 5,
                          marginRight: 0,
                          marginTop: 10,
                        },
                        {
                          borderColor: "#041633",
                          borderWidth: 0,
                          borderLeftWidth: 5,
                        },
                      ]}
                      className="py-4  "
                    >
                      <View />
                      <View className="flex pb-2 flex-row justify-between items-center px-4 space-x-5 ">
                        <View className=" items-center space-x-2 flex flex-row">
                          <MaterialCommunityIcons
                            size={15}
                            strokeWidth={2}
                            color={activeColors.gray}
                            name="email"
                          />
                          <Text
                            className="text-xs "
                            style={{
                              color: activeColors.gray,
                            }}
                          >
                            {item.assignedToUser.email}
                          </Text>
                        </View>
                        <View className=" items-center space-x-2 flex flex-row">
                          <MaterialCommunityIcons
                            size={15}
                            strokeWidth={2}
                            color={activeColors.gray}
                            name="account"
                          />
                          <Text
                            className="text-xs "
                            style={{
                              color: activeColors.gray,
                            }}
                          >
                            {item.assignedToUser.role.position}
                          </Text>
                        </View>
                      </View>
                      <View className="flex flex-row justify-between items-center px-4">
                        <View className=" items-center space-x-2 flex flex-row">
                          <MaterialCommunityIcons
                            size={15}
                            strokeWidth={2}
                            color={activeColors.gray}
                            name="check-circle-outline"
                          />
                          <Text
                            className=" font-medium capitalize"
                            style={{
                              color: activeColors.gray,
                            }}
                          >
                            {item.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </StyledView>
                </View>
              </TouchableOpacity>
            )}
            onScroll={onScroll}
            onScrollEndDrag={onScrollEndDrag}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  getAllTickets()(dispatch);
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 16,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#ff5722",
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  ticketItem: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginBottom: 2,
    marginTop: 16,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  ticketItemLeft: {
    flex: 1,
  },
  ticketId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ticketSubject: {
    fontSize: 14,
    marginBottom: 4,
  },
  ticketDetails: {
    fontSize: 12,
    color: "#666",
  },
  ticketItemRight: {
    marginLeft: 0,
    alignItems: "flex-end",
  },
  ticketDate: {
    fontSize: 12,
    color: "#666",
  },
});

export default TicketListingScreen;
