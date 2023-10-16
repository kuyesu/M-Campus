import {
  View,
  Text,
  Platform,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import MainContainer from "@/components/container/MainContainer";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import chats from "@/data/active";
import { Link, router } from "expo-router";
import StyledText from "@/components/Text/StyledText";
import { FlashList } from "@shopify/flash-list";
import { TouchableOpacity } from "react-native";
import StyledView from "@/components/View/StyledView";
import FriendsScreen from "@/components/messages/FriendsScreen";
import RequestScreen from "@/components/messages/Requests";

export default function userchats() {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const tabs = [
    {
      name: "MiCahts",
      icon: (
        <MaterialCommunityIcons
          name="sort-variant"
          color={activeColors.tint}
          // check if is active

          size={20}
        />
      ),
    },
    {
      name: "Mi Friends",
      icon: (
        <MaterialCommunityIcons
          name="ticket-outline"
          color={activeColors.tint}
          size={20}
        />
      ),
    },
    {
      name: "Mi Requests",
      icon: (
        <MaterialCommunityIcons
          name="ticket-outline"
          color={activeColors.tint}
          size={20}
        />
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => {
      return (
        <Pressable
          onPress={() => handleTabPress(index)}
          className=" items-center justify-center "
        >
          <View
            key={index}
            style={{
              paddingHorizontal: 0,
              paddingVertical: 6,

              marginTop: 10,
              borderBottomColor:
                activeTab === index
                  ? activeColors.accent
                  : activeColors.primary,
              borderBottomWidth: activeTab === index ? 3 : 3,
            }}
            className="flex justify-center  items-center flex-row space-x-1   "
          >
            {activeTab === index ? (
              <View>
                {tab.name === "MiCahts" && (
                  <MaterialCommunityIcons
                    name="chat-outline"
                    size={20}
                    color={activeColors.accent}
                  />
                )}
                {tab.name === "Mi Friends" && (
                  <MaterialCommunityIcons
                    name="account-group-outline"
                    size={20}
                    color={activeColors.accent}
                  />
                )}
                {tab.name === "Mi Requests" && (
                  <MaterialCommunityIcons
                    name="account-multiple-plus-outline"
                    size={20}
                    color={activeColors.accent}
                  />
                )}
              </View>
            ) : (
              <View>
                {tab.name === "MiCahts" && (
                  <MaterialCommunityIcons
                    name="chat-outline"
                    size={20}
                    color={activeColors.tint}
                  />
                )}
                {tab.name === "Mi Friends" && (
                  <MaterialCommunityIcons
                    name="account-group-outline"
                    size={20}
                    color={activeColors.tint}
                  />
                )}
                {tab.name === "Mi Requests" && (
                  <MaterialCommunityIcons
                    name="account-multiple-plus-outline"
                    size={20}
                    color={activeColors.tint}
                  />
                )}
              </View>
            )}

            <StyledText
              style={{
                color:
                  activeTab === index ? activeColors.accent : activeColors.tint,
              }}
              bold
            >
              {tab.name}
            </StyledText>
          </View>
        </Pressable>
      );
    });
  };

  const renderTabContent = () => {
    return (
      <ScrollView
        style={[
          {
            backgroundColor: activeColors.primary,
            paddingHorizontal: 20,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 0 && (
          <View
            style={{
              paddingVertical: 0,
            }}
          >
            <FlatList
              data={chats}
              scrollEnabled={false}
              initialNumToRender={5}
              //   estimatedItemSize={100}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: `/messages/${item.id}`,
                      params: {
                        id: item.id,
                      },
                    })
                  }
                >
                  <View
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      //   justifyContent: "center",

                      gap: 15,
                      marginTop: 25,
                    }}
                  >
                    <View>
                      <Pressable
                        onPress={() =>
                          router.push({
                            pathname: `/messages/${item.id}`,
                            params: {
                              id: item.id,
                            },
                          })
                        }
                      >
                        {({ pressed }) => (
                          <Image
                            source={{
                              uri: item.user.image,
                            }}
                            style={[
                              styles.image,
                              {
                                opacity: pressed ? 0.5 : 1,
                                borderColor: activeColors.accent,
                                borderWidth: 0.5,
                              },
                            ]}
                          />
                        )}
                      </Pressable>
                    </View>
                    <View>
                      <StyledText bold>{item.user.name}</StyledText>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 20,
                        }}
                      >
                        <StyledText numberOfLines={1} small>
                          {item.content.substring(0, 32)}...
                        </StyledText>
                        <StyledText
                          small
                          style={{
                            color: activeColors.tertiary,
                          }}
                        >
                          {item.createdAt.substring(0, 10)}
                        </StyledText>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        {activeTab === 1 && <FriendsScreen />}
        {activeTab === 2 && <RequestScreen />}
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          position: "fixed",
          backgroundColor: activeColors.primary,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <View>
          <FlatList
            data={chats}
            horizontal
            initialNumToRender={5}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                  gap: 10,
                }}
              >
                <View>
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: `/messages/${item.id}`,
                        params: {
                          id: item.id,
                        },
                      })
                    }
                  >
                    {({ pressed }) => (
                      <Image
                        source={{
                          uri: item.user.image,
                        }}
                        style={[
                          styles.image,
                          {
                            opacity: pressed ? 0.5 : 1,
                            borderColor: activeColors.accent,
                            borderWidth: 1,
                            marginRight: 20,
                          },
                        ]}
                      />
                    )}
                  </Pressable>
                  <View
                    style={{
                      backgroundColor: activeColors.accent,
                      padding: 4,
                      position: "absolute",
                      right: 20,
                      bottom: 0,
                      borderColor: activeColors.secondary,
                      borderWidth: 2,
                      borderRadius: 50,
                    }}
                  />
                </View>
                <View>
                  <StyledText small>{item.user.name}</StyledText>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: activeColors.primary,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: activeColors.grayAccent,
          borderBottomWidth: 1,
          paddingTop: 10,
          paddingHorizontal: 30,
        }}
      >
        {renderTabs()}
      </View>
      {renderTabContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
