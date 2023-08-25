import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { usePriceOracle } from './usePriceOracle';
import { useCheddaBaseTokenVault } from './useCheddaBaseTokenVault';
import { ENVIRONMENT } from '../constants';

export const useVaultStats = () => {
  const [pools, setPools] = useState([]);
  const { getAssetPrice } = usePriceOracle();
  const { contractAt, getVaultStats } = useCheddaBaseTokenVault();
  const environment = ENVIRONMENT;

  useEffect(() => {
    const loadStats = async pool => {
      try {
        const contract = contractAt(pool.address);
        const price = await getAssetPrice(pool.asset.address);
        const stats = await getVaultStats(contract);
        const formattedTotal = ethers.utils.formatEther(stats.liquidity.mul(price).div(BigNumber.from(10).pow(18)));
        const formattedUtilization = ethers.utils.formatEther(stats.utilization.mul(100));
        const formattedApr = ethers.utils.formatEther(stats.depositApr.mul(1000));

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
        console.error('Error loading stats for pool:', pool, error);
        return pool;
      }
    };

    const loadVaultStats = async () => {
      const configPools = environment.config.pools;
      try {
        const updatedPools = await Promise.all(configPools.map(pool => loadStats(pool)));
        setPools(updatedPools);
      } catch (error) {
        console.error('Caught error:', error);
      }
    };

    loadVaultStats();
  }, []); // Include all dependencies here

  return {
    pools,
  };
};
