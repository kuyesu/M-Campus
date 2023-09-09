import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "@/constants/Colors";
import StyledText from "../Text/StyledText";
const NewsItem = ({ image,title, ...props }: any) => {
  const activeColors = colors;
  return (
    <TouchableOpacity
      style={[{ backgroundColor: activeColors.secondary }, styles.container]}
      {...props}
    >
          <Image source={image} />
          <StyledText style={[{color: activeColors.accent}, styles.title]} bold>{title}</StyledText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 370,
    width: 300,
    borderRadius: 25,
    marginRight: 20,
  },
  image: { height: 190, width: 300, borderRadius: 25 },
    title: {
      fontSize: 19
  }
});

export default NewsItem;
