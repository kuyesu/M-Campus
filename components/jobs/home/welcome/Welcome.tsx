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
          className="text-lg text-left font-semibold mt-2 "
          style={{
            color: activeColors.gray,
          }}
        >
          Find your perfect Job
        </StyledText>
      </View>
      <View style={styles.searchContainer}>
        <View
          style={{
            width: "90%",
          }}
        >
          <StyledTextInput
            style={{
              width: "100%",
              borderRadius: 5,
              paddingVertical: 20,
            }}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for"
          />
        </View>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={handleClick}>
          <MaterialCommunityIcons name="magnify" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: 20 }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
