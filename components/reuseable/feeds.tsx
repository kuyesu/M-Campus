import { StyleSheet, TouchableOpacity, View, Share } from "react-native";

// components
import MainContainer from "@/components/container/MainContainer";
import { colors } from "@/constants/Colors";
import { useContext, useRef, useState } from "react";
import { ThemeContext } from "@/context/themeContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledMenuItem from "@/components/Menu/StyledMenuItem";
import StyledWeatherView from "@/components/weather/StyledWeatherView";

import TimelineComponent from "@/components/chat/itmeline";

import data from "@/data/inquiries";

import { useSelector } from "react-redux";
import MoreApps from "@/components/home/apps";
import StyledBottomSheet from "@/components/BottomSheet/StyledBottomSheet";
import UpdateCarousal from "@/components/home/update";
import ClassLocation from "@/components/home/class";
import { router } from "expo-router";

export default function TabOneScreen() {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user } = useSelector((state: any) => state.user);
  const [isActive, setIsActivate] = useState(theme.mode === "dark");
  const handleSwitch = () => {
    updateTheme();
    setIsActivate((previousState) => !previousState);
  };

  const [isOpen, setIsOpen] = useState(false);

  const url =
    "https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_IN&gl=US";
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Instagram | A time wasting application" + "\n" + url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["48%", "75%", "90%"];

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }

  const handleAppOnPress = (route: any) => {
    router.push(route);
    setIsOpen(false);
    bottomSheetModalRef.current?.close();
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };
  return (
    <MainContainer style={[styles.container, { flexGrow: 1, gap: 40 }]}>
      <View
        style={{
          paddingTop: 0,
          height: 100,
          width: "100%",
          // position: "relative",
          // left: -20,
        }}
      >
        <UpdateCarousal />
      </View>
      <View style={{}} className="h-full space-y-8">
        {/* top landing */}
        <View
          style={{
            height: "15%",
            // backgroundColor: "steelblue",
            gap: 20,
          }}
        >
          <View
            style={{
              height: "40%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StyledWeatherView />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <StyledMenuItem icon="timetable" />
              <StyledMenuItem icon="update" />
              <StyledMenuItem icon="database-search" />
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: activeColors.accent,
                  padding: 10,
                }}
              >
                {/* here is the modal bottomsheet */}
                <StyledBottomSheet
                  // setIsOpen={setIsOpen(false)}
                  index={1}
                  bottomSheetModalRef={bottomSheetModalRef}
                  snapPoints={snapPoints}
                >
                  <MoreApps handleOnPress={handleAppOnPress} />
                </StyledBottomSheet>
                <TouchableOpacity onPress={handlePresentModal}>
                  <MaterialCommunityIcons
                    name={"apps"}
                    // name="view-dashboard-outline"
                    size={30}
                    color={activeColors.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 20,
            }}
          >
            <ClassLocation />
          </View>
        </View>

        {/* <View
          style={{
            height: "20%",
          }}
        >
          <StyledCharts />
        </View> */}
        <View style={{ flex: 1 }}>
          <TimelineComponent data={data} />
        </View>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "80%",
    height: "40%",
    borderRadius: 5,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
