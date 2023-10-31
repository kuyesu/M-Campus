import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  MessageText,
  MessageImage,
  Time,
  utils,
} from "react-native-gifted-chat";
import Clipboard from "@react-native-clipboard/clipboard";
import { Platform } from "react-native";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";
import { useSelector } from "react-redux";
import StyledText from "../Text/StyledText";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
const { isSameUser, isSameDay } = utils;

const CustomMessageBubble = (props, context) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user, isAuthenticated, token } = useSelector(
    (state: any) => state.user
  );
  const [isCopied, setIsCopied] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const onPress = () => {
    setIsCopied(true);
    const { currentMessage, onLongPress } = props;
    Clipboard.setString(currentMessage.text);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const onLongPress = () => {
    const onShare = async () => {
      try {
        const result = await Share.share({
          message: currentMessage.text,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error: any) {
        Alert.alert("Can not share message");
      }
    };
    const { currentMessage, onLongPress } = props;
    const options = ["Copy to clipboard", "Share", "Cancel"];
    const ShareChat = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        // destructiveButtonIndex,
      },
      (selectedIndex: number) => {
        switch (selectedIndex) {
          case 0:
            // copy
            setIsCopied(true);
            Clipboard.setString(currentMessage.text);
            setTimeout(() => {
              setIsCopied(false);
            }, 2000);
            break;
          case ShareChat:
            // share
            onShare();
            break;
          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  const renderMessageText = () => {
    const { currentMessage, renderMessageText } = props;

    if (currentMessage.text) {
      const { ...messageTextProps } = props;

      if (renderMessageText) {
        return renderMessageText(messageTextProps);
      }

      return (
        <MessageText
          {...messageTextProps}
          textStyle={{
            left: {
              color:
                currentMessage.user.name == "Mi assistant"
                  ? activeColors.tint
                  : activeColors.gray,
              // fontSize:20,
              marginLeft: 0,
              marginRight: 0,
              padding: 0,
              marginTop: 0,
              textAlign: "left",
              //   add line spacing
              lineHeight: 24,
              //   fontFamily: "A",
              //   fontWeight: "100",
            },
          }}
        />
      );
    }

    return null;
  };

  const renderMessageImage = () => {
    const { currentMessage, renderMessageImage } = props;

    if (currentMessage.image) {
      const { ...messageImageProps } = props;

      if (renderMessageImage) {
        return renderMessageImage(messageImageProps);
      }

      return (
        <MessageImage
          {...messageImageProps}
          imageStyle={[styles.slackImage, messageImageProps.imageStyle]}
        />
      );
    }

    return null;
  };

  const renderUsername = () => {
    const { currentMessage, renderUsername } = props;

    const username = currentMessage.user.name;

    if (username || user.name) {
      const { ...usernameProps } = props;

      if (renderUsername) {
        return renderUsername(usernameProps);
      }

      return (
        <StyledText
          style={{
            color: activeColors.gray,
            //   italic
          }}
          small
          className=""
        >
          ~ {username === "Mi assistant" ? username : "You"}
        </StyledText>
      );
    }

    return null;
  };

  const renderTime = () => {
    const { currentMessage, renderTime } = props;

    if (currentMessage.createdAt) {
      const { ...timeProps } = props;

      if (renderTime) {
        return renderTime(timeProps);
      }

      return (
        <Time
          {...timeProps}
          containerStyle={{ left: [styles.containerTime] }}
          textStyle={{
            left: [
              {
                color: activeColors.gray,
              },
              timeProps.textStyle,
            ],
          }}
        />
      );
    }

    return null;
  };

  const { currentMessage, previousMessage, touchableProps } = props;

  const isSameThread =
    isSameUser(currentMessage, previousMessage) &&
    isSameDay(currentMessage, previousMessage);

  return (
    <View
      style={[
        styles.container,
        {
          //   backgroundColor: activeColors.secondary,

          marginBottom: isSameThread ? 20 : 20,
        },
      ]}
    >
      <TouchableOpacity
        accessibilityTraits="text"
        onLongPress={onLongPress}
        {...touchableProps}
        style={{
          backgroundColor:
            currentMessage.user.name == "Mi assistant"
              ? theme.mode == "dark"
                ? "rgba(31, 41, 55, 0.1)"
                : "rgba(255, 255, 255, 0.1)"
              : activeColors.primary,
          borderRadius: 5,
          paddingTop: 5,
          width: "100%",
          // marginBottom: 10,
          // marginTop: 10,
          // marginLeft: 10,
          // marginRight: 10,
          // padding: 10,
          // borderRadius: 10,
          // borderWidth: 1,
          // borderColor: activeColors.gray,
        }}
      >
        <View style={styles.containerContent}>
          {renderMessageImage()}
          {renderMessageText()}
          {isSameThread ? null : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              {renderUsername()}
              {renderTime()}
            </View>
          )}
          <View
            style={{
              //   position: "absolute",
              //   bottom: 20,
              alignContent: "flex-end",
              alignItems: "flex-end",
              right: 0,
              paddingTop: 20,
              // backgroundColor: "red",
            }}
          >
            <TouchableOpacity onPress={onPress}>
              <MaterialCommunityIcons
                name={isCopied ? "check" : "content-copy"}
                size={16}
                color={activeColors.tint}
                style={{
                  transform: [{ rotate: !isCopied ? "180deg" : "0deg" }],
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

CustomMessageBubble.defaultProps = {
  currentMessage: {
    createdAt: null,
    image: null,
    text: null,
  },
  nextMessage: {},
  onLongPress: null,
  previousMessage: {},
  renderMessageImage: null,
  renderMessageText: null,
  renderTime: null,
  renderUsername: null,
  touchableProps: {},
};

CustomMessageBubble.propTypes = {
  currentMessage: PropTypes.object,
  onLongPress: PropTypes.func,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  renderMessageImage: PropTypes.func,
  renderMessageText: PropTypes.func,
  renderTime: PropTypes.func,
  renderUsername: PropTypes.func,
  touchableProps: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flex: 1,
  },
  containerContent: {
    justifyContent: "flex-end",
    minHeight: 16,
    paddingRight: 16,
  },
  containerMsgHeader: {
    alignItems: "baseline",
    flexDirection: "row",
    marginTop: Platform.OS == "android" ? 18 : 0,
  },
  //   usernameText: {
  //     ...gStyle.textLarsBold14,
  //     color: colors.slackBlack,
  //     marginRight: 8,
  //   },
  containerTime: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  //   timeText: {
  //     ...gStyle.textCiruBook12,
  //     color: "#9EA0A4",
  //   },
  slackImage: {
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 0,
  },
  slackMessageText: {
    // ...gStyle.textCiruBook14,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default CustomMessageBubble;
