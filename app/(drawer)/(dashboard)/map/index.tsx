import React, { useContext } from "react";
import { StyleSheet, Platform, View } from "react-native";
import MainContainer from "@/components/container/MainContainer";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from "react-native-vision-camera";
import { Text } from "react-native";
import StyledText from "@/components/Text/StyledText";
import { SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Image } from "react-native";

const ExploreScreen = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user, isAuthenticated, loading } = useSelector(
    (state: any) => state.user
  );
  const device = useCameraDevice("back", {
    physicalDevices: [
      "ultra-wide-angle-camera",
      "wide-angle-camera",
      "telephoto-camera",
    ],
  });

  if (device == null)
    return (
      <MainContainer
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledText big>No camera</StyledText>
      </MainContainer>
    );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Camera
        photo
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      {/* content */}
      <View
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 999,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 5,
            paddingHorizontal: 0,
            margin: 20,
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left-circle-outline"
            size={30}
            color={activeColors.grayAccent}
          />
        </View>
      </View>
      <View
        style={{
          display: "flex",
          position: "absolute",
          top: 60,
          left: 0,
          zIndex: 999,
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "row",
            padding: 10,
            width: 330,
            height: 400,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 10,
            margin: 20,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            gap: 8,
          }}
        >
          <Image
            source={require("@/assets/houses/house1.jpg")}
            style={{ width: 60, height: 60, borderRadius: 5 }}
          />
          <View>
            <StyledText
              style={{
                color: activeColors.grayAccent,
              }}
            >
              Building
            </StyledText>
            <StyledText
              style={{
                color: activeColors.grayAccent,
              }}
              bold
            >
              ICS LAB II
            </StyledText>
            <StyledText
              style={{
                color: activeColors.grayAccent,
                fontSize: 12,
              }}
              className="italic"
            >
              Faculty of Computing and Informatics
            </StyledText>
          </View>
        </View>
      </View>
      {/* Actions */}
      <View
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 999,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            gap: 8,
          }}
        >
          <Image
            source={{ uri: user?.avatar?.url }}
            style={{ width: 30, height: 30, borderRadius: 50 }}
          />
        </View>
      </View>
      <View
        style={{
          display: "flex",
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 999,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            gap: 8,
          }}
        >
          <MaterialCommunityIcons
            name="thumb-up-outline"
            size={30}
            color={activeColors.grayAccent}
          />
          <StyledText
            style={{
              color: activeColors.grayAccent,
            }}
          >
            21.1k
          </StyledText>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            gap: 8,
          }}
        >
          <MaterialCommunityIcons
            name="comment-outline"
            size={30}
            color={activeColors.grayAccent}
          />
          <StyledText
            style={{
              color: activeColors.grayAccent,
            }}
          >
            30.7k
          </StyledText>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            gap: 8,
          }}
        >
          <MaterialCommunityIcons
            name="share-outline"
            size={30}
            color={activeColors.grayAccent}
          />
          <StyledText
            style={{
              color: activeColors.grayAccent,
            }}
          >
            50
          </StyledText>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            gap: 8,
          }}
        >
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={30}
            color={activeColors.grayAccent}
          />
        </View>
      </View>
      {/* user */}
      <View
        style={{
          display: "flex",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 999,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            padding: 5,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 20,
            paddingHorizontal: 5,
            paddingRight: 20,
            margin: 20,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",

            gap: 8,
          }}
        >
          <Image
            source={{ uri: user?.avatar?.url }}
            style={{ width: 30, height: 30, borderRadius: 50 }}
          />
          <StyledText
            style={{
              color: activeColors.grayAccent,
            }}
          >
            {user?.name}
          </StyledText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;
