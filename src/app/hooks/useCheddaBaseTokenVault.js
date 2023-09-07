import { ethers } from "ethers";
import CheddaBaseTokenVault from "../artifacts/CheddaBaseTokenVault.json";
import { ENVIRONMENT } from "../constants";
import { hooks } from "../connectors/metaMask";

export const useCheddaBaseTokenVault = () => {
  const localProvider = new ethers.providers.StaticJsonRpcProvider(
    ENVIRONMENT.jsonRpcUrl
  );
  const { useProvider } = hooks;
  const provider = useProvider();
  const signer = provider?.getSigner?.();
  const depositAsset = async (contract, amount, toAccount) => {
    return await contract.connect(signer).deposit(amount, toAccount);
  };

  const redeem = async (contract, amount, toAccount) => {
    return await contract.connect(signer).redeem(amount, toAccount, toAccount);
  };

  const addCollateral = async (contract, token, amount) => {
    return await contract.connect(signer).addCollateral(token, amount);
  };

  const getVaultStats = async (contract) => {
    return await contract.getVaultStats();
  };

  // Implement other functions in a similar manner

  const contractAt = (address) => {
    return new ethers.Contract(
      address,
      CheddaBaseTokenVault.abi,
      localProvider
    );
  };

  return {
    depositAsset,
    redeem,
    addCollateral,
    getVaultStats,
    contractAt,
  };
};
