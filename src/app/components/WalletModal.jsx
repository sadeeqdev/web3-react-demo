import React, { useCallback, useState } from "react";
import Image from "next/image";
import MetamaskLogo from "../assets/logos/metamask-logo.svg";
import WalletConnectLogo from "../assets/logos/walletconnect-logo.png";
import { GnosisSafe } from "@web3-react/gnosis-safe";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { metaMask } from "../connectors/metaMask";
import { walletConnectV2 } from "../connectors/WalletConnectV2";
import { getAddChainParameters } from "../chains";
import { WalletConnectV2Card } from "./WalletConnectCard";

export const WalletModal = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");

  const switchChain = useCallback(
    async (desiredChainId, connector) => {
      console.log("Meta clicked");
      try {
        if (desiredChainId === -1 || connector instanceof GnosisSafe) {
          await connector.activate();
        } else if (connector instanceof WalletConnect) {
          await connector.activate(1);
        } else {
          await connector.activate(getAddChainParameters(desiredChainId));
        }

        setError(undefined);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    },
    [setError]
  );

  const connectWallet = useCallback((connector, desiredChainId) => {
    connector instanceof GnosisSafe
      ? void connector
          .activate()
          .then(() => setError(undefined))
          .catch(setError)
      : switchChain(desiredChainId, connector);

    onClose();
  });

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="w-96 z-10 bg-white rounded-lg pt-3 p-6">
        <div className="flex justify-end text-sm text-red-600">
          <button onClick={onClose}>Close </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Select wallet:</h2>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => connectWallet(metaMask, 80001)}
            className={`px-4 py-2 h-20 text-2xl flex justify-center items-center text-white bg-gray-300 rounded focus:outline-none hover:bg-gray-200`}
          >
            <Image src={MetamaskLogo} alt="Metamask Logo" className="w-3/5" />
          </button>
          <button
            onClick={() => connectWallet(walletConnectV2, 1)}
            className={`px-4 py-2 h-20 text-2xl flex justify-center items-center text-white bg-gray-300 rounded focus:outline-none hover:bg-gray-200`}
          >
            <Image
              src={WalletConnectLogo}
              alt="walletconnect Logo"
              className="w-3/5"
            />
          </button>
          <WalletConnectV2Card />
        </div>
      </div>
    </div>
  );
};
