import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { MAINNET_CHAINS } from "../chains";

const [mainnet, ...optionalChains] = MAINNET_CHAINS
  ? Object.keys(MAINNET_CHAINS).map(Number)
  : [];

export const [walletConnectV2, walletConnectHooks] = initializeConnector(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        projectId: process.env.walletConnectProjectId,
        chains: [mainnet],
        optionalChains,
        showQrModal: true,
      },
    })
);
