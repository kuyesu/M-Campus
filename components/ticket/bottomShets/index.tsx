import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Pressable,
  Switch,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { AntDesign, Entypo } from "@expo/vector-icons";

import { ScrollView } from "react-native-gesture-handler";
import StyledBottomSheet from "@/components/BottomSheet/StyledBottomSheet";

export const WithdrawTicket = ({ bottomSheetModalRef, setIsOpen, zIndex }) => {
  const snapPoints = ["35%", "70%", "100%"];
  const [name, setName] = useState("");
  const [device, setDevice] = useState("");
  const { width } = useWindowDimensions();
  const [year, setYear] = useState("1");

  return (
    <StyledBottomSheet
      bottomSheetModalRef={bottomSheetModalRef}
      snapPoints={snapPoints}
      setIsOpen={setIsOpen(false)}
      index={1}
    >

        <View
          className="flex-1 px-4 pt-4 z-50"
          style={{
            zIndex: zIndex,
          }}
        >
          <Text
            style={[styles.title, { marginBottom: 20, fontSize: 18 }]}
            className=""
          >
            Widthdraw this Request
          </Text>
          <ScrollView className="flex flex-col    space-y-4 pt-4 ">
            <View className="flex  space-y-3 pb-4 flex-col  justify-between items-start w-full">
              <Pressable
                className="flex flex-row space-x-2 items-center"
                onPress={() => setYear("1")}
              >
                {year === "1" ? (
                  <AntDesign name="checkcircle" size={24} color="#86e63b" />
                ) : (
                  <Entypo name="circle" size={24} color="#041633" />
                )}
                <Text className="font-medium text-gray-500 text-base">
                  I manage to figure it out
                </Text>
              </Pressable>
              <Pressable
                className="flex flex-row space-x-2 items-center"
                onPress={() => setYear("2")}
              >
                {year === "2" ? (
                  <AntDesign name="checkcircle" size={24} color="#86e63b" />
                ) : (
                  <Entypo name="circle" size={24} color="#041633" />
                )}
                <Text className="font-medium text-gray-500 text-base">
                  My issues was resolved by an administrator
                </Text>
              </Pressable>
              <Pressable
                className="flex flex-row space-x-2 items-center"
                onPress={() => setYear("3")}
              >
                {year === "3" ? (
                  <AntDesign name="checkcircle" size={24} color="#86e63b" />
                ) : (
                  <Entypo name="circle" size={24} color="#041633" />
                )}
                <Text className="font-medium text-gray-500 text-base">
                  I gave up, no one responded
                </Text>
              </Pressable>
              <Pressable
                className="flex flex-row space-x-2 items-center"
                onPress={() => setYear("4")}
              >
                {year === "4" ? (
                  <AntDesign name="checkcircle" size={24} color="#86e63b" />
                ) : (
                  <Entypo name="circle" size={24} color="#041633" />
                )}
                <Text className="font-medium text-gray-500 text-base">
                  A friend assisted me
                </Text>
              </Pressable>
              <Pressable
                className="flex flex-row space-x-2 items-center"
                onPress={() => setYear("5")}
              >
                {year === "5" ? (
                  <AntDesign name="checkcircle" size={24} color="#86e63b" />
                ) : (
                  <Entypo name="circle" size={24} color="#041633" />
                )}
                <Text className="font-medium text-gray-500 text-base">
                  I just don{"'"}t want to handle it now
                </Text>
              </Pressable>
            </View>
            <View className=" items-start flex w-full justify-start">
              <Text className=" font-medium text-gray-500 text-base">
                Reason for withdrawing (Optional)
              </Text>
            </View>
            <TextInput
              value=""
              defaultValue="Kuyeso Rogers"
              onChangeText={(text) => setName(text)}
              multiline
              numberOfLines={5}
              className="bg-white w-full"
            />

            <View className="flex pt-4 w-full pr-1">
              <TouchableOpacity
                // onPress={handleNext}
                className="p-2.5 items-center  justify-center border-[#041633] border font-bold  w-full "
              >
                <Text className="font-semibold up text-lg text-[#041633]">
                  Withdraw Submission
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
    </StyledBottomSheet>
  );
};

export const ManageNotifications = ({ bottomSheetModalRef, setIsOpen }) => {
  const snapPoints = ["35%", "58%", "75%"];
  const [darkmode, setDarkmode] = useState(false);
  const [device, setDevice] = useState(true);
  const { width } = useWindowDimensions();
  const [theme, setTheme] = useState("dim");
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 5 }}
        onDismiss={() => setIsOpen(false)}
      >
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { marginBottom: 20 }]} className="">
            Manage Notifications
          </Text>
          <View style={styles.row}>
            <Text style={styles.subtitle}>
              Allow all Incoming Notifications
            </Text>
            <Switch
              style={
                {
                  // borderColor: "#041633",
                  // borderWidth: 1,
                }
              }
              ios_backgroundColor="#041633"
              value={darkmode}
              onChange={() => setDarkmode(!darkmode)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.subtitle}>Important Notifications</Text>
            <Switch
              disabled
              value={device}
              style={
                {
                  // borderColor: "#041633",
                  // borderWidth: 1,
                }
              }
              ios_backgroundColor="#041633"
              onChange={() => setDevice(!device)}
            />
          </View>
          <Text style={styles.description}>
            Stay in control by disabling updates / notifications from the posts,
            but never miss out on important updates.
          </Text>
          <View
            style={{
              width: width,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "gray",
              marginVertical: 30,
            }}
          />
          <Text style={[styles.title, { width: "100%" }]}>News & Forum</Text>
          <Pressable style={styles.row} onPress={() => setTheme("dim")}>
            <Text style={styles.subtitle}>I don{"'"}t want to know</Text>
            {theme === "dim" ? (
              <AntDesign
                name="checkcircle"
                size={24}
                color="#86e63b"
                style={
                  {
                    // borderColor: "#041633",
                    // borderWidth: 1,
                    // borderRadius: 13,
                  }
                }
              />
            ) : (
              <Entypo name="circle" size={24} color="#041633" />
            )}
          </Pressable>
          <Pressable style={styles.row} onPress={() => setTheme("lightsOut")}>
            <Text style={styles.subtitle}>Allows</Text>
            {theme === "lightsOut" ? (
              <AntDesign name="checkcircle" size={24} color="#86e63b" />
            ) : (
              <Entypo name="circle" size={24} color="#041633" />
            )}
          </Pressable>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subtitle: {
    color: "#101318",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 14,
    fontWeight: "normal",
    width: "100%",
  },
});
