// @ts-nocheck
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { checkImageURL } from "@/utils";
import styles from "./popularjobcard.style.js";
import { ThemeContext } from "@/context/themeContext";

import StyledText from "@/components/Text/StyledText";
import { colors } from "@/constants/Colors";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <TouchableOpacity
      style={[
        styles.container(item),
        {
          borderRadius: 15,
          borderColor: activeColors.gray,
          borderWidth: 1,
          backgroundColor:
            selectedJob === item.job_id
              ? activeColors.grayAccent
              : activeColors.primary,
        },
      ]}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: checkImageURL(item?.employer_logo)
              ? item.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={{
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor:
              selectedJob === item.job_id
                ? activeColors.primary
                : activeColors.primary,
          }}
        />
      </TouchableOpacity>
      <StyledText
        style={{
          color:
            selectedJob === item.job_id ? activeColors.tint : activeColors.tint,
          paddingTop: 10,
        }}
        bold
        numberOfLines={1}
      >
        {item.employer_name}
      </StyledText>

      <View style={styles.infoContainer}>
        <StyledText
          style={{
            color:
              selectedJob === item.job_id
                ? activeColors.tint
                : activeColors.tint,
          }}
          numberOfLines={1}
          bold
        >
          {item?.job_title}
        </StyledText>
        <View style={styles.infoWrapper}>
          {/* <Text style={styles.publisher(selectedJob, item)}>
            {item?.job_publisher} -
          </Text> */}
          <StyledText
            style={{
              color:
                selectedJob === item.job_id
                  ? activeColors.tint
                  : activeColors.gray,
            }}
          >
            {" "}
            {item?.job_country}
          </StyledText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
