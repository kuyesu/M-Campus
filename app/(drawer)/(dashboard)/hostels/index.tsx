// @ts-nocheck
import React, { useContext } from "react";
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
import COLORS, { colors } from "@/constants/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
const { width } = Dimensions.get("screen");
import houses from "@/data/houses";
import { Link } from "expo-router";
import MainContainer from "@/components/container/MainContainer";
import { ThemeContext } from "@/context/themeContext";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import StyledText from "@/components/Text/StyledText";
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
                { color: activeColors.tint },
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
                    color: activeColors.tint,
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
                <StyledText
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: activeColors.tint,
                  }}
                >
                  {house.title}
                </StyledText>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: activeColors.tint,
                    fontSize: 16,
                  }}
                >
                  UGX {house.price}
                </Text>
              </View>

              {/* Location text */}

              <Text
                style={{ color: activeColors.gray, fontSize: 14, marginTop: 5 }}
              >
                {house.location}
              </Text>

              {/* Facilities container */}
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <View style={style.facility}>
                  <Icon name="hotel" color={activeColors.accent} size={18} />
                  <Text
                    style={{
                      color: activeColors.gray,
                    }}
                  >
                    2 people
                  </Text>
                </View>
                <View style={style.facility}>
                  <Icon name="bathtub" color={activeColors.accent} size={18} />
                  <Text
                    style={{
                      color: activeColors.gray,
                    }}
                  >
                    Self-contained
                  </Text>
                </View>
                <View style={style.facility}>
                  <Icon name="map" color={activeColors.accent} size={18} />
                  <Text
                    style={{
                      color: activeColors.gray,
                    }}
                  >
                    500m from campus
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  };
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <MainContainer style={{ flex: 1 }}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={activeColors.secondary}
        barStyle={theme.mode == "dark" ? "light-content" : "dark-content"}
      />
      {/* Header container */}
      <View style={style.header}>
        <View>
          <Text style={{ color: activeColors.gray }}>Accommodations</Text>
          <Text
            style={{
              color: activeColors.tint,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
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
          <View
            style={{
              width: "80%",
            }}
          >
            <StyledTextInput
              style={{
                borderRadius: 10,
              }}
              placeholderTextColor={activeColors.gray}
              placeholder="Search with name, or location"
            />
          </View>

          <View style={style.sortBtn}>
            <Icon name="tune" color={activeColors.gray} size={25} />
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
    </MainContainer>
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

    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
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
  },
  activeCategoryListText: {
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
  facilityText: { marginLeft: 5 },
});
export default HomeScreen;
