// @ts-nocheck
import {
  Pressable,
  View,
  Text,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "@/styles/global.css";
import { colors } from "@/constants/Colors";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Stack, router, withLayoutContext } from "expo-router";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from "@react-navigation/drawer";
import Animated, { interpolate } from "react-native-reanimated";
import StyledText from "@/components/Text/StyledText";
import SettingsButton from "@/components/reuseable/Settings/SettingsButton";
import SettingItem from "@/components/reuseable/Settings/SettingItem";
import { getAllUsers, loadUser, logoutUser } from "@/redux/actions/userAction";
import {
  UserAccountStatus,
  AccountSettings,
} from "@/components/profile/bottomShets";
import { useDispatch, useSelector } from "react-redux";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notification

const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator);

function CustomDrawerContent(props: any) {
  const progress = useDrawerProgress();
  const bottomSheetModalRefUserAccountStatus = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  function handlePresentModalUserAccountStatus() {
    bottomSheetModalRefUserAccountStatus.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }

  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const [isActive, setIsActivate] = useState(theme.mode === "dark");
  const handleSwitch = () => {
    updateTheme();
    setIsActivate((previousState) => !previousState);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsers()(dispatch);
  }, [dispatch]);

  const { user, isAuthenticated, loading } = useSelector(
    (state: any) => state.user
  );

  const logoutHandler = async () => {
    logoutUser()(dispatch);
  };

  if (!isAuthenticated) router.push("/");
  return (
    <DrawerContentScrollView
      {...props}
      style={{ flex: 1, height: "100%", paddingHorizontal: 10 }}
    >
      {/* <Animated.View style={{ transform: [{ translateX }] }}> */}
      <Animated.View>
        <View
          style={{
            height: 220,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",

            paddingHorizontal: 20,

            gap: 15,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
            className="flex w-full flex-row item-center justify-between pt-5"
          >
            <Image
              source={{
                uri: user?.avatar?.url,
              }}
              style={[
                {
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  // marginRight: 10,
                },
              ]}
            />
            <TouchableOpacity onPress={logoutHandler}>
              <MaterialCommunityIcons
                name="power"
                // name="view-dashboard-outline"
                size={25}
                color={activeColors?.tint}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              gap: 2,
            }}
          >
            <StyledText
              style={[{ color: activeColors.tint, fontSize: 18 }]}
              bold
            >
              {user?.name}
            </StyledText>
            <StyledText
              style={[{ color: activeColors.gray, fontSize: 14 }]}
              bold
            >
              {user?.email}
            </StyledText>
          </View>
          <View
            style={{
              width: "100%",

              gap: 2,
            }}
          >
            <StyledText
              style={[{ color: activeColors.tertiary, fontSize: 14 }]}
              bold
            >
              {user?.course?.name}
            </StyledText>
          </View>
          <View
            style={{
              width: "100%",
              borderTopColor: "transparent",
              borderRightColor: "transparent",
              borderLeftColor: "transparent",
              borderBottomColor: activeColors.primary,
              borderWidth: 1,
              paddingTop: 10,
            }}
          />
        </View>
        <DrawerItemList {...props} />
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              borderTopColor: "transparent",
              borderRightColor: "transparent",
              borderLeftColor: "transparent",
              borderBottomColor: activeColors.primary,
              borderWidth: 1,
              paddingTop: 10,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",

            // paddingHorizontal: 20,

            // gap: 20,
          }}
        >
          <View
            style={[
              // { backgroundColor: activeColors.secondary },
              styles.bottomSection,
            ]}
            className=" w-full"
          >
            <SettingItem label="Dark Mode">
              <Switch
                value={isActive}
                onChange={handleSwitch}
                thumbColor={
                  isActive ? activeColors.accent : activeColors.tertiary
                }
                ios_backgroundColor={activeColors.primary}
                trackColor={{
                  false: activeColors.primary,
                  true: activeColors.tertiary,
                }}
              />
            </SettingItem>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",

            paddingHorizontal: 20,

            gap: 20,
          }}
        >
          <View
            style={{
              width: "100%",
            }}
          >
            <StyledText
              style={[{ color: activeColors.tint, fontSize: 18 }, styles.title]}
              bold
            >
              Support & Privacy Policy
            </StyledText>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
              height: 200,
            }}
          >
            <View
              style={{
                width: "100%",
                gap: 20,
              }}
              className="flex-row items-center"
            >
              <MaterialCommunityIcons
                name="lock-question"
                // name="view-dashboard-outline"
                size={20}
                color={activeColors.tint}
              />
              <StyledText style={[{ color: activeColors.tint }, styles.title]}>
                Privacy Policy
              </StyledText>
            </View>
            <View
              style={{
                width: "100%",
                gap: 20,
              }}
              className="flex-row items-center"
            >
              <MaterialCommunityIcons
                name="progress-question"
                // name="view-dashboard-outline"
                size={20}
                color={activeColors.tint}
              />
              <StyledText style={[{ color: activeColors.tint }, styles.title]}>
                Support
              </StyledText>
            </View>
          </View>
        </View>
      </Animated.View>
      <UserAccountStatus
        bottomSheetModalRef={bottomSheetModalRefUserAccountStatus}
        setIsOpen={setIsOpen}
      />
    </DrawerContentScrollView>
  );
}

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

