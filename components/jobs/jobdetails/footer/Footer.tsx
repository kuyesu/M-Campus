import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./footer.style";
import StyledText from "@/components/Text/StyledText";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Footer = ({ url }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: activeColors.secondary,
          borderTopColor: activeColors.grayAccent,
          borderTopWidth: 2,
          position: "absolute",
          bottom: 0,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.likeBtn,
          {
            backgroundColor: activeColors.secondary,
            borderColor: activeColors.grayAccent,
            borderWidth: 1,
          },
        ]}
      >
        <MaterialCommunityIcons
          name="heart-outline"
          size={25}
          color={activeColors.accent}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.applyBtn,
          {
            backgroundColor: activeColors.primary,
            borderRadius: 10,
          },
        ]}
        onPress={() => Linking.openURL(url)}
      >
        <StyledText small>Apply for job</StyledText>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
