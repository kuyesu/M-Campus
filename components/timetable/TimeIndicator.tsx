import React, { useState, useEffect, useContext, FC } from "react";
import { View, StyleSheet } from "react-native";

import addOpacity from "@/utils/timetable/addOpacity";
import { ConfigsContext, ThemeContext } from "./TimeTable";
import Ring from "./Ring";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const COLOR = "#6E01EF";
const SIZE = 10;

type CurrentTime = {
  hour: number;
  minute: number;
  day: number;
};

// display an indicator line according to current time and weekday
const TimeIndicator: FC = () => {
  const configs = useContext(ConfigsContext);
  const theme = useContext(ThemeContext);
  const { cellWidth, cellHeight, startHour, endHour } = configs;
  const [currentTime, setCurrentTime] = useState<CurrentTime>({
    hour: 0,
    minute: 0,
    day: 0,
  });

  useEffect(() => {
    const timeUpdater = setInterval(() => {
      const d = new Date();
      setCurrentTime({
        hour: d.getHours(),
        minute: d.getMinutes(),
        day: d.getDay() || 7, // sunday is 0, so change to 7 for calculation of marginLeft
      });
    }, 1000);
    return () => {
      clearInterval(timeUpdater);
    };
  }, []);

  if (currentTime.hour < startHour && currentTime.hour > endHour) {
    return null;
  }

  const topMarginValue =
    (currentTime.hour - startHour + currentTime.minute / 60.0) * cellHeight;

  const styles = getStyles({ currentTime, topMarginValue, cellWidth, theme });

  return (
    <View style={styles.timeIndicator}>
      <View style={style.container}>
        <View
          style={[
            style.dot,
            style.center,
            {
              backgroundColor: theme.accent,
            },
          ]}
        >
          {[...Array(3).keys()].map((_, index) => (
            <Ring key={index} index={index} />
          ))}
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
const getStyles = ({ currentTime, topMarginValue, cellWidth, theme }) =>
  StyleSheet.create({
    timeIndicator: {
      zIndex: 3,
      position: "absolute",
      height: 2,
      backgroundColor: addOpacity(theme.accent, 0.8),
      marginLeft: (currentTime.day - 1) * cellWidth,
      marginTop: topMarginValue,
      width: cellWidth - 2,
    },
  });

export default TimeIndicator;
