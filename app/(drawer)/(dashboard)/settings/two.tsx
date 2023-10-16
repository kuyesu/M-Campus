import { StyleSheet, View, Switch } from "react-native";

// components
import MainContainer from "@/components/container/MainContainer";
import StyledText from "@/components/Text/StyledText";
import NewSection from "@/components/News/NewSection";
import { colors } from "@/constants/Colors";
import SettingItem from "@/components/reuseable/Settings/SettingItem";
import { useContext, useState } from "react";
import SettingsButton from "@/components/reuseable/Settings/SettingsButton";
import { ThemeContext } from "@/context/themeContext";

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
    <MainContainer style={styles.container}>
      <StyledText style={[{ color: activeColors.accent }, styles.title]} bold>
        User
      </StyledText>
      <View
        style={[
          // { backgroundColor: activeColors.secondary },
          styles.bottomSection,
        ]}
      >
        <SettingItem label="Name">
          <StyledText>Rogers Goodman</StyledText>
        </SettingItem>
        <SettingItem label="Name">
          <StyledText>Rogers Goodman</StyledText>
        </SettingItem>
      </View>
      {/* Theme switch */}
      <StyledText style={[{ color: activeColors.accent }, styles.title]} bold>
        Theme Switch
      </StyledText>
      <View
        style={[
          // { backgroundColor: activeColors.secondary },
          styles.bottomSection,
        ]}
      >
        <SettingItem label="Dark Mode">
          <Switch
            value={isActive}
            onChange={handleSwitch}
            thumbColor={isActive ? activeColors.accent : activeColors.tertiary}
            ios_backgroundColor={activeColors.primary}
            trackColor={{
              false: activeColors.primary,
              true: activeColors.tertiary,
            }}
          />
        </SettingItem>
      </View>
      {/* Theme Settings */}
      <StyledText style={[{ color: activeColors.accent }, styles.title]} bold>
        Theme Settings
      </StyledText>
      <View
        style={[
          // { backgroundColor: activeColors.secondary },
          styles.bottomSection,
        ]}
      >
        <SettingsButton
          label="Light"
          icon="lightbulb-on"
          isActive={theme.mode === "light" && !theme.system}
          onPress={() => updateTheme({ mode: "light" })}
        />
        <SettingsButton
          label="Dark"
          icon="weather-night"
          isActive={theme.mode === "dark" && !theme.system}
          onPress={() => updateTheme({ mode: "dark" })}
        />
        <SettingsButton
          label="System"
          icon="theme-light-dark"
          isActive={theme.system}
          onPress={() => updateTheme({ system: true })}
        />
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },
  setting: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
    marginBottom: 25,
  },
  title: {},
});
