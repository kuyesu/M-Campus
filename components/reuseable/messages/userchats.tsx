import { colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import { Chat, MessageType, defaultTheme } from "@flyerhq/react-native-chat-ui";
import React, { useContext, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// For the testing purposes, you should probably use https://github.com/uuidjs/uuid
const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r % 4) + 8;
    return v.toString(16);
  });
};

const App = () => {
  const [messages, setMessages] = useState<MessageType.Any[]>([]);
  const user = { id: "06c33e8b-e835-4736-80f4-63f44b66666c" };

  const addMessage = (message: MessageType.Any) => {
    setMessages([message, ...messages]);
  };

  const handleSendPress = (message: MessageType.PartialText) => {
    const textMessage: MessageType.Text = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: "text",
    };
    addMessage(textMessage);
  };

  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  let activeColors = colors[theme.mode];

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: activeColors.primary,
      }}
    >
      <Chat
        messages={messages}
        onSendPress={handleSendPress}
        user={user}
        theme={{
          ...defaultTheme,
          colors: {
            ...defaultTheme.colors,
            background: activeColors.primary,
            inputText: activeColors.tint,
            primary: activeColors.accent,
            userAvatarImageBackground: "transparent",
          },
        }}
      />
    </SafeAreaProvider>
  );
};

export default App;
