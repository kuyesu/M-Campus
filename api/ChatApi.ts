import axios from "axios";

const BASE_URL = "http://192.168.2.105:3000/api/read"; //Replace with System PC IP address

async function sendQuery(query) {
  if (!query) return;
  // setResult("");
  // setLoading(true);
  try {
    const result = await fetch("http://192.168.2.105:3000/api/read", {
      method: "POST",
      body: JSON.stringify(query),
    });
    const json = await result.json();
    console.log("json:", json);
    // setResult(json.data);
    // setLoading(false);
  } catch (err) {
    console.log("err:", err);
    // setLoading(false);
  }
}

export default {
  sendQuery,
};
