import React from 'react';

export const ConnectButton = ({ connectWallet }) => {
  return (
    <button
      onClick={connectWallet}
      className="h-9 w-32 sm:h-11 sm:w-40 px-2 flex rounded-lg justify-center font-bold text-xs sm:text-lg account_button items-center hover:opacity-90"
    >
      Connect wallet
    </button>
  );
};
