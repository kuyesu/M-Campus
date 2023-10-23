import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import React, {
  useState,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import StyledText from "@/components/Text/StyledText";
import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import { useSelector } from "react-redux";
import { URI } from "@/redux/URI";
import { useLocalSearchParams } from "expo-router";
import { getTimeDurationLong } from "@/common/TimeGenerator";
import axios from "axios";

const ChatMessagesScreen = () => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState("");
  const route = useRoute();
  const { id } = useLocalSearchParams();
  // const [recepientId, setRecepientId] = useState("");
  const [imageMessage, setImageMessage] = useState("");
  const [message, setMessage] = useState("");
  const { user, token, users } = useSelector((state: any) => state.user);
  const scrollViewRef = useRef(null);

  const userId = user._id;
  const stringId = id.toString();
  const recepientId = stringId;
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, []);
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${URI}/messages/${userId}/${recepientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.log("error showing messags", response.status);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  fetchMessages();

  useEffect(() => {
    const fetchRecepientData = async () => {
      try {
        const response = await fetch(`${URI}/user/${recepientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setRecepientData(data);
      } catch (error) {
        console.log("error retrieving details", error);
      }
    };

    fetchRecepientData();
  }, []);
  const handleSend = async (messageType, imageMessage) => {
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recepientId", recepientId);

      //if the message type id image or a normal text
      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("imageMessage", imageMessage);
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }

      // if (imageUri) {
      const config = {
        senderId: userId,
        recepientId: recepientId,
        messageType: messageType,
        messageText: message,
        imageMessage: imageMessage ? imageMessage : null,
      };
      try {
        const res = await axios.post(`${URI}/messages`, config, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("res", res);
        if (res.status === 200) {
          setMessage("");
          setSelectedImage("");
          fetchMessages();
        }
      } catch (error) {
        console.log("error", error);
      }
      setMessage("");
      setSelectedImage("");
      fetchMessages();
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };

  const deleteMessages = async (messageIds) => {
    try {
      const response = await fetch(`${URI}/deleteMessages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: messageIds }),
      });

      if (response.ok) {
        setSelectedMessages((prevSelectedMessages) =>
          prevSelectedMessages.filter((id) => !messageIds.includes(id))
        );

        fetchMessages();
      } else {
        console.log("error deleting messages", response.status);
      }
    } catch (error) {
      console.log("error deleting messages", error);
    }
  };
  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        // @ts-ignore
        setImageMessage("data:image/jpeg;base64," + image.data);
        // console.log("image", imageMessage);
        // handleSend("image", imageMessage);
        const config = {
          senderId: userId,
          recepientId: recepientId,
          messageType: "image",
          // messageText: message,
          // @ts-ignore
          imageMessage: "data:image/jpeg;base64," + image.data,
        };
        axios
          .post(`${URI}/messages`, config, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res: any) => {
            if (res.status.ok) {
              setMessage("");
              setSelectedImage("");
              fetchMessages();
            }
          })
          .catch((err: any) => {
            console.log("err", err);
          });
      }
    });
  };

  const handleSelectMessage = (message) => {
    //check if the message is already selected
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((previousMessages) =>
        previousMessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedMessages((previousMessages) => [
        ...previousMessages,
        message._id,
      ]);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: activeColors.primary }}
    >
      {selectedMessages.length > 0 && (
        <View
          style={{
            backgroundColor: activeColors.secondary,
            paddingVertical: 5,
            paddingHorizontal: 5,
            borderRadius: 50,
            margin: 0,
          }}
          className=" flex-row justify-center items-center absolute top-3 right-4"
        >
          <StyledText
            className=" absolute -top-2 -right-2"
            style={{ fontSize: 16, fontWeight: "500" }}
          >
            {selectedMessages.length}
          </StyledText>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialIcons
              onPress={() => deleteMessages(selectedMessages)}
              name="delete-outline"
              size={30}
              color={activeColors.tint}
            />
          </View>
        </View>
      )}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      >
        <ImageBackground
          source={require("@/assets/chat-bg.png")}
          style={{ height: "100%", width: "100%" }}
          imageStyle={{
            alignSelf: "flex-end",
            flex: 1,
            opacity: 0.3,
            zIndex: -1,
          }}
          blurRadius={0}
          resizeMode="cover"
          tintColor={activeColors.grayAccent}
        >
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            {messages.map((item, index) => {
              if (item.messageType === "text") {
                const isSelected = selectedMessages.includes(item._id);
                return (
                  <View
                    style={{
                      paddingTop: 10,
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        left: 10,
                        bottom: 0,
                        zIndex: 1,
                        borderRadius: 100,
                        borderRightColor: activeColors.primary,
                        borderRightWidth: 4,
                      }}
                    >
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 50,
                        }}
                        source={{
                          uri: users.find(
                            (user) => user._id === item?.senderId?._id
                          )?.avatar?.url,
                        }}
                      />
                    </View>
                    <Pressable
                      onLongPress={() => handleSelectMessage(item)}
                      key={index}
                      style={[
                        item?.senderId?._id === userId
                          ? {
                              alignSelf: "flex-end",
                              backgroundColor: activeColors.primary,
                              padding: 10,
                              maxWidth: "60%",
                              borderRadius: 5,

                              margin: 10,
                            }
                          : {
                              alignSelf: "flex-start",
                              backgroundColor: activeColors.secondary,
                              padding: 10,
                              marginLeft: 35,

                              borderRadius: 8,
                              borderBottomStartRadius: 0,
                              maxWidth: "60%",
                              left: 3,
                            },

                        isSelected && {
                          width: "100%",
                          backgroundColor: activeColors.secondary,
                          borderColor: activeColors.grayAccent,
                          borderWidth: 1,
                        },
                      ]}
                    >
                      <StyledText
                        style={{
                          fontSize: 13,
                          textAlign: isSelected ? "left" : "left",
                          color: isSelected
                            ? activeColors.tint
                            : activeColors.tint,
                        }}
                      >
                        {item?.message}
                      </StyledText>
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                          gap: 10,
                        }}
                      >
                        <StyledText
                          style={{
                            textAlign: "right",
                            fontSize: 9,
                            color: "gray",
                            marginTop: 5,
                          }}
                        >
                          ~ {item?.senderId?.name}
                        </StyledText>
                        <Text
                          style={{
                            textAlign: "right",
                            fontSize: 9,
                            color: "gray",
                            marginTop: 5,
                          }}
                        >
                          {getTimeDurationLong(item.timeStamp)}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                );
              }

              if (item.messageType === "image") {
                return (
                  <Pressable
                    key={index}
                    style={[
                      item?.senderId?._id === userId
                        ? {
                            alignSelf: "flex-end",
                            backgroundColor: "#DCF8C6",

                            padding: 8,
                            maxWidth: "60%",
                            borderRadius: 7,
                            margin: 10,
                          }
                        : {
                            alignSelf: "flex-start",
                            backgroundColor: activeColors.secondary,
                            padding: 8,
                            margin: 10,
                            borderRadius: 7,
                            maxWidth: "60%",
                          },
                    ]}
                  >
                    <View>
                      {item?.imageUrl && (
                        <Image
                          source={{
                            uri: item?.imageUrl,
                          }}
                          style={{ width: 200, height: 200, borderRadius: 7 }}
                        />
                      )}
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 9,
                          position: "absolute",
                          right: 10,
                          bottom: 7,
                          color: "white",
                          marginTop: 5,
                        }}
                      >
                        {getTimeDurationLong(item?.timeStamp)}
                      </Text>
                    </View>
                  </Pressable>
                );
              }
            })}
          </View>
        </ImageBackground>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: activeColors.postBorder,
          marginBottom: showEmojiSelector ? 0 : 25,
        }}
      >
        <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />

        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: activeColors.postBorder,
            borderRadius: 20,
            paddingHorizontal: 10,
            color: activeColors.tint,
          }}
          placeholderTextColor={"gray"}
          placeholder="Type Your message..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        >
          <Entypo onPress={uploadImage} name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable
          onPress={() => handleSend("text", imageMessage)}
          style={{
            backgroundColor: activeColors.secondary,
            paddingVertical: 7,
            paddingHorizontal: 12,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: activeColors.tint, fontWeight: "bold" }}>
            Send
          </Text>
        </Pressable>
      </View>

      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          showHistory={true}
          showSearchBar={true}
          showTabs={true}
          showSectionTitles={true}
          theme="dark"
          placeholder="Search Mi emoji"
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({});
