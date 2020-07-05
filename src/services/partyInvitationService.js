import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/partyInvitations";

export function getPartyInivitations() {
  return http.get(apiUrl);
}
