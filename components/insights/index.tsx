import React, { useContext } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { mixPath, useVector } from "react-native-redash";

import { GraphIndex, graphs, SIZE } from "./model";
import Header from "./header";
import Cursor from "./cursor";

import { LockClosedIcon } from "react-native-heroicons/outline";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledText from "../Text/StyledText";
import MainContainer from "../container/MainContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Bar from "./bar";

const { width } = Dimensions.get("window");
const AnimatedPath = Animated.createAnimatedComponent(Path);

const SELECTION_WIDTH = width - 32;
const BUTTON_WIDTH = (width - 32) / graphs.length;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 10,
  },
  backgroundSelection: {
    backgroundColor: "#f3f3f3",
    ...StyleSheet.absoluteFillObject,
    width: BUTTON_WIDTH,
    borderRadius: 8,
  },
  selection: {
    flexDirection: "row",
    width: SELECTION_WIDTH,
    alignSelf: "center",
  },
  labelContainer: {
    padding: 16,
    width: BUTTON_WIDTH,
  },
  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const Graph = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const translation = useVector();
  const transition = useSharedValue(0);
  const previous = useSharedValue<GraphIndex>(0);
  const current = useSharedValue<GraphIndex>(0);
  const animatedProps = useAnimatedProps(() => {
    const previousPath = graphs[previous.value].data.path;
    const currentPath = graphs[current.value].data.path;
    return {
      d: mixPath(transition.value, previousPath, currentPath),
    };
  });
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(BUTTON_WIDTH * current.value) }],
  }));
  return (
    <MainContainer
      style={{ flexGrow: 1, backgroundColor: activeColors.primary }}
    >
      <View>
        <View
          style={{
            flex: 1,
            backgroundColor: activeColors.primary,
            height: 250,
          }}
        >
          <Bar />
        </View>
        <Header translation={translation} index={current} />
        <View className="py-4">
          <Svg width={SIZE + 130} height={SIZE - 80}>
            <AnimatedPath
              animatedProps={animatedProps}
              fill="transparent"
              stroke={activeColors.accent}
              strokeWidth={3}
            />
          </Svg>
          <Cursor translation={translation} index={current} />
        </View>
        <View style={styles.selection}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={[
                styles.backgroundSelection,
                style,
                {
                  backgroundColor: activeColors.secondary,
                  borderRadius: 5,
                  borderColor: activeColors.grayAccent,
                  borderWidth: 1,
                },
              ]}
            />
          </View>
          {graphs.map((graph, index) => {
            return (
              <TouchableWithoutFeedback
                key={graph.label}
                onPress={() => {
                  previous.value = current.value;
                  transition.value = 0;
                  current.value = index as GraphIndex;
                  transition.value = withTiming(1);
                }}
              >
                <Animated.View style={[styles.labelContainer, {}]}>
                  <StyledText small>{graph.label}</StyledText>
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
        {/* <View className="flex  justify-between   divide-y">
        <View className="flex flex-row justify-start items-center">
          <View>
            <MaterialCommunityIcons
              name=""
              size={25}
              color={activeColors.accent}
            />
          </View>
          <StyledText small></StyledText>
        </View>
        <View className="flex flex-row justify-start items-center">
          <LockClosedIcon size={20} color={activeColors.accent} />
          <StyledText small>Locked</StyledText>
        </View>
      </View> */}
      </View>
    </MainContainer>
  );
};

export default Graph;
