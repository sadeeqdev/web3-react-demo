import { getName } from "../utils/getName";
import { Accounts } from "./Accounts";
import { Chain } from "./Chain";
import { Status } from "./Status";
import { useEffect, useState } from "react";
import { MAINNET_CHAINS } from "../chains";
import { ConnectWithSelect } from "./ConnectWithSelect";
import {
  walletConnectHooks,
  walletConnectV2,
} from "../connectors/walletConnectV2";

const CHAIN_IDS = MAINNET_CHAINS ? Object.keys(MAINNET_CHAINS).map(Number) : [];

const [mainnet, ...optionalChains] = MAINNET_CHAINS
  ? Object.keys(MAINNET_CHAINS).map(Number)
  : [];

function Card({
  connector,
  activeChainId,
  chainIds,
  isActivating,
  isActive,
  error,
  setError,
  ENSNames,
  accounts,
  provider,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "20rem",
        padding: "1rem",
        margin: "1rem",
        overflow: "auto",
        border: "1px solid",
        borderRadius: "1rem",
      }}
    >
      <b>{getName(connector)}</b>
      <div style={{ marginBottom: "1rem" }}>
        <Status isActivating={isActivating} isActive={isActive} error={error} />
      </div>
      <Chain chainId={activeChainId} />
      <div style={{ marginBottom: "1rem" }}>
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <ConnectWithSelect
        connector={connector}
        activeChainId={activeChainId}
        chainIds={chainIds}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />
    </div>
  );
}

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = walletConnectHooks;

export function WalletConnectV2Card() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);
  const [error, setError] = useState(undefined);

  // log URI when available
  useEffect(() => {
    walletConnectV2.events.on("URI_AVAILABLE", (uri) => {
      console.log(`uri: ${uri}`);
    });
    console.log("mainnet", mainnet);
    console.log("opt chains", optionalChains);
  }, []);

  // attempt to connect eagerly on mount
  useEffect(() => {
    walletConnectV2.connectEagerly().catch((error) => {
      console.debug("Failed to connect eagerly to walletconnect", error);
    });
  }, []);

  return (
    <Card
      connector={walletConnectV2}
      activeChainId={chainId}
      chainIds={CHAIN_IDS}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
  );
}
