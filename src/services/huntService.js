import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/hunts";

export function getHunts() {
  return http.get(apiUrl);
}

export function getHuntById(id) {
  return http.get(apiUrl + "/" + id);
}

export default {
  getHunts: getHunts,
  getHuntById: getHuntById,
};