export default function DrawerLayout() {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  // const { user } = useSelector((state: any) => state.user);

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      backBehavior="history"
      screenOptions={({ route }) => ({
        headerShown: false,
        swipeEdgeWidth: 100,
        drawerStyle: {
          backgroundColor: activeColors.secondary,
          width: "95%",
        },
        drawerItemStyle: {
          gap: 0,
          marginVertical: 0,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        drawerType: "front",
        drawerActiveBackgroundColor: activeColors.secondary,
        drawerActiveTintColor: activeColors.accent,
        drawerInactiveTintColor: activeColors.tertiary,
        drawerIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "(dashboard)") {
            iconName = "view-dashboard-outline";
          } else if (route.name === "(profile)/profile") {
            iconName = "account-outline";
          } else if (route.name === "(settings)/settings") {
            iconName = "cogs";
          }

          return (
            <View className="pb-0">
              <MaterialCommunityIcons
                // @ts-ignore
                name={iconName}
                // name="view-dashboard-outline"
                size={20}
                color={color}
              />
            </View>
          );
        },
      })}
    >
      <Drawer.Screen
        name="(dashboard)"
        options={{
          headerShown: false,
          title: "My Home",
        }}
      />
      <Drawer.Screen
        name="(profile)/profile"
        options={{
          headerShown: true,
          title: "Profile",
          tabBarActiveTintColor: activeColors.accent,
          tabBarInactiveTintColor: activeColors.tertiary,
          // tabBarBackground: activeColors.secondary,
          backBehavior: "history",
          tabBarStyle: {
            backgroundColor: activeColors.secondary,
          },
          tabBarShowLabel: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            paddingHorizontal: 10,
          },
          headerStyle: {
            backgroundColor: activeColors.secondary,
          },
          headerTintColor: activeColors.tint,
        }}
      />
      <Drawer.Screen
        name="(settings)/settings"
        options={{
          headerShown: true,
          title: "Settings",

          tabBarActiveTintColor: activeColors.accent,
          tabBarInactiveTintColor: activeColors.tertiary,
          // tabBarBackground: activeColors.secondary,
          backBehavior: "history",
          tabBarStyle: {
            backgroundColor: activeColors.secondary,
          },
          tabBarShowLabel: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            paddingHorizontal: 10,
          },
          headerStyle: {
            backgroundColor: activeColors.secondary,
          },
          headerTintColor: activeColors.tint,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  setting: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
    marginBottom: 25,
  },
  title: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
