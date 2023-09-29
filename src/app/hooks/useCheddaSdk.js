import { Chedda } from "chedda-sdk";
import { ENVIRONMENT } from "../constants";
import { metamaskHooks } from "../connectors/metaMask";

export const useCheddaSdk = () => {
  const { useProvider } = metamaskHooks;

  const chedda = new Chedda(ENVIRONMENT.webSocketUrl);
  const provider = useProvider();
  const signer = provider?.getSigner?.();

  const vault = chedda.vault(signer);
  const token = chedda.token(signer);
  const priceOracle = chedda.priceOracle();

  return { vault, token, priceOracle };
};
