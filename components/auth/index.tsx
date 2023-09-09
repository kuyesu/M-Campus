import React, { useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Indicators from "./Indicators";
import Slide from "./Slide";
import { XMarkIcon } from "react-native-heroicons/outline";

import { Link, router } from "expo-router";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "../Text/StyledText";
import {
  StyledTouchableOpacity,
  StyledTouchableOpacityLight,
} from "../buttons/StyledTouchableOpacity";

const AuthPages = ({ slides = [], onDone }) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  if (!slides || !slides.length) return null;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef();

  const onViewableItemsChanged = useRef((item) => {
    const index = item.viewableItems[0].index;
    setCurrentSlideIndex(index);
  });

  const handleSkip = () => {
    // @ts-ignore
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const handlePrevious = () => {
    if (currentSlideIndex >= slides.length + 1) return;
    // @ts-ignore
    flatListRef.current.scrollToIndex({ index: currentSlideIndex - 1 });
  };

  const handleNext = () => {
    if (currentSlideIndex >= slides.length - 1) return;
    // @ts-ignore
    flatListRef.current.scrollToIndex({ index: currentSlideIndex + 1 });
  };

  const { width, height } = Dimensions.get("window");

  return (
    <View
      style={{
        paddingHorizontal: 20,
        alignItems: "center",
        height: "80%",
      }}
    >
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={slides}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item, index }) => (
          <View>
            <View className="flex flex-row justify-between items-center">
              <XMarkIcon
                color={activeColors.primary}
                size={20}
                onPress={() => router.push("/chat")}
              />
              {/* <Text className="font-medium">Step {index + 1}/4</Text> */}
            </View>
            <Slide item={item} />
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />

      <View style={styles.indicatorContainer}>
        <Indicators
          currentSlideIndex={currentSlideIndex}
          indicatorCount={slides.length}
        />
      </View>
      <View
        // style={}
        className="flex flex-row  items-center w-full gap-4 justify-between "
      >
        {/* {currentSlideIndex > 0 && currentSlideIndex && (
          <> */}
       
        {currentSlideIndex < slides.length - 1 ? (
          <StyledTouchableOpacity
            onPress={handleNext}
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            continue
          </StyledTouchableOpacity>
        ) : (
         <></>
        )}
      </View>
    </View>
  );
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  indicatorContainer: {
    position: "absolute",
    width,
    top: 70,
    left: -30,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    fontSize: 18,
    color: "white",
    letterSpacing: 2,
    backgroundColor: "#86e63b",
  },
  btn: {
    backgroundColor: "#F4ACAC",
    paddingVertical: "5%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: "10%",
    paddingHorizontal: "10%",
  },
});

export default AuthPages;
