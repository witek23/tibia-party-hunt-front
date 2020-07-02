import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/users";

export function register(user) {
  return http.post(apiUrl, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}

export function getUser(id) {
  return http.get(apiUrl + "/" + id);
}
