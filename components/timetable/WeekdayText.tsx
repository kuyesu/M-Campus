import React, { FC, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { WEEKDAYS } from "@/utils/timetable/constants";
import { ConfigsContext } from "./TimeTable";
import StyledText from "../Text/StyledText";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";

const WeekdayText: FC = () => {
  const configs = useContext(ConfigsContext);

  const { cellWidth, numOfDays } = configs;
  const currentDay = new Date();
  const currentWeekday = currentDay.getDay() ? currentDay.getDay() : 7;

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <>
      {Array.from({ length: numOfDays }, (_, i) => 1 + i).map((day) => {
        const differenceOfDate = day - currentWeekday;
        const thatDay = new Date();
        thatDay.setDate(new Date().getDate() + differenceOfDate);
        return (
          <View
            key={`weekday-${day}`}
            style={[
              {
                width: cellWidth,
                height: 32,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 5,
              },
              currentWeekday === day && {
                backgroundColor: activeColors.accent,
                borderColor: activeColors.grayAccent,
                borderWidth: 1,
                borderRadius: 15,
              },
            ]}
          >
            <StyledText
              style={[
                currentWeekday === day && {
                  color: activeColors.secondary,
                },
              ]}
              small
            >
              {`${WEEKDAYS[day - 1]} ${thatDay.getDate()}`}
            </StyledText>
          </View>
        );
      })}
    </>
  );
};

const getStyles = ({ cellWidth, theme }) =>
  StyleSheet.create({
    weekdayCell: {
      width: cellWidth,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    weekdayTextHighlight: {
      color: theme.accent,
    },
  });

export default WeekdayText;
