import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { ENVIRONMENT } from "../constants";
import { useCheddaProvider } from "./useCheddaProvider";

import MultiAssetPriceOracle from "../artifacts/MultiAssetPriceOracle.json";
import CheddaBaseTokenVault from "../artifacts/CheddaBaseTokenVault.json";

export const useVaultStats = () => {
  const [pools, setPools] = useState([]);
  const chedda = useCheddaProvider();
  const vault = chedda.vault();
  const priceOracle = chedda.priceOracle();
  const environment = ENVIRONMENT;
  useEffect(() => {
    const loadStats = async (pool) => {
      try {
        const contract = vault.contractAt(
          pool.address,
          CheddaBaseTokenVault.abi
        );
        console.log("contract", contract);
        const price = await priceOracle.getAssetPrice(
          pool.asset.address,
          MultiAssetPriceOracle,
          pool.asset.address
        );
        console.log("price", price);
        const stats = await vault.getVaultStats(contract);
        console.log("stats", stats);
        const formattedTotal = ethers.utils.formatEther(
          stats.liquidity.mul(price).div(BigNumber.from(10).pow(18))
        );
        console.log("formattedTotal", formattedTotal);
        const formattedUtilization = ethers.utils.formatEther(
          stats.utilization.mul(100)
        );
        console.log("formattedUtilization", formattedUtilization);
        const formattedApr = ethers.utils.formatEther(
          stats.depositApr.mul(1000)
        );
        console.log("formattedApr", formattedApr);
        return {
          ...pool,
          stats: {
            supplied: BigNumber.from(1010101),
            total: formattedTotal,
            utilization: formattedUtilization,
            apr: formattedApr,
          },
        };
      } catch (error) {
        console.error("Error loading stats for pool:", pool, error);
        return pool;
      }
    };

    const loadVaultStats = async () => {
      const configPools = environment.config.pools;
      try {
        const updatedPools = await Promise.all(
          configPools.map((pool) => loadStats(pool))
        );
        setPools(updatedPools);
      } catch (error) {
        console.error("Caught error:", error);
      }
    };

    loadVaultStats();
  }, []);

  return {
    pools,
  };
};
