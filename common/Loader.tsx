import MainContainer from "@/components/container/MainContainer";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";

import { ActivityIndicator, Dimensions, View } from "react-native";

type Props = {};

const Loader = (props: Props) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <MainContainer
      style={{
        flex: 1,
        height: "100%",
        width: "100%",

        backgroundColor: activeColors.primary,
      }}
    >
      <View
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: activeColors.primary,
        }}
      >
        <StatusBar
          // backgroundColor={activeColors.primary}
          style={theme.mode === "dark" ? "light" : "dark"}
        />
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            size="large"
            color={theme.mode === "dark" ? "#374151" : "#e5e7eb"}
          />
        </View>
      </View>
    </MainContainer>
  );
};

export default () => {
  return <Loader />;
};
