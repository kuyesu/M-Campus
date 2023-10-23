import React, { FC, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import type { Configs } from "@/types";
import { ConfigsContext } from "./TimeTable";
import StyledText from "../Text/StyledText";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";

const TimeTableTicks: FC = () => {
  const configs = useContext(ConfigsContext);
  const { startHour, endHour } = configs;
  const styles = getStyles(configs);

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <View style={styles.timeTableTicks}>
      {Array.from(
        { length: endHour - startHour + 1 },
        (_, i) => startHour + i
      ).map((hour) => (
        <View
          style={[
            styles.timeLineBox,
            {
              backgroundColor: "transparent",
            },
          ]}
          key={`timeline-${hour}`}
        >
          {hour !== startHour && (
            <StyledText
              style={[
                styles.timeLineText,
                {
                  color: activeColors.gray,
                },
              ]}
            >{`${
              hour > 9 ? "" + hour.toFixed(0) : "0" + hour.toFixed(0)
            }:00`}</StyledText>
          )}
        </View>
      ))}
    </View>
  );
};

const getStyles = (configs: Configs) =>
  StyleSheet.create({
    timeTableTicks: {
      marginTop: -12,
      width: configs.timeTicksWidth,
      minWidth: configs.timeTicksWidth,
    },
    timeLineText: {
      marginTop: 1,
      fontSize: 12,
      textAlign: "center",
    },
    timeLineBox: {
      paddingLeft: 2,
      height: configs.cellWidth,
    },
  });

export default TimeTableTicks;
