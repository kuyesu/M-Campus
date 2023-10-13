import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import { colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";

// themem context
import { ThemeContext } from "@/context/themeContext";

const MainContainer = ({ children, style, ...props }: any) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[
          {
            backgroundColor: activeColors.primary,
          },
          style,
        ]}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
        <StatusBar
          // backgroundColor={activeColors.primary}
          style={theme.mode === "dark" ? "light" : "dark"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainContainer;
