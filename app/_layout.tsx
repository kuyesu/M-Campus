import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeContext } from "@/context/themeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Appearance, View } from "react-native";
import { getData, storeData } from "@/store/asyncStorage";
import Store from "@/redux/Store";
import { Provider, useDispatch, useSelector } from "react-redux";
import "@/styles/global.css";
import { loadUser } from "@/redux/actions/userAction";
import MainContainer from "@/components/container/MainContainer";
import { colors } from "@/constants/Colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "index",
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

  if (!loaded) {
    return null;
  }
  // const { isAuthenticated, loading } = useSelector((state: any) => state.user);
  // useEffect(() => {
  //   Store.dispatch(loadUser());
  // }, []);

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

  const { isAuthenticated, loading } = useSelector((state: any) => state.user);
  // const dispatch = useDispatch();

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <BottomSheetModalProvider>
        <Stack screenOptions={{}}>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, gestureEnabled: false }}
          />
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
            name="(drawer)"
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="post/index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </ThemeContext.Provider>
  );
};
