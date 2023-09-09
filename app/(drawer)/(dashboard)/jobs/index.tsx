import { View, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";

import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "@/components/jobs";
import MainContainer from "@/components/container/MainContainer";

export default function Jobs() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <MainContainer style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 25 }}>
        <Welcome
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleClick={() => {
            if (searchTerm) {
              router.push(`/search/${searchTerm}`);
            }
          }}
        />
        <Popularjobs />
        <Nearbyjobs />
      </View>
    </MainContainer>
  );
}
