"use client";

import { Web3ReactProvider } from "@web3-react/core";
import { metaMask, metamaskHooks } from "../connectors/metaMask";
import {
  walletConnectV2,
  walletConnectHooks,
} from "../connectors/WalletConnectV2";

export function AppProviders({ children }) {
  const connectors = [
    [metaMask, metamaskHooks],
    [walletConnectV2, walletConnectHooks],
  ];
  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
}
