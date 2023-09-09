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
    <View
      style={[
        styles.container,
        {
          backgroundColor: activeColors.primary,
          // borderRadius: 15,
        },
      ]}
    >
      <Header translation={translation} index={current} />
      <View className="py-4">
        <Svg width={SIZE + 130} height={SIZE - 80}>
          <AnimatedPath
            animatedProps={animatedProps}
            fill="transparent"
            stroke="#86e63b"
            strokeWidth={3}
          />
        </Svg>
        <Cursor translation={translation} index={current} />
      </View>
      <View style={styles.selection}>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.backgroundSelection, style]} />
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
              <Animated.View style={[styles.labelContainer]}>
                <Text style={styles.label}>{graph.label}</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      <Animated.View className="flex w-full pt-8">
        <Animated.View className="flex flex-row w-full justify-between items-center ">
          <View className="flex flex-row w-[45%]">
            <View className="flex flex-col w-full">
              <View className="flex   flex-row   w-full">
                <View
                  className={`  rounded-sm flex-col items-center justify-center  p-2 px-4 bg-[#eff0fb] w-full`}
                  style={{
                    paddingVertical: 6,
                    // paddingHorizontal: SIZES.small,
                    // borderRadius: SIZES.large,
                    // rerColor: COLORS.secondary, //COLORS.gray2,
                  }}
                >
                  <View className="flex flex-row items-center justify-between w-full">
                    <Text className="text-2xl text-center items-center font-extrabold text-[#6a6fc5]">
                      20
                    </Text>
                    <LockClosedIcon
                      color={"#6a6fc5"}
                      size={20}
                      strokeWidth={2}
                    />
                  </View>
                  <View className="flex  w-full">
                    <Text className="text-sm text-right justify-end  font-medium text-[#041633]">
                      Resolved
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex absolute -z-20 left-0.5 top-1   flex-row  pt-2 w-full ">
                <View
                  className={`   rounded-sm flex-col items-center justify-center   py-1 bg-[#6a6fc5] w-full`}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    // borderRadius: SIZES.large,
                    // borderWidth: 1,
                    // borderColor: COLORS.secondary, //COLORS.gray2,
                  }}
                >
                  <View className="flex flex-row items-center justify-between w-full">
                    <Text className="text-2xl text-center items-center font-extrabold text-[#6a6fc5]">
                      20
                    </Text>
                    <LockClosedIcon
                      color={"#D32F2F"}
                      size={20}
                      strokeWidth={2}
                    />
                  </View>
                  <View className="flex  w-full">
                    <Text className="text-sm text-right justify-end  font-bold text-[#041633]">
                      Resolved
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* Pending */}
          <View className="flex flex-row w-[45%]">
            <View className="flex flex-col w-full">
              <View className="flex relative  flex-row   w-full">
                <View
                  className={` relative rounded-sm flex-col items-center justify-center  m-1 p-2 px-4 bg-[#fff5e9] w-full`}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    // borderRadius: SIZES.large,
                    // rerColor: COLORS.secondary, //COLORS.gray2,
                  }}
                >
                  <View className="flex flex-row items-center justify-between w-full">
                    <Text className="text-2xl text-center items-center font-extrabold text-[#F9A825]">
                      20
                    </Text>
                    <LockClosedIcon
                      color={"#F9A825"}
                      size={20}
                      strokeWidth={2}
                    />
                  </View>
                  <View className="flex  w-full">
                    <Text className="text-sm text-right justify-end  font-medium text-[#041633]">
                      Pending
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex absolute -z-20 left-0.5 top-1   flex-row  pt-2 w-full ">
                <View
                  className={` relative rounded-sm flex-col items-center justify-center  m-1 py-1 bg-[#F9A825] w-full`}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    // borderRadius: SIZES.large,
                    // borderWidth: 1,
                    // borderColor: COLORS.secondary, //COLORS.gray2,
                  }}
                >
                  <View className="flex flex-row items-center justify-between w-full">
                    <Text className="text-2xl text-center items-center font-extrabold text-[#F9A825]">
                      20
                    </Text>
                    <LockClosedIcon
                      color={"#D32F2F"}
                      size={20}
                      strokeWidth={2}
                    />
                  </View>
                  <View className="flex  w-full">
                    <Text className="text-sm text-right justify-end  font-medium text-[#041633]">
                      Pending
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Graph;
