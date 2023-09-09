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
      horizontal
      removeClippedSubviews={true}
      contentContainerStyle={{
        backgroundColor: "transparent",
        // borderRadius: 15,
      }}
      showsHorizontalScrollIndicator={false}
      numColumns={1}
      keyExtractor={(key) => key.id}
      renderItem={({ item }) => (
        <StyledView
          style={{
            padding: 5,
            marginRight: 10,
            marginBottom: 5,
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
          <View style={{ paddingVertical: 10, paddingHorizontal: 15, gap: 3 }}>
            <StyledText style={{ fontSize: 16 }} bold>
              {item.title}
            </StyledText>
            <StyledText small style={{ color: activeColors.tertiary }}>
              1 20/ 2903/92
            </StyledText>
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
    // width: "90%",
    height: 120,
    borderRadius: 15,
    // marginRight: 10,
  },
});
