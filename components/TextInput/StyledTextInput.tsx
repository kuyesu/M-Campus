import { TextInput } from "react-native";
import React, { useContext } from "react";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { KeyboardAvoidingView } from "react-native";

const StyledTextInput = ({
  style,
  small,
  big,
  bold,
  smallestPadding,
  smallPadding,
  bigPadding,
  smallRadius,
  bigRadius,
  ...props
}: any) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <TextInput
      keyboardAppearance={theme.mode}
      style={[
        {
          color: activeColors.tint,
          fontSize: small ? 14 : big ? 24 : 16,
          fontWeight: bold || big ? "bold" : "normal",
          backgroundColor: activeColors.secondary,
          borderColor: activeColors.primary,
          borderWidth: 1,
          padding: smallestPadding
            ? 3
            : smallPadding
            ? 5
            : bigPadding
            ? 24
            : 16,
          borderRadius: smallRadius ? 5 : bigRadius ? 15 : 50,
          paddingLeft: 20,
        },
        style,
      ]}
      placeholderTextColor={activeColors.gray}
      {...props}
    />
  );
};

export default StyledTextInput;
