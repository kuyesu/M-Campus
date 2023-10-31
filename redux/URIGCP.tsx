import { Platform } from "react-native";

let URIGCP = "";

if (Platform.OS === "ios") {
  URIGCP = "https://mi-server-gpt.uc.r.appspot.com/api/v1";
  // URI = 'https://threads-clone-ten.vercel.app/api/v1';
} else {
  URIGCP = "https://mi-server-gpt.uc.r.appspot.com/api/v1";
  // URI = 'https://threads-clone-ten.vercel.app/api/v1';
}

export { URIGCP };
