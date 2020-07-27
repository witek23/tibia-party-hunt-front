import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/parties";

export function getParties() {
  return http.get(apiUrl);
}

export function getParty(id) {
  return http.get(apiUrl + "/" + id);
}

export async function getPartyByUser(userId) {
  const { data: parties } = await http.get(apiUrl);
  return (parties && parties.filter((p) => p.ownerId === userId)) || [];
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
  getParty: getParty,
  getParties: getParties,
  getPartyByUser: getPartyByUser,
  createParty: createParty,
};
