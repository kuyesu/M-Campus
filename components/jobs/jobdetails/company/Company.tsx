import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./company.style";

import { checkImageURL } from "@/utils";
import StyledText from "@/components/Text/StyledText";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { useContext } from "react";

const Company = ({ companyLogo, jobTitle, companyName, location }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: activeColors.primary,
        },
      ]}
    >
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageURL(companyLogo)
              ? companyLogo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.jobTitleBox}>
        <StyledText
          style={{
            paddingVertical: 5,
          }}
          big
        >
          {jobTitle}
        </StyledText>
      </View>

      <View style={styles.companyInfoBox}>
        <StyledText bold>{companyName} / </StyledText>
        <View style={styles.locationBox}>
          {/* <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          /> */}
          <StyledText>{location}</StyledText>
        </View>
      </View>
    </View>
  );
};

export default Company;
