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
import ImportantUpdateListing from "@/components/home/update/importantUpdateListing";

type Props = {};

const update = (props: Props) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user, token, users } = useSelector((state: any) => state.user);
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: activeColors.primary,

        paddingTop: 20,
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
        onPress={() => router.replace("/home")}
      >
        <MaterialCommunityIcons color={activeColors.tint} name="arrow-left" />
        <StyledText small> Back</StyledText>
      </Pressable>
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginBottom: 20,
            backgroundColor: activeColors.secondary,
            borderBottomColor: activeColors.grayAccent,
            borderBottomWidth: 1,
            padding: 20,
          }}
        >
          <StyledText big>Information and Campus Update</StyledText>
          <StyledText
            small
            style={{
              color: activeColors.gray,
            }}
          >
            Important information from the university and your department
          </StyledText>
        </View>
        <ScrollView
          contentContainerStyle={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingHorizontal: 20,
          }}
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <ImportantUpdateListing />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default update;

const styles = StyleSheet.create({});
