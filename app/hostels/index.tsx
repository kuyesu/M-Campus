// @ts-nocheck
import React from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import COLORS from "@/constants/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
const { width } = Dimensions.get("screen");
import houses from "@/data/houses";
import { Link } from "expo-router";
const HomeScreen = () => {
  const optionsList = [
    { title: "Tank Hill", img: require("@/assets/houses/house1.jpg"), id: 1 },
    { title: "Tripple B", img: require("@/assets/houses/house2.jpg"), id: 2 },
    {
      title: "Gents Flat",
      img: require("@/assets/houses/house1.jpg"),
      id: 3,
    },
    {
      title: "Queen of Peace",
      img: require("@/assets/houses/house2.jpg"),
      id: 4,
    },
  ];
  const categoryList = ["Popular", "Recommended", "Nearest"];

  const ListCategories = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    return (
      <View style={style.categoryListContainer}>
        {categoryList.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedCategoryIndex(index)}
          >
            <Text
              style={[
                style.categoryListText,
                index == selectedCategoryIndex && style.activeCategoryListText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const ListOptions = () => {
    return (
      <View style={style.optionListsContainer}>
        <FlashList
          data={optionsList}
          horizontal
          renderItem={({ item }) => (
            <Link href={`/hostels/details/${item.id}`}>
              <View style={style.optionsCard}>
                {/* House image */}
                <Image source={item.img} style={style.optionsCardImage} />

                {/* Option title */}
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#041633",
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </Link>
          )}
          estimatedItemSize={200}
        />
      </View>
    );
  };
  const Card = ({ house }: any) => {
    return (
      <Link
        href={{
          pathname: `/hostels/details/${house.id}`,
          params: { id: house.id },
        }}
        asChild
      >
        <Pressable>
          <View style={style.card}>
            {/* House image */}
            <Image source={house.image} style={style.cardImage} />
            <View style={{ marginTop: 10 }}>
              {/* Title and price container */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#041633",
                  }}
                >
                  {house.title}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#041633",
                    fontSize: 16,
                  }}
                >
                  UGX {house.price}
                </Text>
              </View>

              {/* Location text */}

              <Text style={{ color: "#2a2e48", fontSize: 14, marginTop: 5 }}>
                {house.location}
              </Text>

              {/* Facilities container */}
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <View style={style.facility}>
                  <Icon name="hotel" size={18} />
                  <Text style={style.facilityText}>2 people</Text>
                </View>
                <View style={style.facility}>
                  <Icon name="bathtub" size={18} />
                  <Text style={style.facilityText}>Self-contained</Text>
                </View>
                <View style={style.facility}>
                  <Icon name="map" size={18} />
                  <Text style={style.facilityText}>500m from campus</Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      {/* Header container */}
      <View style={style.header}>
        <View>
          <Text style={{ color: COLORS.grey }}>Accommodations</Text>
          <Text style={{ color: "#041633", fontSize: 20, fontWeight: "bold" }}>
            Hostels and Rentals
          </Text>
        </View>
        {/* <Image
          style={style.profileImage}
          source={require("@/assets/houses/person.jpg")}
        /> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Input and sort button container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <View style={style.searchInputContainer}>
            <Icon name="search" color={COLORS.grey} size={25} />
            <TextInput placeholder="Search with name, or location" />
          </View>

          <View style={style.sortBtn}>
            <Icon name="tune" color={COLORS.white} size={25} />
          </View>
        </View>

        {/* Render list options */}
        <ListOptions />

        {/* Render categories */}
        <ListCategories />

        {/* Render Card */}
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
          horizontal
          data={houses}
          renderItem={({ item }) => <Card house={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  optionsCard: {
    height: Platform.OS === "ios" ? 210 : 180,
    shadowColor: "none",
    width: width / 2 - 30,
    elevation: 15,
    alignItems: "center",
    // backgroundColor: COLORS.white,

    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 5,
    width: "100%",
  },
  optionListsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    color: COLORS.grey,
  },
  activeCategoryListText: {
    color: COLORS.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 40,
  },
  card: {
    height: 500,
    // backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    // borderRadius: 20,
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderRadius: 5,
  },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },
});
export default HomeScreen;
