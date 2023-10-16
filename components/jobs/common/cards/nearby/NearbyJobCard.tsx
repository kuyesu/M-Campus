import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "@/utils";
import { ThemeContext } from "@/context/themeContext";

import StyledText from "@/components/Text/StyledText";
import { colors } from "@/constants/Colors";
import { useContext } from "react";

const NearbyJobCard = ({ job, handleNavigate }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <TouchableOpacity
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        borderRadius: 15,
        marginVertical: 5,
        backgroundColor: activeColors.secondary,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
      }}
      onPress={handleNavigate}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(job.employer_logo)
              ? job.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <StyledText style={{}} bold numberOfLines={1}>
          {job?.job_title}
        </StyledText>

        <StyledText
          style={{
            fontSize: 12,
            paddingTop: 5,
          }}
        >
          {job?.job_employment_type}
        </StyledText>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
