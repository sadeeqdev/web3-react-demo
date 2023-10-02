"use-client";

import React, { useState, useEffect, useCallback } from "react";
import CoinLogo from "../assets/logos/usdc-logo.png";
import Image from "next/image";

import { ethers } from "ethers";
import { ENVIRONMENT } from "../constants";
import { metamaskHooks } from "../connectors/metaMask";
import { LoadingModal } from "./LoadingModal";
import { formatCurrency } from "../utils/formatCurrency";
import { useCheddaSdk } from "../hooks/useCheddaSdk";

const pool = {
  asset: {
    logo: CoinLogo,
    name: "USDC",
  },
};

export const LendContainer = () => {
  const assetSymbol = "USDC";
  const vaultTokenSymbol = "Chedda";
  const assetName = "USD Coin";
  const [isDepositCheddaTab, setIsDepositCheddaTab] = useState(true);
  const [vaultContract, setVaultContract] = useState();
  const [isApproved, setIsApproved] = useState(false);
  const [utilizationRate, setUtilizationRate] = useState(0);
  const [depositApy, setDepositApy] = useState(0);
  const [rewardsApy, setRewardsApy] = useState(0);
  const [totalVaultAssets, setTotalVaultAssets] = useState(0);
  const [myAssetBalance, setMyAssetBalance] = useState(0);
  const [myVaultSharesBalance, setMyVaultSharesBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const switchDepositCheddaTab = (isDeposit) => {
    setIsDepositCheddaTab(isDeposit);
  };
  const { useAccounts } = metamaskHooks;
  const accounts = useAccounts();
  const { chedda, signer, token } = useCheddaSdk();
  const loadVaultStats = useCallback(async () => {
    try {
      const vault = chedda.vault(ENVIRONMENT.config.pools[0].address, signer);
      const stats = await vault.getVaultStats();

      setUtilizationRate(ethers.utils.formatEther(stats.utilization.mul(100)));
      setDepositApy(ethers.utils.formatEther(stats.depositApr.mul(1000))); // todo: Should be .mul(100)
      setRewardsApy(ethers.utils.formatEther(stats.rewardsApr.mul(100)));
      setTotalVaultAssets(ethers.utils.formatEther(stats.liquidity));

      if (accounts) {
        const token = chedda.token(
          ENVIRONMENT.config.pools[0].asset.address,
          signer
        );
        const assetBalance = await token.balanceOf(accounts?.[0]);
        setMyAssetBalance(ethers.utils.formatEther(assetBalance));
        const vaultSharesBalance = await vault.balanceOf(accounts?.[0]);
        setMyVaultSharesBalance(ethers.utils.formatEther(vaultSharesBalance));
      }

      vault.contract.on("Deposit", async (from, to, amount, shares, event) => {
        if (from.toLowerCase() == accounts?.[0]?.toLowerCase()) {
          loadVaultStats();
        }
      });

      vault.contract.on("Withdraw", async (from, to, amount, shares, event) => {
        if (from.toLowerCase() == accounts?.[0]?.toLowerCase()) {
          loadVaultStats();
        }
      });
    } catch (error) {
      console.error("Error loading vault stats:", error);
    }
  }, [
    accounts,
    setUtilizationRate,
    setDepositApy,
    setRewardsApy,
    setTotalVaultAssets,
    setMyAssetBalance,
    setMyVaultSharesBalance,
  ]);

  useEffect(() => {
    loadVaultStats();
  }, [accounts]);

  const fillMaxDeposit = async () => {
    setDepositAmount(myAssetBalance);
  };

  const approveAsset = async () => {
    if (!accounts) {
      alert("Please connect your wallet");
      return;
    }

    try {
      setIsLoading(true);
      const token = chedda.token(
        ENVIRONMENT.config.pools[0].asset.address,
        signer
      );
      const vault = chedda.vault(ENVIRONMENT.config.pools[0].address, signer);
      const totaltokenSupply = await token.totalSupply();
      await token.approve(vault.contract.address, totaltokenSupply);
      setIsApproved(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("An error occurred: " + error.message);
    }
  };

  const deposit = async () => {
    if (!accounts) {
      alert("Please connect your wallet");
      return;
    }

    try {
      setIsLoading(true);
      const vault = chedda.vault(ENVIRONMENT.config.pools[0].address, signer);
      const amount = ethers.utils.parseUnits(depositAmount ?? "0");
      setDepositAmount("");
      await vault.depositAsset(amount, accounts?.[0]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("An error occurred: " + error.message);
    }
  };

  const fillMaxWithdraw = () => {
    setWithdrawAmount(myVaultSharesBalance);
  };

  const redeemAssest = async () => {
    if (!accounts) {
      alert("Please connect your wallet");
      return;
    }

    try {
      setIsLoading(true);
      const vault = chedda.vault(ENVIRONMENT.config.pools[0].address, signer);
      const amount = ethers.utils.parseUnits(withdrawAmount ?? "0");
      setDepositAmount("");
      await vault.redeem(amount, accounts?.[0]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className="pb-5">
        <div className="w-11/12 md:w-[540px] h-auto mx-auto rounded-[30px] my-10 text-white card-bg">
          <div className="py-8 sm:h-20 border-b flex items-center justify-center space-x-3 border-gray-500">
            <div className="w-7 h-7">
              <Image src={pool.asset.logo} alt="Asset Logo" />
            </div>
            <div className="text-lg sm:text-xl">Lend {pool.asset.name}</div>
          </div>
          <div className="pt-3 pb-8 px-6 sm:px-8">
            <div className="h-auto w-full flex text-[#B5C2EB]">
              <div
                className={`text-sm py-3 w-full text-center hover:opacity-75 ${
                  isDepositCheddaTab ? "activeTab" : ""
                } hover:bg-transparent`}
              >
                <button
                  className="w-full font-semibold uppercase"
                  onClick={() => switchDepositCheddaTab(true)}
                >
                  Deposit
                </button>
              </div>
              <div
                className={`text-sm py-3 w-full text-center hover:opacity-75 ${
                  !isDepositCheddaTab ? "activeTab" : ""
                } hover:bg-transparent`}
              >
                <button
                  className="w-full font-semibold uppercase"
                  onClick={() => switchDepositCheddaTab(false)}
                >
                  Withdraw
                </button>
              </div>
            </div>
            {isDepositCheddaTab ? (
              <div>
                <div className="mt-6 flex justify-between opacity-50 text-lg font-semibold">
                  <div>Deposit {assetName}</div>
                </div>
                <div className="mt-4 flex justify-between text-lavendar-purple text-xs">
                  <div className="opacity-50">Enter amount to deposit</div>
                  <div className="font-semibold">
                    Balance: {formatCurrency(parseFloat(myAssetBalance))}{" "}
                    {assetSymbol}
                  </div>
                </div>
                <div className="relative">
                  <input
                    value={depositAmount}
                    type="number"
                    placeholder="Amount"
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="bg-black w-full rounded mt-2 h-10 sm:h-14 px-4 font-semibold text-white text-xs sm:text-sm focus:outline-none focus:shadow-outline"
                  />
                  <div className="absolute top-0 right-0 mt-3 sm:mt-4 mr-1 sm:mr-2">
                    <button
                      onClick={fillMaxDeposit}
                      className="w-auto px-3 sm:px-4 h-[31px] sm:h-[41px] bg-[#20173F] rounded flex justify-center items-center hover:bg-[#4e26e0] text-xs sm:text-sm font-semibold text-[#ffffff50] hover:text-white uppercase"
                    >
                      Max
                    </button>
                  </div>
                </div>
                <button
                  onClick={approveAsset}
                  className={`h-10 sm:h-12 primary-button-bg w-full mt-4 sm:mt-4 rounded-lg font-bold uppercase text-lg hover:opacity-90 ${
                    !isApproved ? "visible" : "hidden"
                  }`}
                >
                  Approve {assetSymbol}
                </button>
                <button
                  onClick={deposit}
                  className={`h-10 sm:h-12 primary-button-bg w-full mt-4 sm:mt-4 rounded-lg font-bold uppercase text-lg hover:opacity-90 ${
                    isApproved ? "visible" : "hidden"
                  }`}
                >
                  Deposit {assetSymbol}
                </button>
              </div>
            ) : (
              <div>
                <div className="mt-6 flex justify-between opacity-50 text-lg font-semibold">
                  <div>Withdraw {assetName}</div>
                </div>
                <div className="mt-4 flex justify-between text-lavendar-purple text-xs">
                  <div className="opacity-50">Enter amount to withdraw</div>
                  <div className="font-semibold">
                    Balance: {formatCurrency(parseFloat(myVaultSharesBalance))}{" "}
                    {assetSymbol}
                  </div>
                </div>
                <div className="relative">
                  <input
                    value={withdrawAmount}
                    type="number"
                    placeholder="Amount"
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="bg-black w-full rounded mt-2 h-10 sm:h-14 px-4 font-semibold text-white text-xs sm:text-sm focus:outline-none focus:shadow-outline"
                  />
                  <div className="absolute top-0 right-0 mt-3 sm:mt-4 mr-1 sm:mr-2">
                    <button
                      onClick={fillMaxWithdraw}
                      className="w-auto px-3 sm:px-4 h-[31px] sm:h-[41px] bg-[#20173F] rounded flex justify-center items-center hover:bg-[#4e26e0] text-xs sm:text-sm font-semibold text-[#ffffff50] hover:text-white uppercase"
                    >
                      Max
                    </button>
                  </div>
                </div>
                <button
                  onClick={redeemAssest}
                  className={
                    "h-10 sm:h-12 secondary-button w-full mt-4 sm:mt-4 rounded-lg font-bold uppercase text-lg hover:opacity-90"
                  }
                >
                  Withdraw {assetSymbol}
                </button>
              </div>
            )}
            <div className="w-full h-auto flex justify-between mt-4 rounded-[20px] border-[1px] border-[#bab9bb] text-white px-5 py-4 sm:px-8 sm:py-6">
              <div className="flex flex-col gap-y-4 font-bold text-xs sm:text-sm text-[#999898]">
                <div>My Deposits</div>
                <div>Available Liquidity</div>
                <div>Utilization</div>
                <div>Deposit APY</div>
                <div>Rewards APY</div>
              </div>
              <div className="flex flex-col gap-y-4 font-bold text-xs sm:text-sm">
                <div>
                  {formatCurrency(parseFloat(myVaultSharesBalance))}{" "}
                  {vaultTokenSymbol}
                </div>
                <div>
                  {formatCurrency(parseFloat(totalVaultAssets))} {assetSymbol}
                </div>
                <div>{parseFloat(utilizationRate)?.toFixed(3)}%</div>
                <div>{parseFloat(depositApy)?.toFixed(3)}%</div>
                <div>{parseFloat(rewardsApy)?.toFixed(3)}%%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
