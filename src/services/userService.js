import http from "./httpService";

const apiUrl = "/users";

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

export default {
  getUser: getUser,
};
