import http from "./httpService";

const apiUrl = "/spawns";

export function getSpawns() {
  return http.get(apiUrl);
}

export function getSpawn(id) {
  return http.get(apiUrl + "/" + id);
}

export function addSpawn(spawn) {
  return http.post(apiUrl, {
    name: spawn.name,
    level: spawn.level,
  });
}

export default {
  getSpawns: getSpawns,
  getSpawn: getSpawn,
  addSpawn: addSpawn,
};
