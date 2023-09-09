import { Dimensions, StyleSheet, Text, View } from "react-native";

// components
import MainContainer from "@/components/container/MainContainer";
import { colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/themeContext";
import StyledView from "@/components/View/StyledView";
import {
  ChevronRightIcon,
  ShieldCheckIcon,
} from "react-native-heroicons/outline";
import StyledText from "@/components/Text/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledMenuItem from "@/components/Menu/StyledMenuItem";
import StyledUpdate from "@/components/home/update/styledUpdate";
import StyledWeatherView from "@/components/weather/StyledWeatherView";
import StyledUpdateCampus from "@/components/home/update/styledUpdateCampus";
import StyledCharts from "@/components/home/charts/StyledCharts";
import StyledBarGraph from "@/components/home/charts/StyledBarGraph";

export default function TabOneScreen() {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const [isActive, setIsActivate] = useState(theme.mode === "dark");
  const handleSwitch = () => {
    updateTheme();
    setIsActivate((previousState) => !previousState);
  };

  return (
    <MainContainer
      style={[styles.container]}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={{}} className="h-full space-y-8">
        {/* top landing */}
        <View
          style={{
            height: "25%",
            // backgroundColor: "steelblue",
            gap: 20,
          }}
        >
          <View
            style={{
              height: "50%",
              flexDirection: "row",
              // alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <StyledView style={{ flex: 1 }}>
              <StyledWeatherView />
            </StyledView>
            {/* <StyledView style={{}}><StyledBarGraph /></StyledView> */}
          </View>
          {/* menu items */}
          <View style={{ height: "50%", gap: 20, paddingHorizontal: 0 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <StyledMenuItem name="Lineup" icon="timetable" />
              <StyledMenuItem name="Hostel" icon="home-outline" />
              <StyledMenuItem name="Jobs" icon="briefcase-outline" />
              <StyledMenuItem name="Update" icon="alarm-multiple" />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <StyledMenuItem name="Health" icon="medical-bag" />
              <StyledMenuItem name="VR" icon="line-scan" />
              <StyledMenuItem name="Eco" icon="recycle-variant" />
              <StyledMenuItem name="All" icon="apps" />
            </View>
          </View>
        </View>
        {/* Updates Important Update */}
        <View style={{ paddingTop: 0, height: 70 }}>
          <View
            className=" p-2 shadow-md bg-[#287ed0] py-4 flex-row  w-full items-center  justify-between"
            style={{ height: "100%" }}
          >
            <View className="flex  ">
              <ShieldCheckIcon size={20} color="#cfe5f1" />
            </View>
            <View className="flex  flex-col">
              <Text className="text-md text-left items-center font-bold truncate text-[#cfe5f1]">
                Assurance for your safety 54
              </Text>
              <Text className="text-xs text-left items-center font-light truncate text-[#cfe5f1]">
                Up to 54% of students are assured of their safety
              </Text>
            </View>
            <View className="flex  ">
              <ChevronRightIcon size={18} color="#cfe5f1" />
            </View>
          </View>
        </View>
        {/* News Section */}
        <View
          style={{
            height: "10%",
          }}
        >
          <StyledCharts />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <StyledText style={{}} bold>
              Important Updates
            </StyledText>
            <StyledText
              style={{
                color: activeColors.tertiary,
              }}
              small
              bold
            >
              See more
            </StyledText>
          </View>
          <StyledUpdate />
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <StyledText style={{}} bold>
              Campus News
            </StyledText>
            <StyledText
              style={{
                color: activeColors.tertiary,
              }}
              small
              bold
            >
              See more
            </StyledText>
          </View>
          <StyledUpdateCampus />
        </View>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});
