import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useNavigation } from "expo-router";
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
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { MapPinIcon } from "react-native-heroicons/outline";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import StyledText from "@/components/Text/StyledText";

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

  const navigation = useNavigation();
  return (
    <Tabs
      initialRouteName="home/index"
      screenOptions={({ route }) => ({
        headerLeftContainerStyle: {
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
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
            <View className="pb-0">
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
      })}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          // headerShown: false,
          title: "",
          // href: null,
          headerLeft: () => (
            <View style={styles.header}>
              <Pressable onPress={() => navigation.openDrawer()}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
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
          ),
        }}
      />
      <Tabs.Screen
        name="inquiries/index"
        options={{
          tabBarLabel: "Ask",
          title: "Interactions",
          // headerShown: false,

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "700",
          },
          headerLeft: () => (
            <View style={styles.header}>
              <Pressable onPress={() => navigation.openDrawer()}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
                    }}
                    style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="map/index"
        options={{
          tabBarLabel: "",
          title: "Maps and Locations",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "700",
          },
          // headerShown: false,
          // headerTitle: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <View className={`items-center  justify-center  `}>
              <View
                className={`items-center -z-50 top-[1px] left-1 absolute  bg-[#041633] p-2 font-bold  `}
              >
                <MaterialCommunityIcons
                  size={35}
                  name="map-marker"
                  color={
                    theme.mode === "dark" ? "#041633" : activeColors.primary
                  }
                  fill="#86e63b"
                  stroke="#041633"
                  strokeWidth={2}
                />
              </View>
              <View
                className="flex  p-2 "
                style={{
                  backgroundColor: activeColors.accent,
                }}
              >
                {focused ? (
                  <MaterialCommunityIcons
                    size={35}
                    name="map-marker"
                    color={
                      theme.mode === "dark" ? "#041633" : activeColors.primary
                    }
                    fill="#86e63b"
                    stroke="#041633"
                    strokeWidth={2}
                  />
                ) : (
                  <MaterialCommunityIcons
                    size={35}
                    name="map-marker"
                    color={
                      theme.mode === "dark" ? "#041633" : activeColors.primary
                    }
                    fill="#86e63b"
                    stroke="#041633"
                    strokeWidth={2}
                  />
                )}
              </View>
            </View>
          ),
          headerLeft: () => (
            <View style={styles.header}>
              <Pressable onPress={() => navigation.openDrawer()}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
                    }}
                    style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
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
          headerLeft: () => (
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
              <Pressable onPress={() => navigation.openDrawer()} style={{}}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
                    }}
                    style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </View>
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
                      name="sort-variant"
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
      <Tabs.Screen
        name="assistant/index"
        options={{
          tabBarLabel: "Notification",
          title: "Ask Assistant",
          headerLeft: () => (
            <View style={styles.header}>
              <Pressable onPress={() => navigation.openDrawer()}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
                    }}
                    style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </View>
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
                      name="sort-variant"
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
          headerLeft: () => (
            <View style={styles.header}>
              <Pressable onPress={() => navigation.openDrawer()}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
                    }}
                    style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </View>
          ),
          headerRight: () => (
            <View style={[styles.header, { marginRight: 15 }]}>
              <Pressable onPress={() => navigation.openDrawer()}>
                {({ pressed }) => (
                  <MaterialCommunityIcons
                    name="cog-outline"
                    // name="view-dashboard-outline"
                    size={25}
                    color={activeColors.tint}
                  />
                )}
              </Pressable>
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
                      name="sort-variant"
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

      <Tabs.Screen
        name="inquiries/[id]"
        options={{
          href: null,
          title: "Status",
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
                      name="sort-variant"
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

      <Tabs.Screen
        name="feed/index"
        options={{
          title: "Feed",
          // headerShown: false,
          href: null,
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
                      name="sort-variant"
                      // name="view-dashboard-outline"
                      size={25}
                      color={activeColors.tint}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          ),
          headerLeft: () => (
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
              <Pressable onPress={() => navigation.openDrawer()} style={{}}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
                    }}
                    style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </View>
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
        name="inquiries/ticket/index"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      <Tabs.Screen
        name="feed/[id]"
        options={{
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="hostels/[id]"
        options={{
          // headerShown: false,
          href: null,
          title: "Hostel",
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
                      name="sort-variant"
                      // name="view-dashboard-outline"
                      size={25}
                      color={activeColors.tint}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          ),
          headerLeft: () => (
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
              <Pressable onPress={() => navigation.openDrawer()} style={{}}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
                    }}
                    style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="jobs/index"
        options={{
          // headerShown: false,
          href: null,
          title: "Jobs",
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
                      name="sort-variant"
                      // name="view-dashboard-outline"
                      size={25}
                      color={activeColors.tint}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          ),
          headerLeft: () => (
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
              <Pressable onPress={() => navigation.openDrawer()} style={{}}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
                    }}
                    style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="hostels/index"
        options={{
          // headerShown: false,
          href: null,
          title: "Hostels",
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
                      name="sort-variant"
                      // name="view-dashboard-outline"
                      size={25}
                      color={activeColors.tint}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          ),
          headerLeft: () => (
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
              <Pressable onPress={() => navigation.openDrawer()} style={{}}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
                    }}
                    style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="hostels/details/map"
        options={{
          // headerShown: false,
          href: null,
          title: "Details",
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
                      name="sort-variant"
                      // name="view-dashboard-outline"
                      size={25}
                      color={activeColors.tint}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          ),
          headerLeft: () => (
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
              <Pressable onPress={() => navigation.openDrawer()} style={{}}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
                    }}
                    style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="hostels/details/[id]"
        options={{
          // headerShown: false,
          href: null,
          title: "Details",
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
                      name="sort-variant"
                      // name="view-dashboard-outline"
                      size={25}
                      color={activeColors.tint}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          ),
          headerLeft: () => (
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
              <Pressable onPress={() => navigation.openDrawer()} style={{}}>
                {({ pressed }) => (
                  <Image
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/69388140?s=400&u=6a8b6906808767b2865f22a0c11609b6dcf84d80&v=4",
                    }}
                    style={[styles.image, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
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
