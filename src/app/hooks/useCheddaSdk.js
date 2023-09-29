import { Chedda } from "chedda-sdk";
import { ENVIRONMENT } from "../constants";
import { metamaskHooks } from "../connectors/metaMask";

export const useCheddaSdk = () => {
  const { useProvider } = metamaskHooks;

  const chedda = new Chedda(ENVIRONMENT.webSocketUrl);
  const provider = useProvider();
  const signer = provider?.getSigner?.();
  const priceOracle = chedda.priceOracle();

  return { chedda, signer, priceOracle };
};
