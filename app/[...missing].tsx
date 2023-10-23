import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import MainContainer from "@/components/container/MainContainer";
import StyledText from "@/components/Text/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import React, { useContext } from "react";
export default function NotFoundScreen() {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <MainContainer style={styles.container}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 50,
            backgroundColor: activeColors.primary,
          }}
        >
          <MaterialCommunityIcons
            name="emoticon-sad-outline"
            size={100}
            color={activeColors.tint}
          />
        </View>
        <StyledText bold>This feature is unavailable.</StyledText>
        <Link href="/home" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </MainContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
