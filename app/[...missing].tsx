import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import MainContainer from "@/components/container/MainContainer";
import StyledText from "@/components/Text/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import React, { useContext } from "react";
import { Image } from "react-native";
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
          <Image
            source={require("@/assets/images/preview.png")}
            height={10}
            width={10}
            style={{ height: 150, width: 150 }}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 20,
              backgroundColor: activeColors.primary,
            }}
          >
            <StyledText bold>
              We are working on it. Check again later!
            </StyledText>
            <Link href="/home" style={styles.link}>
              <Text style={styles.linkText}>Go back!</Text>
            </Link>
          </View>
        </View>
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
