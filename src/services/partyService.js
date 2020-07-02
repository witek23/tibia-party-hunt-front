import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/parties";

export function getParties() {
  return http.get(apiUrl);
}
