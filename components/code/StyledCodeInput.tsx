import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useRef } from "react";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";

const StyledCodeInput = ({
  maxLength,
  code,
  setCode,
  style,
  ...props
}: any) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const codeDigitsArray = new Array(maxLength).fill(0);
  const textInputRef = useRef(null);

     const handleOnPrss = () => {
       textInputRef?.current?.focus();
     };
  const handleOnSubmitEditing = () => {};
  const toCodeInput = (value, index) => {
    const emptyInput = " ";
    const digit = code[index] || emptyInput;


    return (
      <View
        key={index}
        style={[styles.codeInput, { borderBottomColor: activeColors.accent }]}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            color: activeColors.tint,
          }}
        >
          {digit}
        </Text>
      </View>
    );
  };
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 35,
        },
      ]}
    >
      <Pressable onPress={handleOnPrss} style={styles.codeInputContainer}>
        {codeDigitsArray.map(toCodeInput)}
      </Pressable>
      <TextInput
        ref={textInputRef}
        style={[
          {
            opacity: 0,
            width: 1,
            height: 1,
            position: "absolute",
          },
        ]}
        value={code}
        onChange={setCode}
        maxLength={maxLength}
        onSubmitEditing={handleOnSubmitEditing}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  codeInputContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  codeInput: {
    maxWidth: "15%",
    borderBottomWidth: 5,
    padding: 12,
    borderRadius: 10,
    borderColor: "",
  },
});

export default StyledCodeInput;
