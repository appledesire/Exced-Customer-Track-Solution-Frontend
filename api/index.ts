import { CartData, IdentifyData, ScreenInfo } from "@/lib/types";

// Function to post identify data to the server
export function postIdentifyData(url: string, data: IdentifyData) {
  console.log("Posting identify data to:", url, "Data:", data);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.text();
    })
    .then((text) => console.log("Success:", text))
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to post Cart Information
export function postCartInfoData(url: string, data: ScreenInfo | CartData) {
  console.log("Posting cart data to:", url, "Data:", data);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.text();
    })
    .then((text) => console.log("Success:", text))
    .catch((error) => {
      console.error("Error:", error);
    });
}
