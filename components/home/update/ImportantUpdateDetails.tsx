import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { useContext } from "react";
import { Image } from "moti";
import StyledText from "@/components/Text/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
type Props = {};

const ImportantUpdateDetails = (props: Props) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 40,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 250,
        }}
      >
        <Image
          source={require("@/assets/images/fast.jpeg")}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          backgroundColor: activeColors.primary,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingBottom: 20,
          paddingHorizontal: 20,
          borderBottomColor: activeColors.grayAccent,
          borderBottomWidth: 1,
        }}
      >
        <StyledText style={{}} big>
          Mbarara University of Science and Technology
        </StyledText>
        <StyledText
          style={{
            color: activeColors.gray,
          }}
          small
        >
          <MaterialCommunityIcons
            name="map-marker"
            size={15}
            color={activeColors.gray}
          />
          Office, Academic Registrar
        </StyledText>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          height: 400,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: activeColors.secondary,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            paddingBottom: 10,
            borderBottomColor: activeColors.grayAccent,
            borderBottomWidth: 1,
            marginBottom: 10,
          }}
        >
          <StyledText bold>
            Opening of the University for the First Semester 2021/2022 Academic
            Year
          </StyledText>
        </View>
        <StyledText
          style={{
            color: activeColors.gray,
          }}
          className="mb-5 text-justify"
        >
          This is to inform all students that the University will open for the
          first semester 2021/2022 academic year on 30th August 2021. All
          students are expected to report on this date and register for the
          semester. The semester will start on 6th September 2021. All students
          are advised to pay tuition and functional fees before reporting to the
          University. Students are also advised to observe the COVID-19 Standard
          Operating Procedures (SOPs) as they report to the University.
        </StyledText>
      </View>
    </View>
  );
};

export default ImportantUpdateDetails;

const styles = StyleSheet.create({});
