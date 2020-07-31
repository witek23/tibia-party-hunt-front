import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/spawns";

export function getSpawns() {
  return http.get(apiUrl);
}

export function getSpawn(id) {
  return http.get(apiUrl + "/" + id);
}

export default {
  getSpawns: getSpawns,
  getSpawn: getSpawn,
};
