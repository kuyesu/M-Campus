import { Text, View } from "react-native";
import React, { Component, useContext, useRef } from "react";
import CarouselPager from "react-native-carousel-pager";
import {
  ChevronRightIcon,
  ShieldCheckIcon,
} from "react-native-heroicons/outline";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UpdateCarousal = () => {
  const CarouselRef = useRef();
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <CarouselPager
      ref={CarouselRef}
      initialPage={1}
      style={{
        width: "100%",
      }}
    >
      <View
        key={"page0"}
        className=" p-2 shadow-md  py-4 flex-row rounded  w-full items-center  justify-between"
        style={{
          height: "100%",
          backgroundColor: activeColors.accent,
        }}
      >
        <View className="flex  ">
          <MaterialCommunityIcons
            name="pin"
            size={20}
            color={`${activeColors.tint}`}
          />
        </View>
        <View className="flex  flex-col">
          <Text
            className="text-md text-left items-center font-bold truncate "
            style={{
              color: activeColors.tinit,
            }}
          >
            Asurance for your safety 54
          </Text>
          <Text
            className="text-xs text-left items-center font-light truncate "
            style={{
              color: activeColors.tinit,
            }}
          >
            Up to 54% of students are assured of their safety
          </Text>
        </View>
        <View className="flex  ">
          <MaterialCommunityIcons
            name="chevron-right"
            size={18}
            color={activeColors.secondary}
          />
        </View>
      </View>

      <View
        key={"page1"}
        className=" p-2 gap-2 shadow-md  py-4 flex-row rounded  w-full items-center  justify-between "
        style={{ height: "100%", backgroundColor: activeColors.accent }}
      >
        <View className="flex  ">
          <MaterialCommunityIcons
            name="pin"
            size={20}
            color={`${activeColors.danger}`}
          />
        </View>
        <View className="  flex-col " style={{ flex: 1, paddingVertical: 20 }}>
          <Text
            className="text-md text-left items-center font-bold truncate "
            style={{
              color: activeColors.tinit,
            }}
          >
            Asurance for your safety 54
          </Text>
          <Text
            className="text-xs text-left items-center font-light text-ellipsis "
            style={{
              color: activeColors.tinit,
            }}
          >
            Up to 54% of students are assured of their safety. Textst elipses Up
            to 54% of students are assured of their safety. Textst elipses Up to
            54% of students are assured of their safety. Textst elipses Up to
            54% of students are assured of their safety. Textst elipses Up to
            54% of students are assured of their safety. Textst elipses
          </Text>
        </View>
        <View className="flex  ">
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={activeColors.secondary}
          />
        </View>
      </View>
      <View
        key={"page2"}
        className=" p-2 shadow-md  py-4 flex-row rounded  w-full items-center  justify-between"
        style={{ height: "100%", backgroundColor: activeColors.accent }}
      >
        <View className="flex  ">
          <ShieldCheckIcon size={20} color={`${activeColors.tinit}`} />
        </View>
        <View className="flex  flex-col">
          <Text
            className="text-md text-left items-center font-bold truncate "
            style={{
              color: activeColors.tinit,
            }}
          >
            Asurance for your safety 54
          </Text>
          <Text
            className="text-xs text-left items-center font-light truncate "
            style={{
              color: activeColors.tinit,
            }}
          >
            Up to 54% of students are assured of their safety
          </Text>
        </View>
        <View className="flex  ">
          <ChevronRightIcon size={18} color={activeColors.tinit} />
        </View>
      </View>
      <View
        key={"page3"}
        className=" p-2 shadow-md  py-4 flex-row rounded  w-full items-center  justify-between"
        style={{ height: "100%", backgroundColor: activeColors.accent }}
      >
        <View className="flex  ">
          <ShieldCheckIcon size={20} color={`${activeColors.tinit}`} />
        </View>
        <View className="flex  flex-col">
          <Text
            className="text-md text-left items-center font-bold truncate "
            style={{
              color: activeColors.tinit,
            }}
          >
            Asurance for your safety 54
          </Text>
          <Text
            className="text-xs text-left items-center font-light truncate "
            style={{
              color: activeColors.tinit,
            }}
          >
            Up to 54% of students are assured of their safety
          </Text>
        </View>
        <View className="flex  ">
          <ChevronRightIcon size={18} color={activeColors.tinit} />
        </View>
      </View>
    </CarouselPager>
  );
};

export default UpdateCarousal;
