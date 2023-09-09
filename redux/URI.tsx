import { Platform } from "react-native";

let URI = "";

if (Platform.OS === "ios") {
  URI = "http://localhost:8000/api/v1";
  // URI = 'https://threads-clone-ten.vercel.app/api/v1';
} else {
  URI = "http://192.168.137.114:8000/api/v1";
  // URI = 'https://threads-clone-ten.vercel.app/api/v1';
}

export { URI };
