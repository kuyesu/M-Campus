import { View, Text } from "react-native";

import styles from "./about.style";

import StyledText from "@/components/Text/StyledText";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { useContext } from "react";

const About = ({ info }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: activeColors.secondary,
        },
      ]}
    >
      <StyledText style={{}}>About the job:</StyledText>

      <View style={styles.contentBox}>
        <StyledText style={styles.contextText}>{info}</StyledText>
      </View>
    </View>
  );
};

export default About;
