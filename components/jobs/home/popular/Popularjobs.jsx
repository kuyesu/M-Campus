import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

import useFetch from "@/hooks/useFetch";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

import styles from "./popularjobs.style";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "react-native-elements";
import StyledText from "@/components/Text/StyledText";

const Popularjobs = () => {
  const router = useRouter();

  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  const { data, isLoading, error } = useFetch("search", {
    query: "Nodejs developer",
    num_pages: 1,
  });

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StyledText className="text-lg text-left font-semibold mt-2 ">
          On-campus Jobs
        </StyledText>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={"black"} />
        ) : error ? (
          <Text>Something went wrong...</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: 30 }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
