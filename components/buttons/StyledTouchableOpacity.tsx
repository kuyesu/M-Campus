import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "@/context/themeContext";
import StyledText from "../Text/StyledText";
import { colors } from "@/constants/Colors";

const StyledTouchableOpacity = ({ children,  ...props }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <TouchableOpacity {...props}>
      <View
        // Button Linear Gradient
        style={[
          styles.btn,
     
          {
            borderColor: activeColors.accent,
            backgroundColor: activeColors.accent,
          },
        ]}

      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledText
            style={{
              fontFamily: "B",
              fontSize: 20,

              color: activeColors.primary,
            }}
            bold
          >
            {children}
          </StyledText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const StyledTouchableOpacityLight = ({ children, ...props }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <TouchableOpacity {...props}>
      <View style={[styles.btn2, { borderColor: activeColors.gray }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.btnlabel2,
              { color: activeColors.tertiary, fontFamily: "B" },
            ]}
          >
            {children}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { StyledTouchableOpacity, StyledTouchableOpacityLight };

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#F4ACAC",
    paddingVertical: 10,
    width: "100%",
    alignSelf: "center",
    borderRadius: 50,
    // marginTop: "5%",
    paddingHorizontal: "10%",
    borderWidth: 2,
  },

  btn2: {
    backgroundColor: `rgba(255, 255, 255, 0.1)`,
    paddingVertical: 10,
    width: "100%",
    alignSelf: "center",
    borderRadius: 50,
    // marginTop: "5%",
    paddingHorizontal: "10%",
    // borderColor: `rgba(252, 219, 220, 0.5)`,
    borderWidth: 2,
  },
  btnlabel2: {
    fontFamily: "H",
    fontSize: 20,
    textAlign: "left",
    color: "#FFF",
  },
});
