import { ThemeContext } from "@/context/themeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Appearance } from "react-native";
import { getData, storeData } from "@/store/asyncStorage";
import "@/styles/global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "auth/index",
};

export default function AuthLayoutNav() {
  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

    <Stack screenOptions={{}}>
      <Stack.Screen
        name="auth/index"
        options={{
          headerShown: false,
          // headerShadowVisible: false,
          // headerStyle: {
          //   backgroundColor: "#F04D4E",
          // },
          headerTintColor: "#F04D4E",
        }}
      />
      <Stack.Screen
        name="auth/login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth/register"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
