import React, { useState } from "react";
import MetamaskLogo from "../assets/logos/metamask-logo.svg";
import WalletConnectLogo from "../assets/logos/walletconnect-logo.png";
import Image from "next/image";

export const WalletModal = ({ isOpen, onClose, onOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    onOptionSelect(selectedOption);
    onClose();
  };

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
            onClick={() => handleOptionClick("Option 1")}
            className={`px-4 py-2 h-20 text-2xl flex justify-center items-center ${
              selectedOption === "Option 1" ? "bg-gray-300" : "bg-gray-300"
            } text-white rounded focus:outline-none hover:bg-gray-200`}
          >
            <Image src={MetamaskLogo} alt="Metamask Logo" className="w-3/5" />
          </button>
          <button
            onClick={() => handleOptionClick("Option 2")}
            className={`px-4 py-2 h-20 text-2xl flex justify-center items-center ${
              selectedOption === "Option 2" ? "bg-gray-300" : "bg-gray-300"
            } text-white rounded focus:outline-none hover:bg-gray-200`}
          >
            <Image
              src={WalletConnectLogo}
              alt="walletconnect Logo"
              className="w-3/5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
