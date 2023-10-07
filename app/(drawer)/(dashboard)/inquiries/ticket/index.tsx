import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  TextInput,
  Image,
  Platform,
  ToastAndroid,
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SlideDetails = ({
  currentStepData,
  selectedConcern,
  handleConcernChange,
  users,
  currentConcern,
  handleStepChange,
  completedSteps,
  formData,
  currentStep,
}) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  return (
    <ScrollView
      bounces
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        maxHeight: Dimensions.get("screen").height - 380,
      }}
    >
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
          {currentConcern && (
            <StyledText className=" pb-2">
              Summary of steps required to submit this Ticket
            </StyledText>
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
        <View className="flex  w-full">
          <StyledText
            className="text-sm pt-4"
            style={{
              color: activeColors.gray,
            }}
          >
            Choose a category to route your ticket correctly.
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
                  className=" text-justify"
                  rows={5}
                  multiline={true}
                  value={formData[currentStep] || ""}
                  onChangeText={handleStepChange}
                  placeholder={currentStepData.placeholder}
                  placeholderTextColor={activeColors.gray}
                />
              </View>
            )}
          </View>
        )}

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

        {/* </StyledText>
          </View>
        )} */}
      </View>
    </ScrollView>
  );
};

const SlideAttachments = ({ image, setImage }) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

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

export default function App() {
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);

  const [isCompleted, setIsCompleted] = useState(false);
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

  // console.warn(email, name, studentID, phoneNumber);
  var tempEmail = "";
  var tempName = "";
  var tempStudentID = "";
  var tempPhoneNumber = "";
  var temDescription = "";

  // useEffect(() => {

  // }, []);

  const Slide1 = () => {
    const [name1, setName11] = useState("");
    // const [studentID1, setStudentID1] = useState("");
    const [email1, setEmail1] = useState("");
    // const [phoneNumber1, setPhoneNumber1] = useState("");
    // const [category, setCategory] = useState("");

    return (
      <KeyboardAwareScrollView>
        <View className="flex flex-col  pr-2 items-center space-y-4 ">
          <TextInput editable selectTextOnFocus />
          <StyledTextInput
            // value="Kuyeso Rogers"
            editable
            // defaultValue={name}
            placeholder="Name"
            selectTextOnFocus
            placeholderTextColor="gray"
            onChangeText={(val) => (tempName = val)}
            onEndEditing={() => setName(tempName)}
            defaultValue={name}
            className="e w-full"
            keyboardAppearance={theme.mode === "dark" ? "dark" : "light"}
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
            keyboardType="text"
            // value={email}
            selectTextOnFocus
            onChangeText={(val) => (tempEmail = val)}
            onEndEditing={() => setEmail(tempEmail)}
            defaultValue={email}
            // onChangeText={(text) => setEmail1(text)}
            // onEndEditing={(text) => setEmail(text)}
            className=" w-full"
            placeholder="Email"
            keyboardAppearance={theme.mode === "dark" ? "dark" : "light"}
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

            keyboardAppearance={theme.mode === "dark" ? "dark" : "light"}
            onChangeText={(val) => (tempStudentID = val)}
            onEndEditing={() => setStudentID(tempStudentID)}
            defaultValue={studentID}
            // onEndEditing={() => setStudentID(studentID1)}
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
            // value={phoneNumber}
            onChangeText={(val) => (tempPhoneNumber = val)}
            onEndEditing={() => setPhoneNumber(tempPhoneNumber)}
            defaultValue={phoneNumber}
            className=" w-full"
            keyboardAppearance={theme.mode === "dark" ? "dark" : "light"}
            style={{
              borderRadius: 15,
              paddingVertical: 13,
              borderColor: activeColors.grayAccent,
              borderWidth: 1,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
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
              <StyledText>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </StyledText>
            </View>
          </View>
          <ScrollView
            bounces
            showsVerticalScrollIndicator={false}
            style={{
              maxHeight: Dimensions.get("screen").height - 450,
            }}
          >
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
                  <StyledText bold>{name}</StyledText>
                  <Entypo name="star" size={18} color={"orange"} />
                </View>
                <View className="flex px-4 flex-row justify-between items-center w-full">
                  <Text
                    className=" font-semibold"
                    style={{
                      color: activeColors.accent,
                    }}
                  >
                    {selectedConcern}
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
                      {phoneNumber || "null"}
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
                      {email || "null"}
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
                      {studentID || "null"}
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
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                    // paddingVertical: Platform.OS === "ios" ? 10 : 5,
                    // borderRadius: 5,
                    marginRight: 0,
                    marginTop: 10,
                  }}
                >
                  {Object.keys(formData).map((obj, i) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                        key={i}
                      >
                        <StyledText
                          style={{
                            color: activeColors.gray,
                          }}
                          bold
                        >
                          {obj} : &nbsp;
                        </StyledText>
                        <Text
                          className=" font-normal text-justify   "
                          style={{
                            color: activeColors.gray,
                          }}
                        >
                          {formData[obj]}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                {/* <Text
                  className=" font-normal  "
                  style={{
                    color: activeColors.gray,
                  }}
                >
                  {JSON.stringify(formData, null, 2)}
                </Text> */}
              </ScrollView>
            </StyledView>
            <View
              style={{
                paddingVertical: 20,
              }}
            >
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
      component: (
        <SlideDetails
          currentStepData={currentStepData}
          selectedConcern={selectedConcern}
          handleConcernChange={handleConcernChange}
          users={users}
          currentConcern={currentConcern}
          handleStepChange={handleStepChange}
          completedSteps={completedSteps}
          formData={formData}
          currentStep={currentStep}
        />
      ),
    },
    {
      key: 3,
      title: "Attachments",
      desc: "You can attach any relevant files (optional)",
      backgroundColor: "green",
      component: <SlideAttachments image={image} setImage={setImage} />,
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
    if (
      name === "" ||
      null ||
      studentID === "" ||
      null ||
      email === "" ||
      null ||
      phoneNumber === "" ||
      null
    ) {
      if (Platform.OS === "ios") {
        alert("Please fill in all the required required fields to continue");
      } else {
        ToastAndroid.show(
          "Please fill in all the required fields",
          ToastAndroid.LONG
        );
      }
      return;
    }
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
      <StatusBar
        // backgroundColor={activeColors.primary}
        style={theme.mode === "dark" ? "light" : "dark"}
      />
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
