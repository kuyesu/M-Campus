import React from "react";
import { View } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

const BarThreeD = () => {
  const barData = [
    {
      value: 230,
      label: "Jan",
      frontColor: "#4ABFF4",
      sideColor: "#23A7F3",
      topColor: "#92e6f6",
    },
    {
      value: 180,
      label: "Feb",
      frontColor: "#79C3DB",
      sideColor: "#68BCD7",
      topColor: "#9FD4E5",
    },
    {
      value: 395,
      label: "Mar",
      frontColor: "#28B2B3",
      sideColor: "#0FAAAB",
      topColor: "#66C9C9",
    },
    {
      value: 250,
      label: "Apr",
      frontColor: "#4ADDBA",
      sideColor: "#36D9B2",
      topColor: "#7DE7CE",
    },
    {
      value: 320,
      label: "May",
      frontColor: "#91E3E3",
      sideColor: "#85E0E0",
      topColor: "#B0EAEB",
    },
    {
      value: 400,
      label: "Jun",
      frontColor: "#F4BFF4",
      sideColor: "#EFA7EF",
      topColor: "#F8D9F8",
    },
    {
      value: 350,
      label: "Jul",
      frontColor: "#F4BFF4",
      sideColor: "#EFA7EF",
      topColor: "#F8D9F8",
    },
    {
      value: 300,
      label: "Aug",
      frontColor: "#F4BFF4",
      sideColor: "#EFA7EF",
      topColor: "#F8D9F8",
    },
    {
      value: 50,
      label: "Sept",
      frontColor: "#4ABFF4",
      sideColor: "#23A7F3",
      topColor: "#92e6f6",
    },
    {
      value: 280,
      label: "Oct",
      frontColor: "#79C3DB",
      sideColor: "#68BCD7",
      topColor: "#9FD4E5",
    },
    {
      value: 395,
      label: "Nov",
      frontColor: "#28B2B3",
      sideColor: "#0FAAAB",
      topColor: "#66C9C9",
    },
    {
      value: 195,
      label: "Dec",
      frontColor: "#28B2B3",
      sideColor: "#0FAAAB",
      topColor: "#66C9C9",
    },
  ];
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <BarChart
        // showFractionalValue
        showYAxisIndices={false}
        showXAxisIndices={false}
        hideRules
        hideYAxisText
        hideAxesAndRules
        noOfSections={8}
        maxValue={400}
        data={barData}
        barWidth={5}
        spacing={25}
        sideWidth={0}
        isThreeD={false}
        // side="right"
      />
    </View>
  );
};

export default BarThreeD;
