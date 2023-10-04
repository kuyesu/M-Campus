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
import MainContainer from "@/components/container/MainContainer";
import StyledText from "@/components/Text/StyledText";

const SubmitTicket = ({ slides = [], onDone }) => {
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
    <MainContainer
      style={{
        display: "flex",
        flexDirection: "column",
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
          <View
            style={{
              width: width - 20,
              height: height - 70,
              // paddingHorizontal: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            className="py-4"
          >
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
        style={[styles.leftButton]}
        className="flex flex-row  items-center w-full gap-2.5 justify-between "
      >
        {currentSlideIndex > 0 && currentSlideIndex && (
          <>
            {currentSlideIndex < slides.length && -1 && (
              <TouchableOpacity
                onPress={handlePrevious}
                style={{
                  borderColor: activeColors.accent,
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                }}
                className=" relative top-1.5  w-1/2 items-center justify-center font-bold  "
              >
                <StyledText className="font-semibold  text-lg">
                  Previous
                </StyledText>
              </TouchableOpacity>
            )}
          </>
        )}

        {currentSlideIndex < slides.length - 1 ? (
          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: activeColors.accent,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            className="  items-center flex-1 justify-center  font-bold  "
          >
            <StyledText className="font-semibold text-black text-lg">
              Next
            </StyledText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onDone}
            style={{
              backgroundColor: activeColors.accent,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            className="  items-center flex-1 justify-center  font-bold  "
          >
            <StyledText className="font-semibold text-black text-lg">
              Submit
            </StyledText>
          </TouchableOpacity>
        )}
      </View>
    </MainContainer>
  );
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  indicatorContainer: {
    position: "absolute",
    width,
    top: 25,
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
  leftButton: {
    position: "absolute",
    left: 10,
    bottom: 30,
  },
});

export default SubmitTicket;
