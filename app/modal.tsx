import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import MainContainer from "@/components/container/MainContainer";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getNotifications } from "@/redux/actions/notificationAction";
import { useDispatch, useSelector } from "react-redux";
import getTimeDuration from "@/common/TimeGenerator";
import axios from "axios";
import { URI } from "@/redux/URI";
import Loader from "@/common/Loader";
import StyledText from "@/components/Text/StyledText";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  navigation: any;
};

export default function ModalScreen() {
  const dispatch = useDispatch();
  const { notifications, isLoading } = useSelector(
    (state: any) => state.notification
  );
  const [refreshing, setRefreshing] = useState(false);
  const { posts } = useSelector((state: any) => state.post);
  const { token, users } = useSelector((state: any) => state.user);
  const [active, setActive] = useState(0);
  const refreshingHeight = 100;

  const labels = ["All", "Replies", "Mentions"];

  const handleTabPress = (index: number) => {
    setActive(index);
  };

  useEffect(() => {
    getNotifications()(dispatch);
  }, []);

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <MainContainer style={styles.container}>
      <View className="p-3 mb-[190px]">
        <StyledText className="" bold>
          Activity
        </StyledText>
        <View className="w-full flex-row my-3 justify-between">
          {labels.map((label, index) => (
            <TouchableOpacity
              key={index}
              className="w-[105px] h-[38px] "
              style={{
                backgroundColor:
                  active === index
                    ? activeColors.secondary
                    : activeColors.grayAccent,
                borderWidth: active === index ? 1 : 0,
                borderColor: activeColors.grayAccent,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => handleTabPress(index)}
            >
              <StyledText
                className={`text-center `}
                style={{
                  color:
                    active !== index ? activeColors.tint : activeColors.gray,
                }}
              >
                {label}
              </StyledText>
            </TouchableOpacity>
          ))}
        </View>

        {/* All activites */}
        {active === 0 && notifications.length === 0 && (
          <View className="w-full h-[80px] flex items-center justify-center">
            <StyledText className="mt-5">You have no activity yet!</StyledText>
          </View>
        )}

        {/* All Replies */}
        {active === 1 && (
          <View className="w-full h-[80px] flex items-center justify-center">
            <StyledText className=" mt-5">You have no replies yet!</StyledText>
          </View>
        )}

        {/* All Replies */}
        {active === 2 && (
          <View className="w-full h-[80px] flex items-center justify-center">
            <StyledText className=" mt-5">You have no mentions yet!</StyledText>
          </View>
        )}

        {active === 0 && (
          <FlatList
            data={notifications}
            style={{ width: "100%", marginTop: 10 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  getNotifications()(dispatch).then(() => {
                    setRefreshing(false);
                  });
                }}
                progressViewOffset={refreshingHeight}
              />
            }
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const time = item.createdAt;
              const formattedDuration = getTimeDuration(time);

              const handleNavigation = async (e: any) => {
                const id = item.creator._id;

                await axios
                  .get(`${URI}/get-user/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((res) => {
                    if (item.type === "Follow") {
                      // navigation.navigate("UserProfile", {
                      //   item: res.data.user,
                      // });
                    } else {
                      // navigation.navigate("PostDetails", {
                      //   data: posts.find((i: any) => i._id === item.postId),
                      // });
                    }
                  });
              };

              return (
                <TouchableOpacity
                  style={{
                    width: "100%",
                    // height: 80,
                    // borderBottomWidth: 1,
                    //
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                  onPress={() => handleNavigation(item)}
                >
                  <View className="flex-row" key={item._id}>
                    <View className="relative">
                      <Image
                        source={{
                          uri: users.find(
                            (user: any) => user._id === item.creator._id
                          )?.avatar.url,
                        }}
                        width={40}
                        height={40}
                        borderRadius={100}
                      />
                      {item.type === "Like" && (
                        <View
                          className="absolute bottom-5 border-[2px]  right-[-5px]  rounded-full items-center justify-center flex-row"
                          style={{
                            backgroundColor: activeColors.danger,
                            borderColor: activeColors.primary,
                            height: 25,
                            width: 25,
                          }}
                        >
                          <MaterialCommunityIcons
                            name="heart"
                            size={15}
                            color="#fff"
                          />
                        </View>
                      )}

                      {item.type === "Follow" && (
                        <View
                          style={{
                            backgroundColor: activeColors.purple,
                            borderColor: activeColors.primary,
                            height: 25,
                            width: 25,
                          }}
                          className="absolute bottom-5 border-[2px]  right-[-5px]  bg-[#5a49d6] rounded-full items-center justify-center flex-row"
                        >
                          <MaterialCommunityIcons
                            name="account-plus"
                            size={15}
                            color="#fff"
                          />
                        </View>
                      )}
                    </View>
                    <View className="pl-3 my-2">
                      <View
                        className="flex-row w-full items-center border-b pb-3 "
                        style={{
                          borderBottomColor: activeColors.grayAccent,
                        }}
                      >
                        <View className="w-full">
                          <View className="flex-row items-center">
                            <StyledText className="" bold>
                              {item.creator.name}
                            </StyledText>
                            <StyledText className="pl-2  text-right" bold>
                              {formattedDuration}
                            </StyledText>
                          </View>
                          <StyledText className=" text-ellipsis">
                            {item.title}
                          </StyledText>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
