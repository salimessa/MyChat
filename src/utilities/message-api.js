import sendRequest from "./send-request";
const BASE_URL = "/api/messages";

export function getAllMessages(chatId) {
  return sendRequest(`${BASE_URL}/get-all-messages/${chatId}`, "GET");
}

export function createNewMessage(message) {
  return sendRequest(`${BASE_URL}/new-message`, "POST", message);
}
