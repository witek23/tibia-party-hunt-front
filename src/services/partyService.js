import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/parties";

export function getParties() {
  return http.get(apiUrl);
}

export function createParty(party) {
  return http.post(apiUrl, {
    name: party.name,
    ownerId: party.ownerId,
    partyLeaderId: party.partyLeaderId,
    members: party.members,
    hunts: party.hunts,
  });
}

export default {
  getParties: getParties,
  createParty: createParty,
};
