import React, { useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet, View, Dimensions } from "react-native";

import MapView, { Marker } from "react-native-maps";
import MainContainer from "@/components/container/MainContainer";

export default function map() {
  const origin = {
    latitude: 48.8588377,
    longitude: 2.2770205,
  };
  const destination = {
    latitude: 48.8580377,
    longitude: 2.2770005,
  };
  const GOOGLE_API_KEY = "AIzaSyD49SW35u3UeZ2Y8GZes18UyAw4Kz4ubTg";
  const [coordinates] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ]);
  return (
    // <View style={{ flex: 1 }}>
    //   <MapView
    //     initialRegion={{
    //       //   latitude: 37.78825,
    //       //   longitude: -122.4324,
    //       //   latitudeDelta: 0.0922,
    //       //   longitudeDelta: 0.0421,
    //       latitude: 37.78825,
    //       longitude: -122.4324,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421,
    //     }}
    //   >
    //     <MapViewDirections
    //       origin={origin}
    //       destination={destination}
    //       apikey={GOOGLE_MAPS_APIKEY}
    //       strokeWidth={3}
    //       strokeColor="hotpink"
    //     />
    //   </MapView>
    // </View>
    <MainContainer>
      <MapView
        style={styles.maps}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}
      >
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={GOOGLE_API_KEY} // insert your API Key here
          strokeWidth={4}
          strokeColor="#111111"
        />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
      </MapView>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});
