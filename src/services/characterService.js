import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/characters";

export function getCharacters() {
  return http.get(apiUrl);
}

export function getCharacter(id) {
  return http.get(apiUrl + "/" + id);
}

export async function getCharactersByUser(userId) {
  const { data: chars } = await http.get(apiUrl);
  return chars.filter((c) => c.ownerId === userId);
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
  getCharactersByUser,
  getCharacters,
  getCharacter,
  addCharacter,
};
