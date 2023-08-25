import { useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import ERC20 from '../artifacts/ERC20.json';
import MarketNFT from '../artifacts/MarketNFT.json';
import { ENVIRONMENT } from '../constants';
import { useAccount } from './useAccount';

export const useToken = () => {
  const provider = new ethers.providers.StaticJsonRpcProvider(ENVIRONMENT.jsonRpcUrl);
  const { signer } = useAccount();
  const name = async contract => {
    return await contract.name();
  };

  const symbol = async contract => {
    return await contract.symbol();
  };

  const approve = async (contract, spender, amount) => {
    if (contract.isNFT) {
      await contract.connect(signer).setApprovalForAll(spender, amount);
    } else {
      await contract.connect(signer).approve(spender, amount);
    }
  };

  const allowance = async (contract, account, spender) => {
    if (contract.isNFT) {
      return await contract.isApprovedForAll(account, spender);
    } else {
      return await contract.allowance(account, spender);
    }
  };

  const balanceOf = async (contract, account) => {
    return await contract.balanceOf(account);
  };

  const ownedTokens = async (contract, account) => {
    return (await contract.ownedTokens(account)).map(t => t.toString());
  };

  const transfer = async (contract, to, amount) => {
    await contract.connect(signer).transfer(to, amount);
  };

  const totalSupply = async contract => {
    return await contract.totalSupply();
  };

  const tokenContractAt = (address, isNFT = false) => {
    let abi;
    if (isNFT) {
      abi = MarketNFT.abi;
    } else {
      abi = ERC20.abi;
    }
    return new ethers.Contract(address, abi, provider);
  };

  return {
    name,
    symbol,
    approve,
    allowance,
    balanceOf,
    ownedTokens,
    transfer,
    totalSupply,
    tokenContractAt,
  };
};
