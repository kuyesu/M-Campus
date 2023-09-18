import { View, Text, Image, useWindowDimensions } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { fetchWeatherForecast } from "@/api/weather";
import { getData, storeData } from "@/store/asyncStorage";
import StyledText from "../Text/StyledText";
import { SplashScreen } from "expo-router";
import dayjs from "dayjs";

import { PanGestureHandler } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";

import Animated, {
  SlideInDown,
  SlideInUp,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useDerivedValue,
  useAnimatedGestureHandler,
  withTiming,
  Easing,
  useAnimatedProps,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const StyledWeatherView = () => {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});

  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    fetchMyWeatherData();
    SplashScreen.hideAsync();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData("city");
    let cityName = "Mbarara";
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: "7",
    }).then((data) => {
      // console.log('got data: ',data.forecast.forecastday);
      setWeather(data);
      setLoading(false);
      SplashScreen.hideAsync();
    });
  };

  const { location, current }: any = weather;

  // clock
  const [date, setDate] = useState(dayjs());
  const { height } = useWindowDimensions();
  const y = useSharedValue(height);

  const footerVisibility = useSharedValue(1);
  const footerHeight = useDerivedValue(() =>
    interpolate(footerVisibility.value, [0, 1], [0, 85])
  );
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        padding: 0,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flex: 1,
      }}
    >
      {loading ? (
        <StyledText>Loading</StyledText>
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: "https:" + current?.condition?.icon }}
            // source={weatherImages[current?.condition?.text || "other"]}
            style={{ height: 60, width: 60 }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",

              justifyContent: "center",
            }}
          >
            <StyledText style={{ fontSize: 18 }}>
              {current?.temp_c}&#176;
            </StyledText>
            <Animated.View entering={SlideInUp}>
              {/* <StyledText bold style={{ fontSize: 25 }}>
                {date.format("hh:mm")}
              </StyledText> */}
              <StyledText
                style={{ fontSize: 10 }}
                // ellipsizeMode="tail"
                // numberOfLines={1}
                bold
              >
                {current?.condition?.text}
              </StyledText>
            </Animated.View>
          </View>
        </View>
      )}
    </View>
  );
};

export default StyledWeatherView;
