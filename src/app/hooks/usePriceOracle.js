import React, { useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
import MultiAssetPriceOracle from '../artifacts/MultiAssetPriceOracle.json';
import { ENVIRONMENT } from '../constants';
import useStaticJsonRPC from './useStaticJsonRPC';

export const usePriceOracle = () => {
  const environment = ENVIRONMENT;
  const localProvider = useStaticJsonRPC([ENVIRONMENT.jsonRpcUrl]);

  const oracleContract = useMemo(() => {
    const priceFeedAddress = environment.config.contracts.PriceFeed;
    const priceFeedAbi = MultiAssetPriceOracle.abi;
    return new ethers.Contract(priceFeedAddress, priceFeedAbi, localProvider);
  }, [environment.config.contracts.PriceFeed, localProvider]);

  async function getAssetPrice(address) {
    if (!oracleContract) return null;

    const price = await oracleContract.readPrice(address, 1);
    return price;
  }

  return {
    getAssetPrice,
  };
};
