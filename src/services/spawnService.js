import http from "./httpService";

const apiUrl = "/spawns";

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
