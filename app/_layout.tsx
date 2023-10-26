import "@/styles/global.css";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Appearance, Pressable, View } from "react-native";
import { getData, storeData } from "@/store/asyncStorage";
import { Provider, useSelector } from "react-redux";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeContext } from "@/context/themeContext";
import Store from "@/redux/Store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "(drawer)",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    B: require("@/assets/fonts/bold.ttf"),
    E: require("@/assets/fonts/exbold.ttf"),
    H: require("@/assets/fonts/heavy.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={Store}>
      <RootLayoutNav />
    </Provider>
  );
}

const RootLayoutNav = () => {
  const [theme, setTheme] = useState({ mode: "dark" });

  const updateTheme = (newTheme: any) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode, system: false };
    } else {
      if (newTheme.system) {
        const systemColorScheme = Appearance.getColorScheme();
        mode = systemColorScheme === "dark" ? "dark" : "light";
        newTheme = { ...newTheme, mode };
      } else {
        newTheme = { ...newTheme, system: false };
      }
    }
    setTheme(newTheme);
    storeData("redisageTheme", newTheme);
  };
  // monitor for color changes
  // @ts-ignore
  if (theme.system) {
    Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme({ system: true, mode: colorScheme });
    });
  }

  // fetch stored theme
  const fetchStoredTheme = async () => {
    try {
      const themeData = await getData("redisageTheme");
      if (themeData) {
        updateTheme(themeData);
      }
    } catch ({ message }: any) {
      alert(message);
    } finally {
      await setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  };

  useEffect(() => {
    fetchStoredTheme();
  }, []);

  // const { isAuthenticated, loading } = useSelector((state: any) => state.user);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{
            navigationBarHidden: true,
          }}
        >
          <Stack.Screen
            name="index"
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="auth/index"
            options={{
              headerShown: false,
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
          <Stack.Screen
            name="auth/phone"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth/email"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="auth/verify-email"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth/profile"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth/finish"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth/verify-phone"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth/registration-number"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="job-details/[id]"
            options={{
              // headerShown: false,
              title: "Job Details",
              headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
              headerBackground: () => (
                <View
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#111827" : "#ffffff",
                    flex: 1,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="auth/set-password"
            options={{
              title: "Set Password",
              headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
              presentation: "fullScreenModal",
              gestureEnabled: true,
              headerBackground: () => (
                <View
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#111827" : "#ffffff",
                    flex: 1,
                  }}
                />
              ),
            }}
          />

          <Stack.Screen
            name="auth/avatar"
            options={{
              title: "Set Your Avatar",
              headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
              presentation: "fullScreenModal",
              gestureEnabled: true,
              headerBackground: () => (
                <View
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#111827" : "#ffffff",
                    flex: 1,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="post/create-post"
            options={{
              title: "Create New Post",
              headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
              presentation: "fullScreenModal",
              gestureEnabled: true,
              headerBackground: () => (
                <View
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#111827" : "#ffffff",
                    flex: 1,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="post/create-poll"
            options={{
              title: "Create New Poll",
              headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
              presentation: "fullScreenModal",
              gestureEnabled: true,
              headerBackground: () => (
                <View
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#111827" : "#ffffff",
                    flex: 1,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="post/important-update"
            options={{
              title: "More Details",
              headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
              presentation: "fullScreenModal",
              gestureEnabled: true,
              headerBackground: () => (
                <View
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#111827" : "#ffffff",
                    flex: 1,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="post/[id]"
            options={{
              title: "Post Details",
              headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
              presentation: "fullScreenModal",
              gestureEnabled: true,
              headerBackground: () => (
                <View
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#111827" : "#ffffff",
                    flex: 1,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="[...missing]"
            options={{
              title: "Oops!",
              headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
              presentation: "fullScreenModal",
              gestureEnabled: false,
              headerBackground: () => (
                <View
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#111827" : "#ffffff",
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="post/create-replies"
            options={{
              title: "Create New Reply",
              headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
              presentation: "fullScreenModal",
              gestureEnabled: true,
              headerBackground: () => (
                <View
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#111827" : "#ffffff",
                    flex: 1,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="(drawer)"
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="post/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            options={{
              title: "Edit Profile",
              gestureEnabled: true,

              headerBackground: () => (
                <View
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#111827" : "#ffffff",
                    flex: 1,
                  }}
                />
              ),
              headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
              presentation: "fullScreenModal",
            }}
          />
          <Stack.Screen
            name="modal"
            options={{
              title: "Notifications",
              headerBackground: () => (
                <View
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#111827" : "#ffffff",
                    flex: 1,
                  }}
                />
              ),
              headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
              presentation: "fullScreenModal",
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </ThemeContext.Provider>
  );
};
