import { MotiView } from "moti";
import { BarChart } from "react-native-gifted-charts";
const Bar = () => {
  const barData = [
    {
      value: 40,
      label: "Jan",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "rgba(43,185,175, 0.2)",
      capColor: "rgb(43,185,175)",
    },
    {
      value: 20,
      frontColor: "rgba(254,199,65, 0.2)",
      capColor: "rgb(254,199,65)",
    },

    {
      value: 50,
      label: "Feb",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "rgba(254,199,65, 0.2)",
      capColor: "rgb(254,199,65)",
    },
    { value: 40, frontColor: "#ED6665" },
    {
      value: 75,
      label: "Mar",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "rgba(254,94,52,0.2)",
      capColor: "rgb(254,94,52)",
    },
    { value: 25, frontColor: "#ED6665" },
    {
      value: 30,
      label: "Apr",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 20, frontColor: "#ED6665" },
    {
      value: 60,
      label: "May",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 40, frontColor: "#ED6665" },
    {
      value: 65,
      label: "Jun",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 30, frontColor: "#ED6665" },
  ];
  return (
    <MotiView
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      <BarChart
        barWidth={5}
        barStyle={{
          borderRadius: 5,
          width: 5,
        }}
        width={400}
        height={150}
        xAxisLength={300}
        noOfSections={3}
        barBorderRadius={4}
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        cappedBars
        capRadius={3}
        capThickness={20}
        // showLine
        // showGradient
        // gradientColor={"rgba(200, 100, 244,0.8)"}
      />
    </MotiView>
  );
};

export default Bar;
