import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import MainContainer from "@/components/container/MainContainer";
import OpenAI from "openai";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-native";
import { URI } from "@/redux/URI";
import { ActivityIndicator } from "react-native";
import { URIGCP } from "@/redux/URIGCP";

type Props = {};

const test = (props: Props) => {
  const { user, isAuthenticated, token } = useSelector(
    (state: any) => state.user
  );
  const [data, setData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const prompt =
        "What are you good at, but I am sure there is someone on github or linkedin called Kuyeso Rogers?";
      const { data } = await axios.post(
        `${URIGCP}/prompt_route`,
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = data.data;
      setData(result);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <MainContainer>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          height: "100%",
          paddingHorizontal: 20,
        }}
      >
        <Text>{data}</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button onPress={fetchData} title="fetch data" />
        )}
      </View>
    </MainContainer>
  );
};

export default test;

const styles = StyleSheet.create({});
