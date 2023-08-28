import { initializeConnector } from "@web3-react/core";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

import { MAINNET_CHAINS } from "../chains";

const [mainnet, ...optionalChains] = Object.keys(MAINNET_CHAINS).map(Number);

export const [walletConnectV2, hooks] = initializeConnector(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: "chedda-market",
        chains: [1, 137, 56],
        optionalChains: [137, 56],
        showQrModal: true,
      },
    })
);
