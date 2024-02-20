import React, { useContext } from "react";
import { useReducer } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";

export const StyledLoading = () => {
  const [dark, toggle] = useReducer((s) => !s, true);

  const colorMode = dark ? "dark" : "light";
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <Pressable
      onPress={toggle}
      style={[styles.container, { backgroundColor: activeColors.primary }]}
    >
      <MotiView
        transition={{
          type: "timing",
        }}
        style={[styles.container, styles.padded]}
        animate={{ backgroundColor: activeColors.primary }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",

            width: "100%",
            gap: 16,
          }}
        >
          <Skeleton
            backgroundColor={activeColors.secondary}
            radius={5}
            height={35}
            width={35}
          />
          <Skeleton
            backgroundColor={activeColors.secondary}
            height={100}
            width={"93%"}
          />
        </View>
        <Spacer height={30} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",

            width: "100%",
            gap: 16,
          }}
        >
          <Skeleton
            backgroundColor={activeColors.secondary}
            radius={5}
            height={35}
            width={35}
          />
          <Skeleton
            backgroundColor={activeColors.secondary}
            height={100}
            width={"93%"}
          />
        </View>
        <Spacer height={30} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",

            width: "100%",
            gap: 16,
          }}
        >
          <Skeleton
            backgroundColor={activeColors.secondary}
            radius={5}
            height={35}
            width={35}
          />
          <Skeleton
            backgroundColor={activeColors.secondary}
            height={100}
            width={"93%"}
          />
        </View>
        <Spacer height={30} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",

            width: "100%",
            gap: 16,
          }}
        >
          <Skeleton
            backgroundColor={activeColors.secondary}
            radius={5}
            height={35}
            width={35}
          />
          <Skeleton
            backgroundColor={activeColors.secondary}
            height={100}
            width={"93%"}
          />
        </View>
        <Spacer height={30} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",

            width: "100%",
            gap: 16,
          }}
        >
          <Skeleton
            backgroundColor={activeColors.secondary}
            radius={5}
            height={35}
            width={35}
          />
          <Skeleton
            backgroundColor={activeColors.secondary}
            height={100}
            width={"93%"}
          />
        </View>
      </MotiView>
    </Pressable>
  );
};

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  padded: {
    padding: 16,
  },
});
