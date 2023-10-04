import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Dimensions,
  TextInput,
  Image,
  Platform,
} from "react-native";
import SubmitTicket from "@/components/ticket/submit";

import RNPickerSelect from "react-native-picker-select";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import Svg, { Path } from "react-native-svg";
import {
  CalendarDaysIcon,
  CloudIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneArrowUpRightIcon,
} from "react-native-heroicons/outline";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import MainContainer from "@/components/container/MainContainer";
import StyledText from "@/components/Text/StyledText";
import DropdownSelect from "react-native-input-select";

import concernsData from "@/data/concernsData.json";
import StyledView from "@/components/View/StyledView";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

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
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  // concern
  const [selectedConcern, setSelectedConcern] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState<any>("");
  const [completedSteps, setCompletedSteps] = useState([]);
  const handleConcernChange = (value) => {
    setSelectedConcern(value);
    setCurrentStep(0);
    setFormData({});
    setCompletedSteps([]);
  };

  const handleStepChange = (value) => {
    const updatedFormData = { ...formData, [currentStep]: value };
    setFormData(updatedFormData);

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }

    if (currentStep < concernsData[selectedConcern].steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const currentConcern = concernsData[selectedConcern];
  const currentStepData = currentConcern?.steps[currentStep];

  const Slide1 = () => {
    return (
      <View className="flex flex-col  pr-2 items-center space-y-4 ">
        <StyledTextInput
          // value="Kuyeso Rogers"
          // defaultValue="Kuyeso Rogers"
          placeholder="Name"
          placeholderTextColor="gray"
          onChangeText={(text) => setName(text)}
          className="e w-full"
          style={{
            borderRadius: 15,
            paddingVertical: 13,
            borderColor: activeColors.grayAccent,
            borderWidth: 1,
          }}
        />
        <View className="flex  w-full">
          <StyledText
            className="text-sm pb-4"
            style={{
              color: activeColors.gray,
            }}
          >
            This is the name that will be displayed on your ticket and to the
            person who will be handling your ticket
          </StyledText>
        </View>
        <StyledTextInput
          // value="2019bce028@std.must.ac.ug"
          // defaultValue="Kuyeso Rogers"
          onChangeText={(text) => setName(text)}
          className=" w-full"
          placeholder="Email"
          placeholderTextColor="gray"
          style={{
            borderRadius: 15,
            paddingVertical: 13,
            borderColor: activeColors.grayAccent,
            borderWidth: 1,
          }}
        />
        <StyledTextInput
          // value="2019/BSE/031/PS"
          placeholder="Reg"
          placeholderTextColor="gray"
          // defaultValue="Kuyeso Rogers"
          onChangeText={(text) => setName(text)}
          className=" w-full"
          style={{
            borderRadius: 15,
            paddingVertical: 13,
            borderColor: activeColors.grayAccent,
            borderWidth: 1,
          }}
        />
        <StyledTextInput
          // value="(256) 77 2820 840"
          placeholder="Phone Number"
          placeholderTextColor="gray"
          // defaultValue="Kuyeso Rogers"
          onChangeText={(text) => setName(text)}
          className=" w-full"
          style={{
            borderRadius: 15,
            paddingVertical: 13,
            borderColor: activeColors.grayAccent,
            borderWidth: 1,
          }}
        />
      </View>
    );
  };
  const SlideDetails = () => {
    return (
      <View className="flex flex-col  pr-2 items-center space-y-0 ">
        {/* <RNPickerSelect
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
              borderRadius: 12,
              borderColor: activeColors.secondary,
              color: activeColors.tint,
            },
            inputAndroid: {
              borderWidth: 1,
              borderRadius: 12,
              borderColor: activeColors.secondary,
              color: activeColors.tint,
            },
            viewContainer: {
              backgroundColor: activeColors.secondary,
              borderRadius: 12,
              borderColor: activeColors.grayAccent,
              borderWidth: 1,
            },
            inputIOSContainer: {
              backgroundColor: activeColors.secondary,
            },
            inputAndroidContainer: {
              backgroundColor: activeColors.secondary,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: activeColors.grayAccent,
            },
            modalViewBottom: {
              backgroundColor: activeColors.secondary,
            },
            modalViewMiddle: {
              backgroundColor: activeColors.secondary,
              //   borderRadius: 20,
              borderBottomColor: activeColors.grayAccent,
              borderBottomWidth: 1,
            },
            modalViewTop: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              //   opacity: 0.2,
            },
            done: {
              color: activeColors.tint,
              backgroundColor: activeColors.secondary,
              borderColor: "#041633",
              padding: 7,
              paddingLeft: 15,
              paddingRight: 12,
              paddingTop: 8,
              borderWidth: 1,
              borderRadius: 2,
            },
            chevronDown: {
              borderColor: activeColors.grayAccent,
              height: 10,
              width: 10,
            },
            chevronUp: {
              borderColor: activeColors.grayAccent,
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
              borderColor: activeColors.grayAccent,
            },
            headlessAndroidPicker: {
              borderWidth: 1,
              borderRadius: 5,
              borderColor: activeColors.grayAccent,
            },
          }}
        /> */}
        <DropdownSelect
          placeholder="Select your issue/concern"
          options={[
            ...Object.keys(concernsData).map((concern) => ({
              label: concern,
              value: concern,
            })),
          ]}
          modalOptionsContainerStyle={{
            backgroundColor: activeColors.primary,
          }}
          checkboxLabelStyle={{
            color: activeColors.tint,
          }}
          selectedValue={selectedConcern}
          onValueChange={handleConcernChange}
          isSearchable
          primaryColor={activeColors.accent}
          dropdownStyle={{
            borderWidth: 1, // To remove border, set borderWidth to 0
            borderColor: activeColors.grayAccent,
            borderRadius: 12,
            backgroundColor: activeColors.secondary,
          }}
          placeholderStyle={{
            color: activeColors.tint,
            fontSize: 15,
            fontWeight: "500",
          }}
          labelStyle={{
            color: activeColors.tint,
            fontSize: 15,
            fontWeight: "500",
          }}
          selectedItemStyle={{
            color: activeColors.tint,
            fontSize: 15,
            fontWeight: "500",
          }}
          dropdownIcon={
            users && (
              <StyledView
                style={{
                  borderRadius: 30 / 2,
                  borderColor: activeColors.accent,
                  borderWidth: 2,
                  backgroundColor: activeColors.secondary,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 15 / 2,
                    backgroundColor: activeColors.accent,
                    margin: 5,
                  }}
                />
              </StyledView>
            )
          }
          dropdownIconStyle={
            users && {
              top: 20,
              right: 15,
            }
          }
          searchControls={{
            textInputStyle: {
              color: activeColors.tint,
              fontWeight: "500",
              minHeight: 10,
              paddingVertical: 10,
              paddingHorizontal: 25,
              width: "100%",
              textAlign: "left",
              backgroundColor: activeColors.secondary,
              borderColor: activeColors.grayAccent,
              borderWidth: 1,
              borderRadius: 12,
            },
            textInputContainerStyle: {
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: activeColors.secondary,
              borderRadius: 12,
              borderColor: activeColors.grayAccent,
              borderWidth: 1,
            },
            textInputProps: {
              placeholder: "Search for your Issues here",
              placeholderTextColor: activeColors.tint,
            },
          }}
        />
        <View className="flex  w-full">
          <StyledText
            className="text-sm pt-0"
            style={{
              color: activeColors.gray,
            }}
          >
            You need to select the category that best describes your issue or
            concern from the list below to help us route your ticket to the best
            person
          </StyledText>
        </View>
        {/* step */}
        {currentConcern && (
          <View className="flex  w-full">
            <StyledText
              className="text-sm pt-4 pb-2"
              style={{
                color: activeColors.accent,
              }}
            >
              {currentStepData.question}
            </StyledText>

            {currentStepData.type === "select" ? (
              <DropdownSelect
                placeholder={currentStepData.placeholder}
                options={[
                  ...currentStepData.options.map((option) => ({
                    label: option,
                    value: option,
                  })),
                ]}
                modalOptionsContainerStyle={{
                  backgroundColor: activeColors.primary,
                }}
                checkboxLabelStyle={{
                  color: activeColors.tint,
                }}
                selectedValue={formData[currentStep] || ""}
                onValueChange={handleStepChange}
                isSearchable
                primaryColor={activeColors.accent}
                dropdownStyle={{
                  borderWidth: 1, // To remove border, set borderWidth to 0
                  borderColor: activeColors.grayAccent,
                  borderRadius: 12,
                  backgroundColor: activeColors.secondary,
                }}
                placeholderStyle={{
                  color: activeColors.tint,
                  fontSize: 15,
                  fontWeight: "500",
                }}
                labelStyle={{
                  color: activeColors.tint,
                  fontSize: 15,
                  fontWeight: "500",
                }}
                selectedItemStyle={{
                  color: activeColors.tint,
                  fontSize: 15,
                  fontWeight: "500",
                }}
                dropdownIcon={
                  users && (
                    <StyledView
                      style={{
                        borderRadius: 30 / 2,
                        borderColor: activeColors.accent,
                        borderWidth: 2,
                        backgroundColor: activeColors.secondary,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: 15,
                          height: 15,
                          borderRadius: 15 / 2,
                          backgroundColor: activeColors.accent,
                          margin: 5,
                        }}
                      />
                    </StyledView>
                  )
                }
                dropdownIconStyle={
                  users && {
                    top: 20,
                    right: 15,
                  }
                }
                searchControls={{
                  textInputStyle: {
                    color: activeColors.tint,
                    fontWeight: "500",
                    minHeight: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                    width: "100%",
                    textAlign: "left",
                    backgroundColor: activeColors.secondary,
                    borderColor: activeColors.grayAccent,
                    borderWidth: 1,
                    borderRadius: 12,
                  },
                  textInputContainerStyle: {
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: activeColors.secondary,
                    borderRadius: 12,
                    borderColor: activeColors.grayAccent,
                    borderWidth: 1,
                  },
                  textInputProps: {
                    placeholder: "Search for your Issues here",
                    placeholderTextColor: activeColors.tint,
                  },
                }}
              />
            ) : (
              <View className="w-full py-4">
                <StyledTextInput
                  style={{
                    borderRadius: 15,
                    textAlignVertical: "top",
                    textAlign: "justify",
                    borderColor: activeColors.grayAccent,
                    borderWidth: 1,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                  rows={5}
                  value={formData[currentStep] || ""}
                  onChangeText={handleStepChange}
                  placeholder={currentStepData.placeholder}
                  placeholderTextColor={activeColors.gray}
                />
              </View>
            )}
          </View>
        )}
        <View className="flex  w-full">
          {currentConcern && (
            <StyledText className=" pb-2">Summary of Ticket</StyledText>
          )}
          {/* get all questions */}
          {currentConcern?.steps.map((step, index) => (
            <View
              key={index}
              style={{
                marginBottom: 2,
                gap: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="checkbox-marked"
                color={
                  completedSteps.includes(index)
                    ? activeColors.accent
                    : activeColors.grayAccent
                }
                size={20}
              />
              <StyledText
                style={[
                  completedSteps.includes(index)
                    ? {
                        color: activeColors.tint,
                        fontWeight: "bold",
                        fontSize: 12,
                      }
                    : {
                        color: activeColors.gray,
                        fontWeight: "normal",
                        fontSize: 12,
                      },
                ]}
              >
                {step.question}
              </StyledText>
            </View>
          ))}
        </View>
        {/* {currentStep === currentConcern.steps.length - 1 && (
          <View className="flex  w-full">
            <StyledText className="text-sm pt-4">Summary of Ticket</StyledText>
            <StyledText
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="check-circle"
                color={activeColors.accent}
                size={20}
              /> */}
        {/* {JSON.stringify(formData, null, 2)} */}
        {/* </StyledText>
          </View>
        )} */}
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
    const [image, setImage] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    return (
      <View
        style={{
          width: Dimensions.get("window").width - 40,
        }}
        className="flex flex-col  items-center "
      >
        <View
          style={{
            width: Dimensions.get("window").width - 40,
          }}
          className="flex "
        >
          <View className="flex items-center justify-center w-full">
            <Pressable
              className="flex flex-col items-center justify-center w-full h-56 border-2  border-dashed rounded-lg "
              style={[
                {
                  backgroundColor: activeColors.secondary,
                  borderRadius: 5,
                  borderColor: activeColors.grayAccent,
                },
              ]}
              onPress={pickImage}
            >
              <View className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudIcon color={activeColors.gray} size={80} />
                <StyledText className="mb-2 text-sm  ">
                  Click to upload or drag and drop
                </StyledText>
                <StyledText className="text-xs ">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </StyledText>
              </View>
            </Pressable>
          </View>
          <StyledText
            className="items-center  justify-center pt-4 font-bold  "
            style={{
              color: activeColors.gray,
            }}
          >
            Uploaded documents
          </StyledText>
          <View className="w-full pt-2">
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: 250,
                  borderRadius: 5,
                  borderColor: activeColors.grayAccent,
                  borderWidth: 1,
                }}
              />
            )}
          </View>
        </View>
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
        <View style={{}} className=" flex-1 rounded-3xl py-4 w-full ">
          <View className="flex flex-row pb-4 justify-between items-center ">
            <View className=" items-center space-x-2 flex flex-row">
              <CalendarDaysIcon size={20} strokeWidth={2} color={"gray"} />
              <StyledText>06 May, 2023</StyledText>
            </View>
          </View>
          <ScrollView>
            <StyledView
              className="  rounded-md border  w-full "
              style={{ borderColor: activeColors.grayAccent }}
            >
              <View
                style={[
                  {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                    // paddingVertical: Platform.OS === "ios" ? 10 : 5,
                    // borderRadius: 5,
                    marginRight: 0,
                    marginTop: 10,
                  },
                  { borderWidth: 0, borderLeftWidth: 5 },
                  { borderColor: activeColors.accent },
                ]}
                className="py-4 "
              >
                <View />
                <View className="flex px-4 pb-2 flex-row justify-between items-center w-full">
                  <StyledText bold>Kuyeso Rogers</StyledText>
                  <Entypo name="star" size={18} color={"orange"} />
                </View>
                <View className="flex px-4 flex-row justify-between items-center w-full">
                  <Text
                    className=" font-semibold"
                    style={{
                      color: activeColors.accent,
                    }}
                  >
                    Missing Marks
                  </Text>
                </View>
              </View>
              <View
                style={[
                  {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                    // paddingVertical: Platform.OS === "ios" ? 10 : 5,
                    // borderRadius: 5,
                    marginRight: 0,
                    marginTop: 10,
                  },
                  {
                    borderColor: "#041633",
                    borderWidth: 0,
                    borderLeftWidth: 5,
                  },
                ]}
                className="py-4  "
              >
                <View />
                <View className="flex pb-2 flex-row justify-between items-center px-4 space-x-5 ">
                  <View className=" items-center space-x-2 flex flex-row">
                    <PhoneArrowUpRightIcon
                      size={15}
                      strokeWidth={2}
                      color={"gray"}
                    />
                    <Text
                      className="text-xs "
                      style={{
                        color: activeColors.gray,
                      }}
                    >
                      (256) 772 820 840
                    </Text>
                  </View>
                  <View className=" items-center space-x-2 flex flex-row">
                    <EnvelopeIcon size={15} color={"gray"} strokeWidth={2} />
                    <Text
                      className="text-xs "
                      style={{
                        color: activeColors.gray,
                      }}
                    >
                      2019bce028@std.must.ac.ug
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row justify-between items-center px-4">
                  <View className=" items-center space-x-2 flex flex-row">
                    <MaterialCommunityIcons
                      size={15}
                      strokeWidth={2}
                      color={activeColors.gray}
                      name="identifier"
                    />
                    <Text
                      className=" font-medium"
                      style={{
                        color: activeColors.gray,
                      }}
                    >
                      2019/BSE/031/PS
                    </Text>
                  </View>
                </View>
              </View>
            </StyledView>
            <StyledView
              className="space-y-2   rounded-md border p-4  mt-4 w-full"
              style={{ borderColor: activeColors.grayAccent }}
            >
              <ScrollView
                bounces
                showsVerticalScrollIndicator={false}
                style={{
                  maxHeight: Dimensions.get("screen").height - 680,
                }}
              >
                <Text
                  className=" font-semibold  "
                  style={{
                    color: activeColors.tint,
                  }}
                >
                  Details -
                </Text>
                <Text
                  className=" font-normal  "
                  style={{
                    color: activeColors.gray,
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic Lorem Ipsum is simply dummy text
                  of the printing and typesetting industry. Lorem Ipsum has been
                  the industry's standard dummy text ever since the 1500s, when
                  an unknown printer took a galley of type and scrambled it to
                  make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic{" "}
                </Text>
              </ScrollView>
            </StyledView>
          </ScrollView>
        </View>
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
      title: "Review your Information",
      desc: "Please review your information for any errors before submitting",
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
      className="flex-1 flex-col px-4 pt-14 "
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
  outerCircle: {
    borderRadius: 30 / 2,
    borderColor: "green",
    borderWidth: 2,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: "green",
    margin: 5,
  },
});
