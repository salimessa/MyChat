import sendRequest from "./send-request";
const BASE_URL = "/api/users";

export function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function getCurrentUser() {
  return sendRequest(`${BASE_URL}/get-current-user`, "GET");
}

export function getAllUsers() {
  return sendRequest(`${BASE_URL}/get-all-users`, "GET");
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
