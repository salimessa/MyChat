import * as messagesApi from "./message-api";

export function getAllMessages(chatId) {
  const allMessages = messagesApi.getAllMessages(chatId);
  return allMessages;
}

export function createNewMessage(message) {
  const response = messagesApi.createNewMessage(message);
  return response;
}
