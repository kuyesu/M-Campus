import { View, Text, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { FlashList } from "@shopify/flash-list";
import StyledView from "@/components/View/StyledView";
import StyledText from "@/components/Text/StyledText";
import tweets from "@/data/tweets";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
const StyledUpdate = () => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <FlashList
      data={tweets}
      removeClippedSubviews={true}
      contentContainerStyle={{
        backgroundColor: "transparent",
        // borderRadius: 15,
      }}
      showsVerticalScrollIndicator={false}
      numColumns={1}
      keyExtractor={(key) => key.id}
      renderItem={({ item }) => (
        <StyledView
          style={{
            flexDirection: "row",
            display: "flex",
            paddingRight: 25,
            height: 90,
            backgroundColor: "transparent",
            overflow: "hidden",
            width: "100%",
            // marginRight: 10,
            marginBottom: 25,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <View>
            <Image
              source={{
                uri: `${item.image}`,
              }}
              style={[styles.image]}
            />
          </View>
          <View
            style={{
              // paddingVertical: 15,
              paddingHorizontal: 25,
              gap: 3,
              // height: 70,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                // paddingVertical: 15,
                // paddingHorizontal: 25,
                gap: 3,
                height: 70,
                overflow: "hidden",
              }}
            >
              <StyledText style={{ fontSize: 16 }} bold>
                {item.title}
              </StyledText>
              <StyledText
                small
                style={{ color: activeColors.tertiary, overflow: "hidden" }}
              >
                {item.content}
              </StyledText>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 15,
                paddingHorizontal: 25,
                gap: 3,
                height: 70,
                overflow: "hidden",
              }}
            >
              <StyledText style={{ fontSize: 16 }} bold>
                {item.user.name}
              </StyledText>
              <StyledText
                small
                style={{ color: activeColors.tertiary, overflow: "hidden" }}
              >
                {item.createdAt}
              </StyledText>
            </View>
          </View>
        </StyledView>
      )}
      estimatedItemSize={200}
    />
  );
};

export default StyledUpdate;

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
    borderRadius: 15,

    // marginRight: 10,
  },
});
