import React, { useContext } from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import houses from "@/data/houses";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS, { colors } from "@/constants/Colors";
import { Link, usePathname, useRouter } from "expo-router";
import { PhoneIcon } from "react-native-heroicons/outline";
import { SocialIcon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MapPinIcon } from "react-native-heroicons/solid";
import MainContainer from "@/components/container/MainContainer";
import { ThemeContext } from "@/context/themeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "@/components/Text/StyledText";

const { width } = Dimensions.get("screen");
const DetailsScreen = () => {
  const pathname = usePathname();
  // get the id from the pathname
  const id = pathname.split("/").pop();
  const house = houses.find((house) => house.id === id);

  const InteriorCard = ({ interior }) => {
    return <Image source={interior} style={style.interiorImage} />;
  };

  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <MainContainer style={{ flex: 1 }}>
      <View style={style.backgroundImageContainer}>
        <ImageBackground style={style.backgroundImage} source={house?.image}>
          <View style={style.header}>
            <View style={style.headerBtn}>
              <Link href="/hostels">
                <MaterialCommunityIcons name="arrow-left" size={20} />
              </Link>
            </View>
            <View style={style.headerBtn}>
              <MaterialCommunityIcons
                name="heart"
                size={20}
                color={activeColors.tint}
              />
            </View>
          </View>
        </ImageBackground>

        {/* Virtual Tag View */}
        <View style={style.virtualTag}>
          <Link href="/hostels/details/map" asChild>
            <Pressable>
              <View
                className={`items-center  justify-center relative bottom-5 `}
              >
                <View
                  className={`items-center -z-50 top-[0.5px] -left-3  absolute  bg-[#041633] p-2 font-bold  `}
                >
                  <MapPinIcon
                    size={35}
                    // color={color}
                    fill={activeColors.accent}
                    stroke={activeColors.secondary}
                    strokeWidth={2}
                  />
                </View>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={style.detailsContainer}>
        {/* Name and rating view container */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <StyledText bold>{house?.title}</StyledText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#041633",
                padding: 5,
              }}
            >
              <StyledText>4.8</StyledText>
            </View>
            <StyledText style={{ marginLeft: 5 }}>155 ratings</StyledText>
          </View>
        </View>

        {/* Location text */}
        <StyledText>{house?.location}</StyledText>

        {/* Facilities container */}
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View style={style.facility}>
            <MaterialCommunityIcons
              name="hoop-house"
              size={18}
              color={activeColors.accent}
            />
            <StyledText>2 (double)</StyledText>
          </View>
          <View style={style.facility}>
            <MaterialCommunityIcons
              name="bathtub"
              size={18}
              color={activeColors.accent}
            />
            <StyledText>2</StyledText>
          </View>
          <View style={style.facility}>
            <MaterialCommunityIcons
              name="aspect-ratio"
              size={18}
              color={activeColors.accent}
            />
            <StyledText>0.5km from Town campus</StyledText>
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="phone"
              size={18}
              color={activeColors.accent}
            />
            <StyledText>{house?.call}</StyledText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <MaterialCommunityIcons
              name="whatsapp"
              style={{
                height: 18,
                width: 18,
                marginLeft: 0,
              }}
            />
            <StyledText style={{ marginLeft: 8 }}>{house?.whatsapp}</StyledText>
          </View>
        </View>

        {/* Interior list */}
        <FlatList
          contentContainerStyle={{ marginTop: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, key) => key.toString()}
          data={house?.interiors}
          renderItem={({ item }) => <InteriorCard interior={item} />}
        />

        {/* footer container */}
        <View style={style.footer}>
          <View>
            <StyledText bold>UGX {house?.price}</StyledText>
            <StyledText bold>Per Semester</StyledText>
          </View>
          <View className="relative">
            <View className="flex relative w-full flex-col space-y-3 pt-4 ">
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: activeColors.secondary,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: activeColors.grayAccent,
                  }}
                  className={` flex  right-0.5 items-center  w-full justify-center  p-2.5 font-bold border  `}
                >
                  <StyledText bold>Book Now</StyledText>
                </TouchableOpacity>
              </View>
              {/* <View
                  className={`items-center -z-50 -bottom-0.5 absolute w-full justify-center bg-[#041633] p-2 font-bold  `}
                >
                  <Text className="text-lg uppercase font-semibold text-[#031435]">
                    .
                  </Text>
                </View> */}
            </View>
          </View>
        </View>
      </View>
    </MainContainer>
  );
};

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    height: 350,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,

    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingTag: {
    height: 30,
    width: 35,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  virtualTag: {
    top: -20,
    width: 150,
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 2,
  },
  footer: {
    height: 70,
    backgroundColor: `${COLORS.light}`,
    borderRadius: 10,
    paddingHorizontal: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20, marginTop: 40 },
  facility: { flexDirection: "row", marginRight: 15 },
});

export default DetailsScreen;
