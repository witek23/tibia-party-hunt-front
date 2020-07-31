import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/hunts";

export function getHunts() {
  return http.get(apiUrl);
}

export function getHuntById(id) {
  return http.get(apiUrl + "/" + id);
}

export async function getHuntsByParty(partyId) {
  try {
    const { data: hunts } = await http.get(apiUrl);
    return hunts.filter((h) => h.partyId === partyId);
  } catch (ex) {
    console.log("EX SERWIS", ex);
  }
}

export function addHunt(hunt) {
  return http.post(apiUrl, {
    huntDate: hunt.huntDate,
    huntDuration: hunt.huntDuration,
    members: hunt.members,
    lootType: hunt.lootType,
    loot: hunt.loot,
    supplies: hunt.supplies,
    balance: hunt.balance,
    spawnId: hunt.spawnId,
    partyId: hunt.partyId,
    paymentStatus: hunt.paymentStatus,
  });
}

export default {
  getHunts: getHunts,
  getHuntById: getHuntById,
  getHuntsByParty: getHuntsByParty,
  addHunt: addHunt,
};
