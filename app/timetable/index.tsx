import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import MainContainer from "@/components/container/MainContainer";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const index = (props: Props) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const { isAuthenticated, loading } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  return (
    <MainContainer>
      <Text>index</Text>
    </MainContainer>
  );
};

export default index;

const styles = StyleSheet.create({});
