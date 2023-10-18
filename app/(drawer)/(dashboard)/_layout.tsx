import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Link,
  Tabs,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useContext } from "react";
import { BlurView } from "expo-blur";

import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "@/components/Text/StyledText";
import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "@/components/SplashScreen";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "home/index",
};

export default function TabLayout() {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user, isAuthenticated, loading } = useSelector(
    (state: any) => state.user
  );
  const router = useRouter();
  const navigation: any = useNavigation();

  if (loading) return <SplashScreen />;
  if (!isAuthenticated) router.replace("/");
  return (
    <Tabs
      initialRouteName="home/index"
      screenOptions={({ route }) => ({
        headerLeft: () => (
          <View style={styles.header}>
            <Pressable onPress={() => navigation.openDrawer()}>
              {({ pressed }) => (
                <Image
                  source={{
                    uri: user?.avatar?.url || "https://picsum.photos/200/300",
                  }}
                  style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                />
              )}
            </Pressable>
          </View>
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <View
                  className={`items-center  justify-center flex-row `}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                >
                  <MaterialCommunityIcons
                    size={35}
                    name="notification-clear-all"
                    color={activeColors.tint}
                    fill="#86e63b"
                    stroke="#041633"
                    strokeWidth={2}
                  />
                  <View
                    style={{
                      position: "absolute",
                      right: -2,
                      top: 4,
                    }}
                  >
                    <View
                      style={{
                        borderColor: activeColors.primary,
                        backgroundColor: activeColors.accent,
                        borderWidth: 2,
                        borderRadius: 50,
                        padding: 2,
                        display: "flex",
                        height: 18,
                        width: 18,
                        alignItems: "center",
                        // justifyContent: "center",
                      }}
                    >
                      <StyledText style={{ fontSize: 8, color: "black" }} bold>
                        3
                      </StyledText>
                    </View>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
        ),
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerLeftContainerStyle: {
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          borderBottomColor: activeColors.gray,
        },
        headerShadowVisible: false,
        // headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "home/index") {
            iconName = "view-dashboard-outline";
          } else if (route.name === "messages/userchats") {
            iconName = "account-multiple-outline";
          } else if (route.name === "inquiries/index") {
            iconName = "align-horizontal-distribute";
          } else if (route.name === "assistant/index") {
            iconName = "robot-happy-outline";
          }

          // You can return any component that you like here!
          return (
            <View className="pb-0 ">
              <MaterialCommunityIcons
                name={iconName}
                // name="view-dashboard-outline"
                size={30}
                color={color}
              />
            </View>
          );
        },

        tabBarActiveTintColor: activeColors.accent,
        tabBarInactiveTintColor: activeColors.tertiary,
        // tabBarBackground: activeColors.secondary,
        backBehavior: "history",
        tabBarStyle: {
          backgroundColor: activeColors.primary,
          borderTopColor: activeColors.gray,
          paddingBottom: Platform.OS === "ios" ? 20 : 0,
          height: 80,
        },
        headerTitleAlign: "left",
        headerTitleStyle: {
          paddingHorizontal: 10,
        },
        headerStyle: {
          backgroundColor: activeColors.primary,
          borderBottomColor: activeColors.gray,
          borderBottomWidth: 1,
        },
        header: () => (
          <View
            style={{
              backgroundColor: activeColors.primary,
              // borderBottomColor: activeColors.grayAccent,
              // borderBottomWidth: 1,
              marginTop: Platform.OS === "ios" ? 20 : 0,
              paddingVertical: 10,
              paddingTop: Platform.OS === "ios" ? 0 : 45,
              paddingHorizontal: 5,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              shadowColor: activeColors.gray,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.6,
              shadowRadius: 2,

              elevation: 2,
            }}
          >
            <View style={styles.header}>
              <Pressable onPress={() => navigation.openDrawer()}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: user?.avatar?.url || "https://picsum.photos/200/300",
                    }}
                    height={40}
                    width={40}
                    style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </View>
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <View
                    className={`items-center  justify-center flex-row `}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  >
                    <MaterialCommunityIcons
                      size={35}
                      name="notification-clear-all"
                      color={activeColors.tint}
                      fill="#86e63b"
                      stroke="#041633"
                      strokeWidth={2}
                    />
                    <View
                      style={{
                        position: "absolute",
                        right: -2,
                        top: 4,
                      }}
                    >
                      <View
                        style={{
                          borderColor: activeColors.primary,
                          backgroundColor: activeColors.accent,
                          borderWidth: 2,
                          borderRadius: 50,
                          padding: 2,
                          display: "flex",
                          height: 18,
                          width: 18,
                          alignItems: "center",
                          // justifyContent: "center",
                        }}
                      >
                        <StyledText
                          style={{ fontSize: 8, color: "black" }}
                          bold
                        >
                          3
                        </StyledText>
                      </View>
                    </View>
                  </View>
                )}
              </Pressable>
            </Link>
          </View>
        ),
        headerTintColor: activeColors.tint,
      })}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          // headerShown: false,
          title: "",
          // href: null,
        }}
      />
      <Tabs.Screen
        name="inquiries/index"
        options={{
          tabBarLabel: "Ask",
          // title: "Submissions and Inquiries",
          title: "",
          // headerShown: false,

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "700",
          },
        }}
      />
      <Tabs.Screen
        name="map/index"
        options={{
          title: "",
          href: null,
          // headerShown: false,
        }}
      />
      <Tabs.Screen
        name="feed/index"
        options={{
          tabBarLabel: "",

          // title: "Maps and Locations",
          title: "",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "700",
          },
          // headerShown: false,
          // headerTitle: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <View className={`items-center  justify-center  `}>
              <View
                style={{
                  // borderRadius: 50,
                  backgroundColor: activeColors.grayAccent,
                }}
                className={`items-center rounded-md -z-50 top-[1px] left-1 absolute   p-2 font-bold  `}
              >
                <MaterialCommunityIcons
                  size={30}
                  name="credit-card-edit-outline"
                  color={activeColors.secondary}
                  stroke={activeColors.secondary}
                  strokeWidth={0.5}
                />
              </View>
              <View
                className="flex  p-2  rounded-md"
                style={{
                  backgroundColor: activeColors.accent,
                  // borderRadius: 50,
                }}
              >
                {focused ? (
                  <MaterialCommunityIcons
                    size={30}
                    name="credit-card-edit-outline"
                    color={activeColors.secondary}
                    stroke={activeColors.secondary}
                    strokeWidth={0.5}
                  />
                ) : (
                  <MaterialCommunityIcons
                    size={30}
                    name="credit-card-edit-outline"
                    color={activeColors.secondary}
                    stroke={activeColors.secondary}
                    strokeWidth={0.5}
                  />
                )}
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="messages/userchats"
        options={{
          title: "",
          tabBarLabel: "Chats",
          // headerShown: false,

          // tabBarActiveTintColor: "#041633",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "700",
          },
        }}
      />
      <Tabs.Screen
        name="assistant/index"
        options={{
          tabBarLabel: "Mi bot",
          // title: "Ask Mi Assistant",
          title: "",
        }}
      />
      <Tabs.Screen
        name="notifications/index"
        options={{
          href: null,
          title: "Notifications",
          // tabBarActiveTintColor: "#041633",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "700",
          },
          tabBarIcon: ({ focused, color, size }) => (
            <View className={`items-center  justify-center flex-row `}>
              <MaterialCommunityIcons
                size={35}
                name="bell-outline"
                color={color}
                fill="#86e63b"
                stroke="#041633"
                strokeWidth={2}
              />
              <View
                style={{
                  position: "absolute",
                  right: -4,
                  top: 4,
                }}
              >
                <View
                  style={{
                    borderColor: activeColors.secondary,
                    backgroundColor: activeColors.accent,
                    borderWidth: 2,
                    borderRadius: 50,
                    padding: 2,
                    display: "flex",
                    height: 18,
                    width: 18,
                    alignItems: "center",
                    // justifyContent: "center",
                  }}
                >
                  <StyledText style={{ fontSize: 8, color: "red" }} bold>
                    3
                  </StyledText>
                </View>
              </View>
            </View>
          ),
        }}
      />
      {/*
      **disabled tabs**
      - messages/[id]
      - inquiries/[id]
      - settings/two
       */}

      <Tabs.Screen
        name="messages/[id]"
        options={{
          href: null,

          title: "Messages",
          headerLeft: () => (
            <Pressable
              style={{
                paddingLeft: 10,
              }}
              onPress={() => router.push("/messages/userchats")}
            >
              <MaterialCommunityIcons
                color={theme.mode === "dark" ? "#f9fafb" : "#111827"}
                name="arrow-left"
                size={25}
              />
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="inquiries/[id]"
        options={{
          href: null,
          // goback arrow

          title: "Submission Details",
          headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
          // presentation: "fullScreenModal",
          headerBackground: () => (
            <View
              style={{
                backgroundColor: theme.mode === "dark" ? "#111827" : "#ffffff",
                flex: 1,
              }}
            />
          ),
          headerLeft: () => (
            <Pressable
              style={{
                paddingLeft: 15,
              }}
              onPress={() => router.push("/inquiries")}
            >
              <MaterialCommunityIcons
                color={theme.mode === "dark" ? "#f9fafb" : "#111827"}
                name="arrow-left"
                size={25}
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="inquiries/reply"
        options={{
          href: null,
          // headerShown: false,
          title: "Reply",
          headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",

          headerBackground: () => (
            <View
              style={{
                backgroundColor: theme.mode === "dark" ? "#111827" : "#ffffff",
                flex: 1,
              }}
            />
          ),
          headerLeft: () => (
            <Pressable
              style={{
                paddingLeft: 15,
              }}
              onPress={() =>
                router.push({
                  pathname: `/inquiries`,
                })
              }
            >
              <MaterialCommunityIcons
                color={theme.mode === "dark" ? "#f9fafb" : "#111827"}
                name="arrow-left"
                size={25}
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="settings/two"
        options={{
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="user/[id]"
        options={{
          title: "User Profile",
          headerTintColor: theme.mode === "dark" ? "#f9fafb" : "#111827",
          href: null,
          headerBackground: () => (
            <View
              style={{
                backgroundColor: theme.mode === "dark" ? "#111827" : "#ffffff",
                flex: 1,
              }}
            />
          ),
          headerLeft: () => (
            <Pressable
              style={{
                paddingLeft: 15,
              }}
              onPress={() => router.push("/feed")}
            >
              <MaterialCommunityIcons
                color={theme.mode === "dark" ? "#f9fafb" : "#111827"}
                name="arrow-left"
                size={25}
              />
            </Pressable>
          ),
          headerRight: () => <></>,
        }}
      />
      <Tabs.Screen
        name="inquiries/ticket/index"
        options={{
          headerShown: false,
          href: null,
          headerLeft: () => (
            <Pressable
              style={{
                paddingLeft: 15,
              }}
              onPress={() => router.push("/inquiries")}
            >
              <MaterialCommunityIcons
                color={theme.mode === "dark" ? "#f9fafb" : "#111827"}
                name="arrow-left"
                size={25}
              />
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="jobs/index"
        options={{
          // headerShown: false,
          href: null,
          title: "Jobs",
        }}
      />
      <Tabs.Screen
        name="hostels/index"
        options={{
          // headerShown: false,
          href: null,
          title: "Hostels",
        }}
      />
      <Tabs.Screen
        name="hostels/details/map"
        options={{
          // headerShown: false,
          href: null,
          title: "Direction",
          headerLeft: () => (
            <Pressable
              style={{
                paddingLeft: 15,
              }}
              onPress={() => router.push("/hostels")}
            >
              <MaterialCommunityIcons
                color={theme.mode === "dark" ? "#f9fafb" : "#111827"}
                name="arrow-left"
                size={25}
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="hostels/details/[id]"
        options={{
          // headerShown: false,
          href: null,
          title: "Hostel Details",
          headerBackground: () => (
            <View
              style={{
                backgroundColor: theme.mode === "dark" ? "#111827" : "#ffffff",
                flex: 1,
              }}
            />
          ),
          headerLeft: () => (
            <Pressable
              style={{
                paddingLeft: 15,
              }}
              onPress={() => router.push("/hostels")}
            >
              <MaterialCommunityIcons
                color={theme.mode === "dark" ? "#f9fafb" : "#111827"}
                name="arrow-left"
                size={25}
              />
            </Pressable>
          ),
          headerRight: () => (
            <View
              style={[
                styles.header,
                {
                  display: "flex",
                  flex: 1,
                  // gap: 20,
                  alignItems: "center",
                  justifyContent: "space-between",
                  // marginRight: 5,
                },
              ]}
            >
              <View style={[{ marginRight: 20 }]}>
                <Pressable
                  onPress={() => navigation.openDrawer()}
                  style={{
                    transform: [{ rotateY: "180deg" }],
                  }}
                >
                  {({ pressed }) => (
                    <MaterialCommunityIcons
                      name="bell-ring-outline"
                      // name="view-dashboard-outline"
                      size={25}
                      color={activeColors.tint}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          ),
        }}
      />
      {/* disabled tabs ends here */}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  image: {
    width: 33,
    height: 33,
    borderRadius: 25,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
