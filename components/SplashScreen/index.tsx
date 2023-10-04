import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

type Props = {};

const SplashScreen = (props: Props) => {
  const [name, setName] = useState("");
  useEffect(() => {
    retrieveData();
    setTimeout(() => {
      if (name === "") {
        //   navigation.navigate("LoginPage");
      } else {
        //   navigation.navigate("MainScreen");
      }
    }, 3000);
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("name");
      if (value !== null) {
        console.log(value);
        setName(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        /> */}
      </View>
      <View style={styles.intro}>
        <Text style={styles.subtitleFrom}>from</Text>
        {/* <Image style={styles.subtitleFb} source={require('../../images/facebookText.png')}></Image> */}
        <Text style={styles.subtitleFb}>FACEBOOK</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    flex: 0.9,
    justifyContent: "center",
  },
  logo: {
    height: 70,
    width: 70,
  },
  subtitleFrom: {
    color: "#8E8E8E",
    textAlign: "center",
  },
  subtitleFb: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 2,
  },
  intro: {
    flex: 0.1,
    paddingBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
