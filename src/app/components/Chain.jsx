import { CHAINS } from "../chains";

export function Chain({ chainId }) {
  if (chainId === undefined || !CHAINS) return null;

  const name = chainId && CHAINS[chainId] ? CHAINS[chainId].name : undefined;

  if (name) {
    return (
      <div>
        Chain:{" "}
        <b>
          {name} ({chainId})
        </b>
      </div>
    );
  }

  return (
    <div>
      Chain Id: <b>{chainId}</b>
    </div>
  );
}
