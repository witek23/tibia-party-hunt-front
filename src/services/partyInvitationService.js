import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/partyInvitations";

export function getPartyInivitations() {
  return http.get(apiUrl);
}

export function createPartyInvitation(inv) {
  return http.post(apiUrl, {
    invOwner: inv.invOwner,
    partyId: inv.partyId,
    invStatus: inv.invStatus,
    invitedCharId: inv.invitedCharId,
  });
}

export function updateStatus(id, status) {
  return http.put(apiUrl + "/" + id, {
    invStatus: status,
  });
}

export default {
  getPartyInivitations: getPartyInivitations,
  createPartyInvitation: createPartyInvitation,
  updateStatus: updateStatus,
};
