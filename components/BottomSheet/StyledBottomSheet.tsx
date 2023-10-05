import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";

import { BottomSheetModal } from "@gorhom/bottom-sheet";

const StyledBottomSheet = ({
  children,
  bottomSheetModalRef,
  snapPoints,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backgroundStyle={{
        borderRadius: 15,
        backgroundColor: activeColors.secondary,
      }}
      handleIndicatorStyle={{
        backgroundColor: activeColors.accent,
      }}
      backdropComponent={({ style }) => (
        <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.9)" }]} />
      )}
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
};

export default StyledBottomSheet;

const styles = StyleSheet.create({});
