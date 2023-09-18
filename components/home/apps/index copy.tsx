import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StyledMenuItem from '@/components/Menu/StyledMenuItem';
import StyledText from '@/components/Text/StyledText';
import { router } from 'expo-router';

const index = () => {
  return (
    <Modal
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)",
        height: Dimensions.get("window").height,
      }}
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View
        style={[
          styles.centeredView,
          {
            height: Dimensions.get("window").height,
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.9)",
          },
        ]}
      >
        <View
          style={[
            styles.modalView,
            {
              backgroundColor: activeColors.secondary,
            },
          ]}
        >
          <Pressable
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: 10,
            }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <MaterialCommunityIcons
              name={"close"}
              // name="view-dashboard-outline"
              size={25}
              color={activeColors.tint}
            />
          </Pressable>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 20,
                width: "100%",
              }}
            >
              <StyledMenuItem
                style={{ width: "20%" }}
                name="Lineup"
                icon="timetable"
              />
              <TouchableOpacity
                style={[
                  {
                    alignItems: "center",
                    width: "15%",
                    gap: 10,
                  },
                ]}
                onPress={() => {

                  router.push("/hostels");
                }}
              >
                <MaterialCommunityIcons
                  name={"home-outline"}
                  // name="view-dashboard-outline"
                  size={30}
                  color={activeColors.accent}
                />
                <StyledText style={{ fontSize: 12 }}>Hostel</StyledText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  {
                    alignItems: "center",
                    width: "15%",
                    gap: 10,
                  },
                ]}
                onPress={() => {

                  router.push("/jobs");
                }}
              >
                <MaterialCommunityIcons
                  name={"briefcase-outline"}
                  // name="view-dashboard-outline"
                  size={30}
                  color={activeColors.accent}
                />
                <StyledText style={{ fontSize: 12 }}>Jobs</StyledText>
              </TouchableOpacity>
              <StyledMenuItem
                style={{ width: "20%" }}
                name="Update"
                icon="alarm-multiple"
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 20,
                width: "100%",
              }}
            >
              <StyledMenuItem
                style={{ width: "20%" }}
                name="Health"
                icon="medical-bag"
              />
              <StyledMenuItem
                style={{ width: "20%" }}
                name="VR"
                icon="line-scan"
              />
              <StyledMenuItem
                style={{ width: "20%" }}
                name="Eco"
                icon="recycle-variant"
              />
              <TouchableOpacity
                style={[
                  {
                    alignItems: "center",
                    width: "15%",
                    gap: 10,
                  },
                ]}
                onPress={() => {

                  router.push("/feed");
                }}
              >
                <MaterialCommunityIcons
                  name={"alarm-bell"}
                  // name="view-dashboard-outline"
                  size={30}
                  color={activeColors.accent}
                />
                <StyledText style={{ fontSize: 12 }}>Tweets</StyledText>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 20,
                width: "100%",
              }}
            >
              <StyledMenuItem
                style={{ width: "20%" }}
                name="Lineup"
                icon="timetable"
              />
              <StyledMenuItem
                style={{ width: "20%" }}
                name="Hostel"
                icon="home-outline"
              />
              <TouchableOpacity
                style={[
                  {
                    alignItems: "center",
                    width: "15%",
                    gap: 10,
                  },
                ]}
                onPress={() => {
                  
                  router.push("/jobs");
                }}
              >
                <MaterialCommunityIcons
                  name={"briefcase-outline"}
                  // name="view-dashboard-outline"
                  size={30}
                  color={activeColors.accent}
                />
                <StyledText style={{ fontSize: 12 }}>Jobs</StyledText>
              </TouchableOpacity>
              <StyledMenuItem
                style={{ width: "20%" }}
                name="Update"
                icon="alarm-multiple"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default index

const styles = StyleSheet.create({})