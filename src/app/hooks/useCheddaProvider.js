import { Chedda } from "chedda-sdk";
import { ENVIRONMENT } from "../constants";

export const useCheddaProvider = () => {
  const chedda = new Chedda(ENVIRONMENT.webSocketUrl);

  return chedda;
};
