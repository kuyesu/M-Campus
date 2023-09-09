import { Dimensions, Pressable, TextInput, View } from "react-native";

const Slide1 = ({ setName }) => {
  return (
    <View className="flex flex-col  pr-2 items-center space-y-5 ">
      <TextInput
        onChangeText={(text) => setName(text)}
        className="bg-white w-full"
      />
      <TextInput
        onChangeText={(text) => setName(text)}
        className="bg-white w-full"
      />
      <TextInput
        onChangeText={(text) => setName(text)}
        className="bg-white w-full"
      />
      <TextInput
        onChangeText={(text) => setName(text)}
        className="bg-white w-full"
      />
    </View>
  );
};
const SlideDetails = ({ setName }) => {
  return (
    <View className="flex flex-col  pr-2 items-center space-y-5 ">
      <TextInput
        onChangeText={(text) => setName(text)}
        className="bg-white w-full"
      />
      <TextInput multiline numberOfLines={5} className="bg-white w-full" />
    </View>
  );
};
// documents and attachments

const SlideAttachments = ({ setName }) => {
  return (
    <View
      style={{
        width: Dimensions.get("window").width - 40,
      }}
      className="flex flex-col  items-center "
    >
      <Pressable
        style={{
          width: Dimensions.get("window").width - 40,
        }}
        className="flex "
      >
        <View className="flex items-center justify-center w-full">
          <View className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <View className="flex flex-col items-center justify-center pt-5 pb-6">
              {/* <CloudIcon color={COLORS.gray} size={80} /> */}
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
const SlideAdditional = () => {
  return (
    <View
      style={{
        width: Dimensions.get("window").width - 40,
        height: Dimensions.get("screen").height - 60,
      }}
      className="flex flex-col w-full  items-center "
    ></View>
  );
};

export const slides = ({ setName }) => [
  {
    key: 1,
    title: "Basic Information",
    desc: "Please provide or verify the information below is correct",
    backgroundColor: "red",
    component: <Slide1 setName={setName} />,
  },
  {
    key: 2,
    title: "Inquiry Details",
    desc: "Provide details about your inquiry",
    backgroundColor: "blue",
    component: <SlideDetails setName={setName} />,
  },
  {
    key: 3,
    title: "Attachments",
    desc: "You can attach any relevant files (optional)",
    backgroundColor: "green",
    component: <SlideAttachments setName={setName} />,
  },
  {
    key: 4,
    title: "Additional Information",
    desc: "Additional Information",
    backgroundColor: "green",
    component: <SlideAdditional />,
  },
];
