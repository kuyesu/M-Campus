import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { Avatar, Day, utils } from "react-native-gifted-chat";
import { ThemeContext } from "@/context/themeContext";
import { colors } from "@/constants/Colors";

// components
import CustomMessageBubble from "./CustomMessageBubble";
import { useSelector } from "react-redux";

const { isSameUser, isSameDay } = utils;

const CustomMessage = (props) => {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];
  const { user, isAuthenticated, token } = useSelector(
    (state: any) => state.user
  );
  const getInnerComponentProps = () => {
    const { containerStyle, ...restProps } = props;
    return {
      ...restProps,
      position: "left",
      isSameUser,
      isSameDay,
    };
  };

  const renderDay = () => {
    const { currentMessage, renderDay } = props;

    if (currentMessage.createdAt) {
      const dayProps = getInnerComponentProps();

      if (renderDay) {
        return renderDay(dayProps);
      }

      return (
        <Day
          {...dayProps}
          containerStyle={styles.containerDay}
          textStyle={styles.dayText}
        />
      );
    }

    return null;
  };

  const renderBubble = () => {
    const { renderBubble } = props;
    const bubbleProps = getInnerComponentProps();

    if (renderBubble) {
      return renderBubble(bubbleProps);
    }

    return <CustomMessageBubble {...bubbleProps} />;
  };

  const renderAvatar = () => {
    const { currentMessage, previousMessage } = props;
    let extraStyle;

    if (
      isSameUser(currentMessage, previousMessage) &&
      isSameDay(currentMessage, previousMessage)
    ) {
      extraStyle = { height: 0 };
    }

    const avatarProps = getInnerComponentProps();

    return (
      <Avatar
        {...avatarProps}
        imageStyle={{
          left: [styles.slackAvatar, avatarProps.imageStyle, extraStyle],
        }}
      />
    );
  };

  const { containerStyle, currentMessage, nextMessage } = props;

  return (
    <View>
      {renderDay()}

      <View
        style={[
          styles.container,
          {
            borderTopColor:
              theme.mode == "dark"
                ? "rgba(31, 41, 55, 1)"
                : activeColors.grayAccent,
            borderTopWidth: 1,
            paddingTop: 15,
            marginHorizontal: 15,
            marginBottom: isSameUser(currentMessage, nextMessage) ? 2 : 15,
          },
          containerStyle,
        ]}
      >
        {renderAvatar()}
        {renderBubble()}
      </View>
    </View>
  );
};

CustomMessage.defaultProps = {
  currentMessage: {},
  containerStyle: {},
  nextMessage: {},
  previousMessage: {},
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  user: {},
};

CustomMessage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  renderAvatar: PropTypes.func,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  user: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // paddingHorizontal: 8,
  },
  containerDay: {
    alignItems: "center",
    // borderBottomColor: colors.greyLine,

    marginHorizontal: 8,
  },
  dayText: {
    // ...gStyle.textLarsBold16,
    // color: colors.slackBlack,
    paddingBottom: 2,
    textAlign: "left",
  },
  slackAvatar: {
    borderRadius: 3,
    height: 35,
    width: 35,
  },
});

export default CustomMessage;
