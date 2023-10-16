import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "@/constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "@/hooks/useFetch";
import StyledText from "@/components/Text/StyledText";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "React Native and Javascript developer",
    num_pages: "1",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header} className="justify-center pt-10 items-center">
        <StyledText className=" text-left    " bold>
          Find your perfect Job
        </StyledText>
        <TouchableOpacity>
          <StyledText style={styles.headerBtn}>Show all</StyledText>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <StyledText>Something went wrong</StyledText>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
