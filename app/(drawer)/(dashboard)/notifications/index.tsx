import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

// components
import MainContainer from "@/components/container/MainContainer";
import { colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/themeContext";
import {
  ArrowDownCircleIcon,
  CalendarIcon,
  Cog6ToothIcon,
} from "react-native-heroicons/outline";
import StyledText from "@/components/Text/StyledText";

export default function TabOneScreen() {
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const [isActive, setIsActivate] = useState(theme.mode === "dark");
  const handleSwitch = () => {
    updateTheme();
    setIsActivate((previousState) => !previousState);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: activeColors.primary,
      }}
    >
      <View
        className="flex flex-row  items-center  py-5  border-b"
        style={{
          borderBottomColor: activeColors.gray,
        }}
      >
        <StyledText
          className="text-lg font-medium "
          style={{
            color: activeColors.tint,
          }}
          bold
        >
          Notifications
        </StyledText>
        <View className="px-2 py-  items-center text-center justify-center  text-white">
          <View
            className="px-2 py-0.5 rounded-full   items-center text-center justify-center  text-white"
            style={{
              backgroundColor: activeColors.accent,
            }}
          >
            <StyledText
              bold
              style={{
                color: activeColors.secondary,
              }}
              className="text-xs  py-0 items-center text-center justify-center  "
            >
              2 NEW
            </StyledText>
          </View>
        </View>
      </View>
      <ScrollView
        className=" py-5 space-y-8"
        style={[
          {
            backgroundColor: activeColors.primary,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex justify-between flex-row items-start">
          <View className="flex flex-row items-start">
            <View className="flex p-2 bg-[#86e63b]/[.2]">
              <ArrowDownCircleIcon color={activeColors.gray} />
            </View>
            <View className="flex  justify-between px-3 items-start space-y-2 ">
              <Text
                className="text font-normal "
                style={{
                  color: activeColors.tint,
                }}
              >
                Reply from Solomon Agum
              </Text>
              <Text className="text-xs font-light text-gray-500">
                Contact the helpdesk at the recieption to help with...
              </Text>
            </View>
          </View>
          <View className="flex items-end space-y-2 ">
            <Text className="text-sm font-normal text-[#041633]/[.5]">Now</Text>
            <View
              className="p-1 rounded-full   items-center text-center justify-center"
              style={{
                backgroundColor: activeColors.accent,
              }}
            />
          </View>
        </View>
        {/* single notification */}
        <View className="flex justify-between flex-row items-start">
          <View className="flex flex-row items-start">
            <View className="flex p-2 bg-[#041633]/[.2]">
              <Cog6ToothIcon color={activeColors.gray} />
            </View>
            <View className="flex  justify-between px-3 items-start space-y-2 ">
              <Text
                className=" font-normal "
                style={{
                  color: activeColors.tint,
                }}
              >
                System Update
              </Text>
              <Text className="text-xs font-light text-gray-500">
                Update your user informations
              </Text>
            </View>
          </View>
          <View className="flex items-end space-y-2 ">
            <Text className="text-sm font-normal text-[#041633]/[.5]">
              13:00PM
            </Text>
            <View
              className="p-1 rounded-full   items-center text-center justify-center"
              style={{
                backgroundColor: activeColors.accent,
              }}
            />
          </View>
        </View>
        {/* single notification */}
        <View className="flex justify-between flex-row items-start">
          <View className="flex flex-row items-start">
            <View className="flex p-2 bg-[#59026c]/[.2]">
              <CalendarIcon color={activeColors.gray} />
            </View>
            <View className="flex  justify-between px-3 items-start space-y-2 ">
              <Text
                className=" font-normal "
                style={{
                  color: activeColors.tint,
                }}
              >
                Extended dates
              </Text>
              <Text className="text-xs font-light text-gray-500">
                This is to inform the students of ...
              </Text>
            </View>
          </View>
          <View className="flex items-end space-y-2 ">
            <Text className="text-sm font-normal text-[#041633]/[.5]">
              Jul 20, 2023
            </Text>
            {/* <View className="p-1 rounded-full bg-[#f2604d]  items-center text-center justify-center" /> */}
          </View>
        </View>
        {/* single notification */}
        <View className="flex justify-between flex-row items-start">
          <View className="flex flex-row items-start">
            <View className="flex p-2 bg-[#86e63b]/[.2]">
              <ArrowDownCircleIcon color={activeColors.gray} />
            </View>
            <View className="flex  justify-between px-3 items-start space-y-2 ">
              <Text
                className=" font-normal "
                style={{
                  color: activeColors.tint,
                }}
              >
                Reply from Solomon Agum
              </Text>
              <Text className="text-xs font-light text-gray-500">
                Reply from Solomon Agum
              </Text>
            </View>
          </View>
          <View className="flex items-end space-y-2 ">
            <Text className="text-sm font-normal text-[#041633]/[.5]">
              Jul 01, 2023
            </Text>
            {/* <View className="p-1 rounded-full bg-[#f2604d]  items-center text-center justify-center" /> */}
          </View>
        </View>
        {/* single notification */}
        <View className="flex justify-between flex-row items-start">
          <View className="flex flex-row items-start">
            <View className="flex p-2 bg-[#86e63b]/[.2]">
              <ArrowDownCircleIcon color={activeColors.gray} />
            </View>
            <View className="flex  justify-between px-3 items-start space-y-2 ">
              <Text
                className=" font-normal "
                style={{
                  color: activeColors.tint,
                }}
              >
                Reply from Solomon Agum
              </Text>
              <Text className="text-xs font-light text-gray-500">
                Reply from Solomon Agum
              </Text>
            </View>
          </View>
          <View className="flex items-end space-y-2 ">
            <Text className="text-sm font-normal text-[#041633]/[.5]">
              Jun 14, 2023
            </Text>
            {/* <View className="p-1 rounded-full bg-[#f2604d]  items-center text-center justify-center" /> */}
          </View>
        </View>
        {/* single notification */}
        <View className="flex justify-between flex-row items-start">
          <View className="flex flex-row items-start">
            <View className="flex p-2 bg-[#86e63b]/[.2]">
              <ArrowDownCircleIcon color={activeColors.gray} />
            </View>
            <View className="flex  justify-between px-3 items-start space-y-2 ">
              <Text
                className=" font-normal "
                style={{
                  color: activeColors.tint,
                }}
              >
                Reply from Solomon Agum
              </Text>
              <Text className="text-xs font-light text-gray-500">
                Reply from Solomon Agum
              </Text>
            </View>
          </View>
          <View className="flex items-end space-y-2 ">
            <Text className="text-sm font-normal text-[#041633]/[.5]">
              Jun 03, 2023
            </Text>
            {/* <View className="p-1 rounded-full bg-[#f2604d]  items-center text-center justify-center" /> */}
          </View>
        </View>
        {/* single notification */}
        <View className="flex justify-between flex-row items-start">
          <View className="flex flex-row items-start">
            <View className="flex p-2 bg-[#86e63b]/[.2]">
              <ArrowDownCircleIcon color={activeColors.gray} />
            </View>
            <View className="flex  justify-between px-3 items-start space-y-2 ">
              <Text
                className=" font-normal "
                style={{
                  color: activeColors.tint,
                }}
              >
                Reply from Solomon Agum
              </Text>
              <Text className="text-xs font-light text-gray-500">
                Reply from Solomon Agum
              </Text>
            </View>
          </View>
          <View className="flex items-end space-y-2 ">
            <Text className="text-sm font-normal text-[#041633]/[.5]">
              May 20, 2023
            </Text>
            {/* <View className="p-1 rounded-full bg-[#f2604d]  items-center text-center justify-center" /> */}
          </View>
        </View>
        {/* single notification */}
        <View className="flex justify-between flex-row items-start">
          <View className="flex flex-row items-start">
            <View className="flex p-2 bg-[#86e63b]/[.2]">
              <ArrowDownCircleIcon color={activeColors.gray} />
            </View>
            <View className="flex  justify-between px-3 items-start space-y-2 ">
              <Text
                className=" font-normal "
                style={{
                  color: activeColors.tint,
                }}
              >
                Reply from Solomon Agum
              </Text>
              <Text className="text-xs font-light text-gray-500">
                Reply from Solomon Agum
              </Text>
            </View>
          </View>
          <View className="flex items-end space-y-2 ">
            <Text className="text-sm font-normal text-[#041633]/[.5]">
              May 12, 2023
            </Text>
            {/* <View className="p-1 rounded-full bg-[#f2604d]  items-center text-center justify-center" /> */}
          </View>
        </View>
        {/* single notification */}
        <View className="flex justify-between flex-row items-start">
          <View className="flex flex-row items-start">
            <View className="flex p-2 bg-[#86e63b]/[.2]">
              <ArrowDownCircleIcon color={activeColors.gray} />
            </View>
            <View className="flex  justify-between px-3 items-start space-y-2 ">
              <Text
                className=" font-normal "
                style={{
                  color: activeColors.tint,
                }}
              >
                Reply from Solomon Agum
              </Text>
              <Text className="text-xs font-light text-gray-500">
                Reply from Solomon Agum
              </Text>
            </View>
          </View>
          <View className="flex items-end space-y-2 ">
            <Text className="text-sm font-normal text-[#041633]/[.5]">
              Dec 16, 2022
            </Text>
            {/* <View className="p-1 rounded-full bg-[#f2604d]  items-center text-center justify-center" /> */}
          </View>
        </View>
        {/* single notification */}
        <View className="flex justify-between flex-row items-start">
          <View className="flex flex-row items-start">
            <View className="flex p-2 bg-[#86e63b]/[.2]">
              <ArrowDownCircleIcon color={activeColors.gray} />
            </View>
            <View className="flex  justify-between px-3 items-start space-y-2 ">
              <Text
                className=" font-normal "
                style={{
                  color: activeColors.tint,
                }}
              >
                Reply from Solomon Agum
              </Text>
              <Text className="text-xs font-light text-gray-500">
                Reply from Solomon Agum
              </Text>
            </View>
          </View>
          <View className="flex items-end space-y-2 ">
            <Text className="text-sm font-normal text-[#041633]/[.5]">
              Sept 30, 2022
            </Text>
            {/* <View className="p-1 rounded-full bg-[#f2604d]  items-center text-center justify-center" /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
});
