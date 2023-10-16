import { View, Text } from "react-native";

import styles from "./specifics.style";
import StyledText from "@/components/Text/StyledText";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Specifics = ({ title, points }) => {
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
      <StyledText bold>{title}:</StyledText>

      <View style={styles.pointsContainer}>
        {points.map((item, index) => (
          <View style={styles.pointWrapper} key={item + index}>
            <View style={styles.pointDot} />
            <StyledText>{item}</StyledText>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Specifics;
