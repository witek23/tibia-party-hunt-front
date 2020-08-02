export function convertGoldValue(value) {
  return value >= 100000000
    ? (value / 100000000).toFixed(3) + "kkk"
    : value >= 1000000
    ? (value / 1000000).toFixed(2) + "kk"
    : value >= 1000
    ? (value / 1000).toFixed(1) + "k"
    : value + "gp";
}
