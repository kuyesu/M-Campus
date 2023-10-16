import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  Pressable,
  RefreshControl,
} from "react-native";
import { colors } from "@/constants/Colors";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ThemeContext } from "@/context/themeContext";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import getTimeDuration from "@/common/TimeGenerator";
import axios from "axios";
import { URI } from "@/redux/URI";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import MainContainer from "@/components/container/MainContainer";
import StyledText from "@/components/Text/StyledText";
import StyledTextInput from "@/components/TextInput/StyledTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StyledView from "@/components/View/StyledView";

import { StyleSheet } from "react-native";
import { addReply, getAllTickets } from "@/redux/actions/ticketAction";

type Props = {
  item: any;
  navigation: any;
  route: any;
  postId: string;
};

const CreateRepliesScreen = ({ navigation, route }: Props) => {
  const { tickets, isLoadingTicket } = useSelector(
    (state: any) => state.ticket
  );

  const params = useLocalSearchParams();
  const { id }: any = params;
  const ticketId = id;
  // console.log("ticketId", ticketId);

  // const { user, token } = useSelector((state: any) => state.user);
  const { user, token } = useSelector((state: any) => state.user);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { theme, updateTheme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const router = useRouter();

  useEffect(() => {
    if (tickets && user) {
      const myPosts = tickets.find((ticket: any) => ticket._id === ticketId);
      setData(myPosts);
    }
    // console.log(tickets);
  }, [tickets]);
  const ticket = tickets.find((ticket: any) => ticket._id === ticketId);

  const ImageUpload = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        // @ts-ignore
        setImage("data:image/jpeg;base64," + image.data);
      }
    });
  };

  const time = ticket?.createdAt;
  const formattedDuration = getTimeDuration(time);

  const createReplies = async () => {
    console.log("ticketId", user);
    if (!ticketId) {
      await axios
        .put(
          `${URI}/add-reply-to-ticket`,
          {
            ticketId: ticket?._id,
            title,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res: any) => {
          getAllTickets()(dispatch);
          router.replace(`/inquiries/${ticketId}`);
          setTitle("");
          setImage("");
        });
    } else {
      await axios
        .put(
          `${URI}/add-replies-to-ticket`,
          {
            ticketId,
            replyId: ticket?._id,
            title,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res: any) => {
          router.replace(`/inquiries/${ticketId}`);
          setTitle("");
          setImage("");
        });
    }
  };
  return (
    <MainContainer>
      <View className="h-[80vh] justify-between flex-col">
        <View className="flex-row items-center justify-end pt-4">
          <StyledText>{formattedDuration} ago</StyledText>
          <TouchableOpacity>
            <StyledText className=" px-4 pl-2  mb-[4px]">...</StyledText>
          </TouchableOpacity>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoadingTicket}
              onRefresh={() => {
                getAllTickets()(dispatch);
              }}
            />
          }
          className="relative"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row w-full justify-between p-3">
            <View className="flex-row items-start">
              <View className="pl-0 ">
                <ScrollView bounces showsVerticalScrollIndicator={false}>
                  <StyledView
                    className="  rounded-md border  w-full "
                    style={{ borderColor: activeColors.primary }}
                  >
                    <View
                      style={[
                        styles.ticketContainer,
                        styles.ticketAnswered,
                        { borderColor: activeColors.accent },
                      ]}
                      className="py-4 "
                    >
                      <View style={styles.ticketStatusIndicator} />
                      <View className="flex px-4  flex-row justify-between items-start w-full">
                        <View>
                          <StyledText bold>{ticket?.user?.name}</StyledText>
                          <StyledText
                            style={{
                              fontSize: 12,
                            }}
                          >
                            {ticket?.description?.studentID}
                          </StyledText>
                        </View>
                        <View className=" items-start">
                          <Image
                            source={{ uri: ticket?.user?.avatar?.url }}
                            width={40}
                            height={40}
                            borderRadius={100}
                          />
                        </View>
                      </View>
                      <View className="flex px-4 flex-row justify-between items-start w-full">
                        <Text
                          className=" font-semibold"
                          style={{
                            color: activeColors.gray,
                          }}
                        >
                          Concern: {ticket?.title}
                        </Text>
                      </View>
                    </View>
                  </StyledView>
                </ScrollView>
              </View>
            </View>
          </View>
          {/* chat widget */}
          <View
            style={{
              flex: 1,
              width: "100%",
            }}
            className="p-3 w-full"
          >
            <View className="flex-row">
              <Image
                source={{ uri: user?.avatar?.url }}
                width={40}
                height={40}
                borderRadius={100}
              />
              <View className="pl-3 ">
                <View className="flex-row items-center justify-between">
                  <StyledText className=" font-[500] text-[18px]">
                    {user?.name}{" "}
                  </StyledText>
                  <Text>
                    <TouchableOpacity className="" onPress={ImageUpload}>
                      <MaterialCommunityIcons
                        name="image-edit-outline"
                        size={24}
                        color={activeColors.tint}
                      />
                    </TouchableOpacity>
                  </Text>
                </View>
                <StyledTextInput
                  placeholder={`Reply to ${ticket?.user?.name}...`}
                  placeholderTextColor={activeColors.gray}
                  className="mt-[15px] ml-1 w-full"
                  value={title}
                  onChangeText={setTitle}
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical="top"
                  style={{
                    width: 320,
                    height: 100,
                    textAlignVertical: "top",
                    color: activeColors.tint,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
            {image && (
              <View className="flex-row items-end justify-end p-4">
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 250,
                    height: 200,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          borderTopColor: activeColors.grayAccent,
          borderTopWidth: 10,
        }}
      >
        <View className="w-full flex-row justify-between pt-5 ">
          <StyledText className="left-3 ">
            Replying to {ticket?.user?.name}
          </StyledText>
          <TouchableOpacity
            style={{
              backgroundColor: activeColors.secondary,
              borderRadius: 25,
              paddingHorizontal: 20,
              padding: 10,
              marginRight: 10,
              borderColor: activeColors.grayAccent,
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={createReplies}
          >
            <StyledText className=" mr-[5px]">Send</StyledText>
            <MaterialCommunityIcons
              name="send"
              size={20}
              color={activeColors.accent}
            />
          </TouchableOpacity>
        </View>
      </View>
    </MainContainer>
  );
};
const styles = StyleSheet.create({
  footer: {
    height: 70,
    backgroundColor: "#FAFAFC",
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    borderColor: "#C1C0C8",
    borderWidth: 1,
  },
  ticketContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
    // paddingVertical: Platform.OS === "ios" ? 10 : 5,
    // borderRadius: 5,
    marginRight: 0,
    marginTop: 10,
  },
  ticketStatusIndicator: {
    // width: 10,
    // height: 10,
    // borderRadius: 5,
    // marginRight: 5,
  },
  ticketText: {
    fontSize: 16,
    // paddingVertical: 5,
    // margin: 20,
    fontWeight: "600",
    color: "#333333",
  },
  ticketAnswered: {
    // backgroundColor: "#eff0fb",
    // flex: 1,

    borderWidth: 0,
    borderLeftWidth: 5,
  },
  ticketAnswered2: {
    // backgroundColor: "#eff0fb",
    // flex: 1,
    borderColor: "#041633",
    borderWidth: 0,
    borderLeftWidth: 5,
  },
});

export default CreateRepliesScreen;
