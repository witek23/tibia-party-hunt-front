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

export function updateParty(party) {
  return http.put(apiUrl + "/" + party._id, {
    members: [...party.members],
    name: party.name,
    ownerId: party.ownerId,
    partyLeaderId: party.partyLeaderId,
  });
}

export function createParty(party) {
  return http.post(apiUrl, {
    name: party.name,
    ownerId: party.ownerId,
    partyLeaderId: party.partyLeaderId,
    members: party.members,
  });
}

export default {
  getParty: getParty,
  getParties: getParties,
  getPartyByUser: getPartyByUser,
  updateParty: updateParty,
  createParty: createParty,
};
