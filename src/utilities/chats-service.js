import * as chatsApi from "./chats-api";

export function getAllChats() {
  const allChats = chatsApi.getAllChats();
  return allChats;
}

export function createNewChat(members) {
  console.log("Members in service: ", members);
  const response = chatsApi.createNewChat(members);
  return response;
}

export function clearUnreadMessages(chat) {
  const response = chatsApi.clearUnreadMessages(chat);
  return response;
}
