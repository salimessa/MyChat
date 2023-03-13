import sendRequest from "./send-request";
const BASE_URL = "/api/chats";

export function getAllChats() {
  return sendRequest(`${BASE_URL}/get-all-chats`, "GET");
}

export function createNewChat(members) {
  return sendRequest(`${BASE_URL}/create-new-chat`, "POST", { members });
}

export function clearUnreadMessages(chat) {
  return sendRequest(`${BASE_URL}/clear-unread-messages`, "POST", {
    chat: chat,
  });
}
