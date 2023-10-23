import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { Image, ScrollView } from "moti";
import ImportantUpdateDetails from "@/components/home/update/ImportantUpdateDetails";

type Props = {};

const importantupdate = (props: Props) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: activeColors.primary,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: activeColors.primary,
          width: "100%",
          height: "100%",
        }}
      >
        <ImportantUpdateDetails />
      </ScrollView>
    </SafeAreaView>
  );
};

export default importantupdate;

const styles = StyleSheet.create({});
