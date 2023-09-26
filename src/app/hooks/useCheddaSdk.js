import { useCheddaProvider } from "./useCheddaProvider";
import { metamaskHooks } from "../connectors/metaMask";

export const useCheddaSdk = () => {
  const { useProvider } = metamaskHooks;

  const chedda = useCheddaProvider();
  const provider = useProvider();
  const signer = provider?.getSigner?.();

  const vault = chedda.vault(signer);
  const token = chedda.token(signer);
  const priceOracle = chedda.priceOracle();

  return { vault, token, priceOracle };
};
