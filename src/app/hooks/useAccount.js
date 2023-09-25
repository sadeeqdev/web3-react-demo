import { useWeb3React } from "@web3-react/core";

export const useAccount = () => {
  const { account, provider, chainId } = useWeb3React();
  const signer = provider?.getSigner();

  return {
    account,
    provider,
    signer,
    chainId,
  };
};
