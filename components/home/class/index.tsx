import React, { useState } from "react";
import MapView, { Marker, Heatmap } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";

export default function ClassLocation() {
  const [mapLat, setMapLat] = useState(-0.6166200000000062);
  const [mapLong, setMapLong] = useState(30.65669399999998);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: mapLat,
          longitude: mapLong,
          latitudeDelta: 0.000156349,
          longitudeDelta: 0.000283975,
        }}
        minZoomLevel={15}
      >
        <Marker
          coordinate={{
            latitude: mapLat,
            longitude: mapLong,
          }}
                  title={`Ics Lab 3`}
                  
          // description={`Weight: ${data.weight}`}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
