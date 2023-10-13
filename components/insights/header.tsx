import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { ReText, Vector, round } from "react-native-redash";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import ETH from "./components/eth";
import { graphs, SIZE, GraphIndex } from "./model";
import { Entypo } from "@expo/vector-icons";
import { ArrowTrendingUpIcon } from "react-native-heroicons/outline";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  values: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontWeight: "500",
    fontSize: 24,
  },
  label: {
    fontSize: 18,
  },
});

interface HeaderProps {
  translation: Vector<Animated.SharedValue<number>>;
  index: Animated.SharedValue<GraphIndex>;
}

const Header = ({ translation, index }: HeaderProps) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const data = useDerivedValue(() => graphs[index.value].data);
  const price = useDerivedValue(() => {
    const p = interpolate(
      translation.y.value,
      [0, SIZE],
      [data.value.maxPrice, data.value.minPrice]
    );
    return `$ ${round(p, 2).toLocaleString("en-US", { currency: "USD" })}`;
  });
  const percentChange = useDerivedValue(
    () => `${round(data.value.percentChange, 3)}%`
  );
  const label = useDerivedValue(() => data.value.label);
  const style = useAnimatedStyle(() => ({
    fontWeight: "500",
    fontSize: 24,
    color: data.value.percentChange > 0 ? "green" : "red",
  }));
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: activeColors.grayAccent,
        },
      ]}
      className=" border-b "
    >
      <View style={styles.values}>
        <ArrowTrendingUpIcon
          size={20}
          color={activeColors.tint}
          strokeWidth={1}
        />
        <View>
          {/* <ReText style={style} text={percentChange} /> */}
          <ReText
            style={[styles.label, { color: activeColors.gray }]}
            text={label}
            className=" font-semibold "
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
