import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./welcome.style";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "@/components/Text/StyledText";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import StyledTextInput from "@/components/TextInput/StyledTextInput";

const jobTypes = ["Full-time", "Part-time", "contractor"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <View>
      <View style={styles.container}>
        <StyledText
          className=" text-left mt-2 "
          style={{
            color: activeColors.tint,
          }}
          bold
        >
          Find your perfect Job
        </StyledText>
      </View>
      <View style={styles.searchContainer}>
        <View
          style={{
            width: "100%",
          }}
        >
          <StyledTextInput
            style={{
              backgroundColor: activeColors.secondary,
              fontSize: 16,
              borderWidth: 2,
              borderColor: activeColors.grayAccent,
              width: "100%",
              borderRadius: 50,
              paddingLeft: 20,
              paddingRight: 50,
              paddingVertical: 10,
            }}
            className=" w-full px-0"
            bold
            inputMode="text"
            placeholderTextColor={activeColors.gray}
            cursorColor={activeColors.tint}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?"
          />
          <TouchableOpacity
            style={{
              marginLeft: 10,
              position: "absolute",
              right: 2,
              top: 1,
              padding: 10,
            }}
            onPress={handleClick}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={30}
              color={activeColors.tint}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.tabsContainer,
          {
            backgroundColor: activeColors.grayAccent,
            borderColor: activeColors.grayAccent,
            width: "100%",
            borderRadius: 50,
            paddingVertical: 10,
            justifyContent: "space-between",
          },
        ]}
      >
        <FlatList
          contentContainerStyle={{
            width: "100%",
            justifyContent: "space-between",
            paddingHorizontal: 10,

            columnGap: 20,
          }}
          data={jobTypes}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              // style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
              style={{
                backgroundColor:
                  activeJobType === item
                    ? activeColors.secondary
                    : "transparent",
                borderRadius: 50,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              <StyledText
              // style={styles.tabText(activeJobType, item)}
              >
                {item}
              </StyledText>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
