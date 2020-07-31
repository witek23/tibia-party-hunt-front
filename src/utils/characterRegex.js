const sessionPattern = /(Session\sdata:\sFrom\s(\d{4}-\d{2}-\d{2}),\s(\d{2}:\d{2}:\d{2})\sto\s(\d{4}-\d{2}-\d{2}),\s(\d{2}:\d{2}:\d{2}))?\s?Session:\s(\d{2}:\d{2})h\s?Loot\sType:\s([a-zA-Z]+)\s?Loot:\s([0-9,?]+)\sSupplies:\s([0-9,?]+)\s?Balance:\s(-?[0-9,?]+)\s?(.*)/;
const characterPattern = /([a-zA-Z\s?]+)(?:\s\(Leader\))?\s+\\?t?Loot:\s([0-9,?]+)\s+\\?t?Supplies:\s([0-9,?]+)\s+\\?t?Balance:\s([-?0-9,?]+)\s+\\?t?Damage:\s([0-9,?]+)\s+\\?t?Healing:\s([0-9,?]+)\s?/;
export const errorMessage = "Wrong pattern.";

export function getDataFromRegex(input) {
  const session = input.match(sessionPattern);

  if (!session) return errorMessage;
  const date =
    session[2] === undefined
      ? new Date()
      : new Date(session[2] + " " + session[3]);
  const sessionData = {
    dateStart: date,
    duration: session[6],
    lootType: session[7],
    loot: session[8].replaceAll(",", "") * 1,
    supplies: session[9].replaceAll(",", "") * 1,
    balance: session[10].replaceAll(",", "") * 1,
  };

  let charactersData = session[11];
  let wrongPattern = false;
  const characters = [];
  while (true) {
    const match = charactersData.match(characterPattern);
    if (match) {
      const char = {
        name: match[1].trim(),
        loot: match[2].replaceAll(",", "") * 1,
        supplies: match[3].replaceAll(",", "") * 1,
        balance: match[4].replaceAll(",", "") * 1,
        damage: match[5].replaceAll(",", "") * 1,
        healing: match[6].replaceAll(",", "") * 1,
      };
      characters.push(char);
      charactersData = charactersData.substring(match[0].length);
    } else {
      if (!match && charactersData.length > 0) {
        wrongPattern = true;
        break;
      } else break;
    }
  }

  if (wrongPattern) return errorMessage;

  return { sessionData: sessionData, characterData: characters };
}
