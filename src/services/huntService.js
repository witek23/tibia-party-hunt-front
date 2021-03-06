import http from "./httpService";

const apiUrl = "/hunts";

export function getHunts() {
  return http.get(apiUrl);
}

export function getHuntById(id) {
  return http.get(apiUrl + "/" + id);
}

export async function getHuntsByParty(partyId) {
  try {
    const { data: hunts } = await http.get(apiUrl);
    return hunts.filter((h) => h.partyId === partyId) || [];
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

export function updatePaymentStatus(hunt) {
  return http.put(apiUrl + "/" + hunt._id, {
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
  updatePaymentStatus: updatePaymentStatus,
};
