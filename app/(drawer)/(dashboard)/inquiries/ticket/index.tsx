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

import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
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

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Stack, router, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/redux/actions/userAction";
import { createTicketAction } from "@/redux/actions/ticketAction";
import { TouchableOpacity } from "react-native";

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
            selectedConcern ? (
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
                    width: 10,
                    height: 10,
                    borderRadius: 15 / 2,
                    backgroundColor: activeColors.accent,
                    margin: 5,
                  }}
                />
              </StyledView>
            ) : (
              <View>
                <MaterialCommunityIcons
                  name="chevron-down"
                  color={activeColors.tint}
                  size={20}
                />
              </View>
            )
          }
          dropdownIconStyle={
            selectedConcern && {
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
                options={
                  currentStepData.isPerson === true
                    ? users.filter(
                        (user) => user.role.name === currentStepData.role
                      ).length > 0
                      ? users
                          .filter(
                            (user) => user.role.name === currentStepData.role
                          )
                          .map((user) => ({
                            label: user.name,
                            value: user._id,
                          }))
                      : currentStepData.options.map((option) => ({
                          label: option,
                          value: option,
                        }))
                    : currentStepData.options.map((option) => ({
                        label: option,
                        value: option,
                      }))
                }
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
                  formData[currentStep] ? (
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
                          width: 10,
                          height: 10,
                          borderRadius: 15 / 2,
                          backgroundColor: activeColors.accent,
                          margin: 5,
                        }}
                      />
                    </StyledView>
                  ) : (
                    <View>
                      <MaterialCommunityIcons
                        name="chevron-down"
                        color={activeColors.tint}
                        size={20}
                      />
                    </View>
                  )
                }
                dropdownIconStyle={
                  formData[currentStep] && {
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
                {/* check if there are still more steps left */}
                {/* {currentStep < currentConcern.steps.length - 1 && (
                  <TouchableOpacity
                    onPress={handleStepChange}
                    className="flex flex-row justify-between items-center"
                  >
                    <View></View>
                    <View className="pb-2 items-center flex-row justify-center ">
                      <StyledText
                        className="text-sm  pr-2 items-center justify-center text-center"
                        style={{
                          color: activeColors.tint,
                        }}
                      >
                        Next
                      </StyledText>
                      <MaterialCommunityIcons
                        name="arrow-right"
                        color={activeColors.tint}
                        size={25}
                      />
                    </View>
                  </TouchableOpacity>
                )} */}
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
                  // value={formData[currentStep] || ""}
                  onChangeText={(text) => (formData[currentStep] = text)}
                  value={formData[currentStep]}
                  // onChangeText={(v) => setCurrentValue(v)}
                  onEndEditing={() => handleStepChange(formData[currentStep])}
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
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        // @ts-ignore
        setImage("data:image/jpeg;base64," + image.data);
      }
    });
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // console.log(result);

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
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
              <CloudIcon color={activeColors.accent} size={90} />
              <StyledText className="my-2 text-sm  ">
                Press to upload or drag and drop
              </StyledText>
              <StyledText className="text-xs ">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </StyledText>
            </View>
          </Pressable>
        </View>
        {image && (
          <StyledText
            className="items-center  justify-center pt-4 font-bold  "
            style={{
              color: activeColors.tint,
            }}
          >
            Uploaded documents
          </StyledText>
        )}
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
  const [selectedUser, setSelectedUser] = useState("");
  const [assignedToUser, setAssignedToUser] = useState({
    name: "",
    userName: "",
    avatar: { url: "" },
    role: {
      name: "",
      position: "",
    },
    email: "",
    _id: "",
    phone: "",
  });
  const { users, user, isLoading } = useSelector((state: any) => state.user);
  const [formData, setFormData] = useState({
    // ...concernsData,
    // selectedUser: "",
  });

  const [completedSteps, setCompletedSteps] = useState([]);
  const handleConcernChange = (value) => {
    setSelectedConcern(value);
    setCurrentStep(0);
    setFormData({
      // ...concernsData,
      // selectedUser: "",
    });
    setCompletedSteps([]);
  };

  // Person to submit ticket

  const [person, setPerson] = useState({
    name: "",
    userName: "",
    avatar: { url: "" },
    role: {
      name: "",
      position: "",
    },
    email: "",
    _id: "",
    phone: "",
  });
  const handleStepChange = (value) => {
    // get user id of the selected user from the form data
    if (currentStepData?.isPerson === true) {
      const selectedUser = users.filter((user) => user._id === value)[0];
      setAssignedToUser({
        name: selectedUser.name,
        userName: selectedUser.userName,
        avatar: selectedUser.avatar,
        role: selectedUser.role,
        email: selectedUser.email,
        _id: selectedUser._id,
        phone: selectedUser.phone,
      });
      setSelectedUser(selectedUser._id);
      setPerson(selectedUser);
    }

    // update form data

    const updatedFormData = {
      ...formData,
      studentID,
      name,
      email,
      [currentStep]: value,
    };

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
  const dispatch = useDispatch();

  const [replies, setReplies] = useState([
    {
      title: "",
      image: "",
      user,
    },
  ]);
  // console.warn(email, name, studentID, phoneNumber);
  var tempEmail = "";
  var tempName = "";
  var tempStudentID = "";
  var tempPhoneNumber = "";

  // useEffect(() => {

  // }, []);
  const [data, setData] = useState([
    {
      name: "",
      userName: "",
      avatar: { url: "" },
      role: {
        name: "",
      },
      email: "",
      _id: "",
    },
  ]);

  // get all users from redux
  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    if (users) {
      setData(users);
    }
  }, [users]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setStudentID(user.regno);
      setPhoneNumber(user.phone);
    }
  }, [user]);

  const Slide1 = () => {
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
                <View>
                  <View className="flex  pb-2 flex-row justify-between items-center w-full">
                    <StyledText bold>{person.name}</StyledText>
                  </View>
                  <View className="flex flex-row justify-between items-center w-full">
                    <Text
                      className=" font-semibold"
                      style={{
                        color: activeColors.accent,
                      }}
                    >
                      {person.role.position}
                    </Text>
                  </View>
                </View>
                <View className="flex pb-4 pt-2 flex-row justify-between items-center px-4 space-x-5 ">
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
                      {person.phone || "null"}
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
                      {person.email || "null"}
                    </Text>
                  </View>
                </View>
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
          users={data}
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

  const { isSuccess } = useSelector((state: any) => state.ticket);
  const [isLoadingTicket, setIsLoadingTicket] = useState(false);
  const router = useRouter();
  const handleDone = () => {
    setIsLoadingTicket(true);
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
    } else if (selectedConcern === "" || null) {
      if (Platform.OS === "ios") {
        alert("Please select a concern to continue");
      } else {
        ToastAndroid.show("Please select a concern to continue", 1000);
      }
      return;
    } else if (Object.keys(formData).length < currentConcern.steps.length) {
      if (Platform.OS === "ios") {
        alert("Please fill in all the required fields to continue");
      } else {
        ToastAndroid.show(
          "Please fill in all the required fields",
          ToastAndroid.LONG
        );
      }
      return;
    } else {
      setIsCompleted(true);
      const title = selectedConcern;
      const descriptionData = {
        ...Object.keys(formData).map((obj, i) => {
          return {
            [obj]: formData[obj],
          };
        }),
      };

      const description = formData;

      createTicketAction(
        title,
        image,
        user,
        description,
        assignedToUser,
        replies
      )(dispatch);
    }

    // if (isSuccess) {
    setIsCompleted(false);
    setSelectedConcern("");
    setCurrentStep(0);
    setSelectedUser("");
    setAssignedToUser({
      name: "",
      userName: "",
      avatar: { url: "" },
      role: {
        name: "",
        position: "",
      },
      email: "",
      _id: "",
      phone: "",
    });

    setCompletedSteps([]);

    setImage(null);
    // navigation.navigate("Home");
    setIsLoadingTicket(false);
    router.replace("/inquiries");
    // }
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
      <SubmitTicket
        onDone={handleDone}
        isLoadingTicket={isLoadingTicket}
        slides={slides}
      />
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
