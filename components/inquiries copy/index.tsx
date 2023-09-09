import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState, useCallback, useEffect, useContext } from "react";

// components
import MainContainer from "@/components/container/MainContainer";
import StyledText from "@/components/Text/StyledText";
import NativeRasa from "@/components/NativeRasa";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";

export default function TabOneScreen() {
  const HOST = "http://localhost:5005";
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: activeColors.primary,
        },
        styles.container,
      ]}
    >
      <NativeRasa
        host={HOST}
        onSendMessFailed={(error) => console.log(error)}
        emptyResponseMessage="Sorry, I don't understand"
        onEmptyResponse={() => console.log("Handle with your custom action")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
