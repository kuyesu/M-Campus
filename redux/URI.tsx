import { Platform } from "react-native";

let URI = "";

if (Platform.OS === "ios") {
  URI = "https://mi-server.vercel.app/api/v1";
  // URI = 'https://threads-clone-ten.vercel.app/api/v1';
} else {
  URI = "https://mi-server.vercel.app/api/v1";
  // URI = 'https://threads-clone-ten.vercel.app/api/v1';
}

export { URI };
