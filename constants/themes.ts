import { Dimensions, Platform } from "react-native";
import {
  ICommonTheme,
  ThemeAssets,
  ThemeFonts,
  ThemeIcons,
  ThemeLineHeights,
  ThemeWeights,
} from "./types";

const { width, height } = Dimensions.get("window");

// Naming source: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
export const WEIGHTS: ThemeWeights = {
  text: "normal",
  h1: Platform.OS === "ios" ? "700" : "normal",
  h2: Platform.OS === "ios" ? "700" : "normal",
  h3: Platform.OS === "ios" ? "700" : "normal",
  h4: Platform.OS === "ios" ? "700" : "normal",
  h5: Platform.OS === "ios" ? "600" : "normal",
  p: "normal",

  thin: Platform.OS === "ios" ? "100" : "normal",
  extralight: Platform.OS === "ios" ? "200" : "normal",
  light: Platform.OS === "ios" ? "300" : "normal",
  normal: Platform.OS === "ios" ? "400" : "normal",
  medium: Platform.OS === "ios" ? "500" : "normal",
  semibold: Platform.OS === "ios" ? "600" : "normal",
  bold: Platform.OS === "ios" ? "700" : "normal",
  extrabold: Platform.OS === "ios" ? "800" : "normal",
  black: Platform.OS === "ios" ? "900" : "normal",
};

export const FONTS: ThemeFonts = {
  // based on font size
  text: "OpenSans-Regular",
  h1: "OpenSans-Bold",
  h2: "OpenSans-Bold",
  h3: "OpenSans-Bold",
  h4: "OpenSans-Bold",
  h5: "OpenSans-SemiBold",
  p: "OpenSans-Regular",

  // based on fontWeight
  thin: "OpenSans-Light",
  extralight: "OpenSans-Light",
  light: "OpenSans-Light",
  normal: "OpenSans-Regular",
  medium: "OpenSans-SemiBold",
  semibold: "OpenSans-SemiBold",
  bold: "OpenSans-Bold",
  extrabold: "OpenSans-ExtraBold",
  black: "OpenSans-ExtraBold",
};

export const LINE_HEIGHTS: ThemeLineHeights = {
  // font lineHeight
  text: 22,
  h1: 60,
  h2: 55,
  h3: 43,
  h4: 33,
  h5: 24,
  p: 22,
};

const COLORS = {
  primary: "#312651",
  secondary: "#444262",
  tertiary: "#FF7754",
  mainBackground: "#f0f3f8",
  gray: "#83829A",
  gray2: "#C1C0C8",
  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
  //
  borderColor: "#041633",
  paragraph: "#717680",
  btnBackground: "#86e63b",
  mainHeadText: "#031435",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
