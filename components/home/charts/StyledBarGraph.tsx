import { View, Text, Dimensions } from "react-native";
import React from "react";

import { StackedBarChart } from "react-native-chart-kit";

const StyledBarGraph = () => {
  const data = {
    labels: ["Test1", "Test2"],
    legend: ["L1", "L2", "L3"],
    data: [
      [60, 60, 60],
      [30, 30, 60],
    ],
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
  };

  return (
    <StackedBarChart
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
      barPercentage={0.1}
      data={data}
      width={195}
      height={130}
      hideLegend={false}
      chartConfig={{
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
      }}
    />
  );
};

export default StyledBarGraph;
