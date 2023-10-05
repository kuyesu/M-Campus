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
import React, { useState, useContext } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import StyledBottomSheet from "@/components/BottomSheet/StyledBottomSheet";
import StyledText from "@/components/Text/StyledText";
import { StyledTouchableOpacity } from "@/components/buttons/StyledTouchableOpacity";
import StyledTextInput from "@/components/TextInput/StyledTextInput";

export const WithdrawTicket = ({ bottomSheetModalRef, setIsOpen, zIndex }) => {
  const snapPoints = ["35%", "70%", "100%"];
  const [name, setName] = useState("");
  const [device, setDevice] = useState("");
  const { width } = useWindowDimensions();
  const [year, setYear] = useState("1");

  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
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
        <StyledText style={[{ marginBottom: 20 }]} className="">
          Cancel this Ticket
        </StyledText>
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
              <StyledText
                style={{
                  color: activeColors.gray,
                }}
                className=""
              >
                I manage to figure it out
              </StyledText>
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
              <StyledText
                style={{
                  color: activeColors.gray,
                }}
                className=""
              >
                My issues was resolved by an administrator
              </StyledText>
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
              <StyledText
                style={{
                  color: activeColors.gray,
                }}
                className=""
              >
                I gave up, no one responded
              </StyledText>
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
              <StyledText
                style={{
                  color: activeColors.gray,
                }}
                className=""
              >
                A friend assisted me
              </StyledText>
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
              <StyledText
                style={{
                  color: activeColors.gray,
                }}
                className=""
              >
                I just don{"'"}t want to handle it now
              </StyledText>
            </Pressable>
          </View>
          <View className=" items-start flex w-full justify-start">
            <StyledText
              style={{
                color: activeColors.gray,
              }}
              className=""
            >
              Reason for withdrawing (Optional)
            </StyledText>
          </View>
          <StyledTextInput
            value=""
            defaultValue="Kuyeso Rogers"
            onChangeText={(text) => setName(text)}
            multiline
            numberOfLines={5}
            className=" w-full"
            style={{
              borderRadius: 5,
              borderColor: activeColors.grayAccent,
              borderWidth: 1,
            }}
          />

          <View className="flex pt-4 w-full pr-1">
            <StyledTouchableOpacity
              // onPress={handleNext}
              className="   w-full "
              style={{
                borderColor: activeColors.grayAccent,
                borderWith: 1,
                borderRadius: 5,
              }}
            >
              <StyledText bold className=" up ">
                Cancel Ticket
              </StyledText>
            </StyledTouchableOpacity>
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
          <Text style={styles.subtitle}>Allow all Incoming Notifications</Text>
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
