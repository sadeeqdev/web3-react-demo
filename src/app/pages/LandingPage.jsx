"use client";

import React from "react";
import { AppPageTitle } from "../components/PageTitle";
import { useVaultStats } from "../hooks/useVaultStats";

export const LendAssets = () => {
  const { pools } = useVaultStats();

  return (
    <div className="bg-gray-900 text-white">
      <AppPageTitle
        heading="Lend Assets"
        subHeading="Deposit and Withdraw tokens."
      />
      <div className="w-11/12 xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto mt-8 gap-3 flex">
        <div className="w-full lg:w-48 h-28 rounded-lg lg:rounded flex-col gap-2 justify-center items-center leftbox_bg">
          <div className="font-semibold text-left text-sm">
            Total market size
          </div>
          <div className="font-bold text-2xl">$500,000</div>
        </div>
        <div className="w-full lg:w-48 h-28 rounded-lg lg:rounded flex-col gap-2 justify-center items-center rightbox_bg">
          <div className="font-semibold text-left text-sm">Total available</div>
          <div className="font-bold text-2xl">$400,000</div>
        </div>
      </div>
      <div className="w-11/12 xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto my-14">
        <div className="font-semibold mb-4 text-lg sm:text-2xl">Markets</div>
        <div className="w-full mt-8 mb-4 hidden sm:block">
          <div className="grid grid-cols-12 text-xs font-semibold text-white px-8">
            <div className="col-span-2">Asset</div>
            <div className="col-span-4">Collateral</div>
            <div className="col-span-2">Deposit APY</div>
            <div className="col-span-2">Utilization</div>
            <div className="col-span-2">Liquidity</div>
          </div>
        </div>
        {pools.map((pool) => (
          <div
            key={pool.address}
            className="w-full h-20 rounded-lg mt-2 sm:grid grid-cols-12 px-8 grid-row-bg text-white hover:opacity-80 hover:cursor-pointer hidden"
          >
            <div className="flex flex-col justify-center text-sm col-span-2 space-y-1 mt-2">
              <div className="ml-1">
                <img
                  src={pool.asset.logo}
                  alt="Asset Logo"
                  className="asset-avatar round-image"
                />
              </div>
              <div className="font-bold">{pool.asset.symbol}</div>
            </div>
            <div className="flex flex-col justify-center text-sm col-span-4 space-y-2 mt-2">
              <div className="flex ml-1">
                {pool.collateral.map((collateral, i) => (
                  <div key={i} className="my-2 logo-cascade round-image">
                    <img
                      src={collateral.logo}
                      alt="Collateral Logo"
                      className="cascade-img h-8 w-8 round-image"
                    />
                  </div>
                ))}
              </div>
              <div className="font-bold flex">
                {pool.collateral.map((collateral, i) => (
                  <React.Fragment key={i}>
                    {collateral.symbol}
                    {i !== pool.collateral.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </div>
            </div>
            {pool.stats && (
              <>
                <div className="text-sm flex items-center font-semibold col-span-2">
                  {pool.stats.apr.toFixed(2)}%
                </div>
                <div className="text-sm flex items-center font-semibold col-span-2">
                  {pool.stats.utilization.toFixed(2)}
                </div>
                <div className="text-sm flex items-center font-semibold col-span-2">
                  {pool.stats.total.toFixed(2)}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
