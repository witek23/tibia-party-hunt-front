import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/characters";

export function getCharacters() {
  return http.get(apiUrl);
}

export function addCharacter(character) {
  return http.post(apiUrl, {
    name: character.name,
    world: character.world,
    vocation: character.vocation,
    ownerId: character.ownerId,
  });
}

export default {
  getCharacters,
  addCharacter,
};
