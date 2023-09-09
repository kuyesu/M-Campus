import React from "react";
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
import COLORS from "@/constants/Colors";
import { Link, usePathname, useRouter } from "expo-router";
import { PhoneIcon } from "react-native-heroicons/outline";
import { SocialIcon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MapPinIcon } from "react-native-heroicons/solid";

const { width } = Dimensions.get("screen");
const DetailsScreen = () => {
  const pathname = usePathname();
  // get the id from the pathname
  const id = pathname.split("/").pop();
  const house = houses.find((house) => house.id === id);

  const InteriorCard = ({ interior }) => {
    return <Image source={interior} style={style.interiorImage} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* House image */}

        <View style={style.backgroundImageContainer}>
          <ImageBackground style={style.backgroundImage} source={house?.image}>
            <View style={style.header}>
              <View style={style.headerBtn}>
                <Link href="/hostels">
                  <Icon name="arrow-back-ios" size={20} />
                </Link>
              </View>
              <View style={style.headerBtn}>
                <Icon name="favorite" size={20} color={COLORS.red} />
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
                      fill="#86e63b"
                      stroke="#041633"
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "041633" }}>
              {house?.title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#041633",
                  padding: 5,
                }}
              >
                <Text style={{ color: "white" }}>4.8</Text>
              </View>
              <Text style={{ fontSize: 13, marginLeft: 5 }}>155 ratings</Text>
            </View>
          </View>

          {/* Location text */}
          <Text style={{ fontSize: 16, color: COLORS.grey }}>
            {house?.location}
          </Text>

          {/* Facilities container */}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={style.facility}>
              <Icon name="hotel" size={18} />
              <Text style={style.facilityText}>2 (double)</Text>
            </View>
            <View style={style.facility}>
              <Icon name="bathtub" size={18} />
              <Text style={style.facilityText}>2</Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={style.facilityText}>0.5km from Town campus</Text>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <PhoneIcon size={18} color="#041633" />
              <Text style={{ color: "#041633", marginLeft: 8 }}>
                {house?.call}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <SocialIcon
                type="whatsapp"
                style={{
                  height: 18,
                  width: 18,
                  marginLeft: 0,
                }}
              />
              <Text style={{ color: "#041633", marginLeft: 8 }}>
                {house?.whatsapp}
              </Text>
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
              <Text
                style={{ color: "#3b3f57", fontWeight: "bold", fontSize: 18 }}
              >
                UGX {house?.price}
              </Text>
              <Text
                style={{ fontSize: 12, color: COLORS.grey, fontWeight: "bold" }}
              >
                Per Semester
              </Text>
            </View>
            <View className="relative">
              <View className="flex relative w-full flex-col space-y-3 pt-4 ">
                <View>
                  <TouchableOpacity
                    className={` flex  right-0.5 items-center  w-full justify-center bg-[#041633] p-2.5 font-bold border border-[#041633] `}
                  >
                    <Text className="text-md  font-bold text-[#86e63b]">
                      Book Now
                    </Text>
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
      </ScrollView>
    </SafeAreaView>
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
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS.blue,
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
  facilityText: { marginLeft: 5, color: COLORS.grey },
});

export default DetailsScreen;
