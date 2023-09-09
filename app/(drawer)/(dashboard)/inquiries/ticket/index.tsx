import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Dimensions,
  TextInput,
} from "react-native";
import SubmitTicket from "@/components/ticket/submit";

import RNPickerSelect from "react-native-picker-select";

import Svg, { Path } from "react-native-svg";
import { CloudIcon } from "react-native-heroicons/outline";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import MainContainer from "@/components/container/MainContainer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("first");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("Type something here");

  const Slide1 = () => {
    return (
      <View className="flex flex-col  pr-2 items-center space-y-5 ">
        <StyledTextInput
          // value="Kuyeso Rogers"
          // defaultValue="Kuyeso Rogers"
          placeholder="Name"
          placeholderTextColor="gray"
          onChangeText={(text) => setName(text)}
          className="e w-full"
        />
        <StyledTextInput
          // value="2019bce028@std.must.ac.ug"
          // defaultValue="Kuyeso Rogers"
          onChangeText={(text) => setName(text)}
          className=" w-full"
          placeholder="Email"
          placeholderTextColor="gray"
        />
        <StyledTextInput
          // value="2019/BSE/031/PS"
          placeholder="Reg"
          placeholderTextColor="gray"
          // defaultValue="Kuyeso Rogers"
          onChangeText={(text) => setName(text)}
          className=" w-full"
        />
        <StyledTextInput
          // value="(256) 77 2820 840"
          placeholder="Phone Number"
          placeholderTextColor="gray"
          // defaultValue="Kuyeso Rogers"
          onChangeText={(text) => setName(text)}
          className=" w-full"
        />
      </View>
    );
  };
  const SlideDetails = () => {
    return (
      <View className="flex flex-col  pr-2 items-center space-y-5 ">
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: "Issues with marks", value: "marks" },
            { label: "I want to inquire about dead year", value: "dead year" },
            { label: "Issues with my Id car", value: "hockey" },
          ]}
          placeholder={{
            label: "What is your concern?",
          }}
          style={{
            inputIOS: {
              borderWidth: 1,
              paddingVertical: 14,
              paddingHorizontal: 12,
              borderRadius: 5,
              borderColor: "gray",
            },
            inputAndroid: {
              //   borderWidth: 4,
              //   paddingVertical: 14,
              //   paddingHorizontal: 12,
              //   borderRadius: 5,
              //   borderColor: COLORS.primary,
            },
            viewContainer: {
              backgroundColor: "white",
              borderRadius: 20,
            },
            inputIOSContainer: {
              backgroundColor: "white",
            },
            modalViewBottom: {
              backgroundColor: "white",
              height: 400,
              display: "flex",
            },
            modalViewMiddle: {
              backgroundColor: "white",
              //   borderRadius: 20,
              borderBottomColor: "#86e63b",
              borderBottomWidth: 3,
              margin: 0,
              height: 70,
              display: "flex",
              top: 0,
              //   paddingVertical: 50,
              // marginVertical: 50
            },
            modalViewTop: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              //   opacity: 0.2,
            },
            done: {
              color: "#041633",
              backgroundColor: "#86e63b",
              borderColor: "#041633",
              padding: 7,
              paddingLeft: 15,
              paddingRight: 12,
              paddingTop: 8,
              borderWidth: 1,
              borderRadius: 2,
            },
            chevronDown: {
              borderColor: "#041633",
              height: 10,
              width: 10,
            },
            chevronUp: {
              borderColor: "#041633",
              height: 10,
              width: 10,
            },
            chevron: {
              alignItems: "center",
            },
            headlessAndroidContainer: {
              borderWidth: 1,
              paddingVertical: 14,
              paddingHorizontal: 12,
              borderRadius: 5,
              borderColor: "gray",
            },
            inputAndroidContainer: {
              borderWidth: 1,
              paddingVertical: 14,
              paddingHorizontal: 12,
              borderRadius: 5,
              borderColor: "gray",
            },
          }}
        />

        <View className="flex  flex-row w-full justify-between py-4">
          <View className="flex flex-row items-center space-x-1">
            {/* <RadioButton
              value="first"
              color="#041633"
              status={priority === "first" ? "checked" : "unchecked"}
              onPress={() => setPriority("first")}
            /> */}
            <Text>Priority</Text>
          </View>
          <View className="flex flex-row items-center space-x-1">
            {/* <RadioButton
              value="second"
              color="#041633"
              status={priority === "third" ? "checked" : "unchecked"}
              onPress={() => setPriority("second")}
            /> */}
            <Text>Medium</Text>
          </View>
          <View className="flex flex-row items-center space-x-1">
            {/* <RadioButton
              value="second"
              color="#041633"
              status={priority === "second" ? "checked" : "unchecked"}
              onPress={() => setPriority("second")}
            /> */}
            <Text>Low</Text>
          </View>
        </View>
        <TextInput
          value={subject}
          defaultValue="Kuyeso Rogers"
          onChangeText={(text) => setName(text)}
          className="bg-white w-full"
        />
        <TextInput
          value={description}
          //   defaultValue="Kuyeso Rogers"
          onChangeText={(text) => setDescription(text)}
          multiline
          numberOfLines={5}
          className="bg-white w-full"
        />
      </View>
    );
  };
  // documents and attachments

  //   useEffect(() => {
  //     console.log(JSON.stringify(result, null, 2));
  //   }, [result]);

  //   const handleError = (err: unknown) => {
  //     if (isCancel(err)) {
  //       console.warn("cancelled");
  //       // User cancelled the picker, exit any dialogs or menus and move on
  //     } else if (isInProgress(err)) {
  //       console.warn(
  //         "multiple pickers were opened, only the last will be considered"
  //       );
  //     } else {
  //       throw err;
  //     }
  //   };

  const SlideAttachments = () => {
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
                <CloudIcon color={"gray"} size={80} />
                <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Click to upload or drag and drop
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </Text>
              </View>
            </View>
          </View>
          <Text className="items-center  justify-center text-[#041633] pt-4 font-bold  ">
            Uploaded documents
          </Text>
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
      >
        <TextInput
          value={description}
          placeholder="Type something here"
          defaultValue="Type something here"
          onChangeText={(text) => setDescription(text)}
          multiline
          numberOfLines={5}
          className="bg-white text-start justify-start "
          style={{
            width: Dimensions.get("window").width - 40,
            height: Dimensions.get("screen").height - 500,
          }}
        />
      </View>
    );
  };
  const slides = [
    {
      key: 1,
      title: "Basic Information",
      desc: "Please provide or verify the information below is correct",
      backgroundColor: "red",
      component: <Slide1 />,
    },
    {
      key: 2,
      title: "Inquiry Details",
      desc: "Provide details about your inquiry",
      backgroundColor: "blue",
      component: <SlideDetails />,
    },
    {
      key: 3,
      title: "Attachments",
      desc: "You can attach any relevant files (optional)",
      backgroundColor: "green",
      component: <SlideAttachments />,
    },
    {
      key: 4,
      title: "Additional Information",
      desc: "Additional Information",
      backgroundColor: "green",
      component: <SlideAdditional />,
    },
  ];
  const handleDone = () => {
    // setIsFirstTimeLoad(false);
    // AsyncStorage.setItem("isFirstTimeOpen", "no");
  };
  //   if (loading) return null;
  return (
    <MainContainer
      className="flex-1 flex-col px-4 pt-12 "
      style={{
        width: Dimensions.get("window").width,
      }}
    >
      {/* <StatusBar hidden /> */}
      <SubmitTicket onDone={handleDone} slides={slides} />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
