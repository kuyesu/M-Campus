import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/Colors";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/context/themeContext";
import { SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StyledText from "@/components/Text/StyledText";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { getTimeDurationLong } from "@/common/TimeGenerator";

type Props = {};

const importantUpdateListing = (props: Props) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user, token, users } = useSelector((state: any) => state.user);
  const router = useRouter();
  return (
    <View
      style={{
        paddingTop: 10,
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Pressable
        // onPress={() =>
        //   router.replace({
        //     pathname: `/`,
        //     params: { recepientId: item._id },
        //   })
        // }
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 10,

          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
            flex: 1,
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              resizeMode: "cover",
            }}
            source={{ uri: user?.avatar?.url }}
          />

          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <StyledText
                className=" text-ellipsis truncate"
                style={{
                  marginTop: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "80%",
                }}
                numberOfLines={1}
                bold
              >
                Some update from the university and your department
              </StyledText>
              <StyledText
                style={{ fontSize: 11, color: activeColors.gray }}
                small
              >
                {getTimeDurationLong(new Date())}
              </StyledText>
            </View>

            <StyledText
              style={{
                color: activeColors.gray,
              }}
              small
            >
              ~ {user?.name}
            </StyledText>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default importantUpdateListing;

const styles = StyleSheet.create({});
