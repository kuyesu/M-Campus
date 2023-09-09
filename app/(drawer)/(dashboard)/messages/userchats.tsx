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
import React, { useContext } from "react";
import MainContainer from "@/components/container/MainContainer";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import chats from "@/data/active";
import { Link, router } from "expo-router";
import StyledText from "@/components/Text/StyledText";
import { FlashList } from "@shopify/flash-list";

export default function userchats() {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

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
        <View style={{ flexDirection: "row", paddingBottom: 20 }}>
          <StyledTextInput
            small
            bigPadding
            inlineImageLeft="search_icon"
            placeholder="Search for user"
            style={{
              width: "100%",
              padding: Platform.OS === "ios" ? 6 : 6,
            }}
          />
          <AntDesign
            name="search1"
            size={20}
            color={activeColors.primary}
            style={{
              position: "relative",
              right: 35,
              top: 10,
            }}
          />
        </View>
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

                  gap: 5,
                }}
              >
                <View>
                  <Pressable onPress={() => router.push}>
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
      <ScrollView
        style={[
          {
            backgroundColor: activeColors.primary,
            paddingHorizontal: 20,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingVertical: 30,
          }}
        >
          <FlatList
            data={chats}
            initialNumToRender={5}
            //   estimatedItemSize={100}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Link
                href={{
                  pathname: "/messages/[id]",
                  params: { id: item.id },
                }}
                // href={{
                //   pathname: "/messages/[id]",
                //   params: { id: item.id },
                // }}
                asChild
              >
                <Pressable
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    //   justifyContent: "center",

                    gap: 5,
                    marginTop: 20,
                  }}
                >
                  <View>
                    <Pressable>
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
                </Pressable>
              </Link>
            )}
          />
        </View>
      </ScrollView>
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
