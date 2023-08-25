import Image from "next/image";
import React, { useEffect, useState } from "react";
import ArrowDown from "../assets/icon/arrow-down.svg";
import CopyIcon from "../assets/icon/copy-icon.svg";
import AccountIcon from "../assets/logos/account-img.svg";

function ProfileMenu({ address, disconnectWallet }) {
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);

  const openProfileMenu = () => {
    setIsOpenProfileMenu(!isOpenProfileMenu);
  };

  const cheddaBalance = 123.456; // Replace with actual balance
  const stakedCheddaBalance = 789.012; // Replace with actual balance
  const addressCopyText = "Copy Address"; // Replace with desired text

  const copyAddress = () => {
    // Implement the logic for copying the address to clipboard
    // You can use libraries like `clipboard-copy` for this
    console.log("Address copied to clipboard");
  };

  const onDocumentClick = (event) => {
    const targetElement = event.target;
    if (!targetElement.closest(".profile-menu-container")) {
      setIsOpenProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return (
    <div className="relative profile-menu-container">
      <button
        onClick={openProfileMenu}
        className="h-9 w-32 sm:h-11 sm:w-40 px-2 rounded-lg text-sm account_button flex justify-evenly items-center hover:opacity-90 font-semibold"
      >
        <div>
          <Image
            src={AccountIcon}
            alt="Blockie"
            className="rounded-full w-7 h-7"
          />
        </div>
        <div>
          {address?.substring(0, 6)}...{address?.substring(address?.length - 4)}
        </div>
        <div>
          <Image src={ArrowDown} alt="Arrow" className="w-2.5 h-2.5" />
        </div>
      </button>
      <div
        className={`absolute mt-1 w-56 right-0 bg-[#13161F] menu-bg text-white rounded-md shadow-lg z-10 ${
          isOpenProfileMenu ? "" : "hidden"
        }`}
        id="mySelectMenu"
      >
        <ul className="list-reset text-center font-semibold">
          <li
            className="py-4 px-2 rounded-t-md border-b border-gray-700"
            onClick={copyAddress}
          >
            <div className="flex gap-3 justify-center items-center">
              <Image
                src={AccountIcon}
                alt="Blockie"
                className="rounded-full w-7 h-7"
              />
              {address?.substring(0, 6)}...
              {address?.substring(address?.length - 4)}
              <button className="relative address-container hover:opacity-70">
                <Image src={CopyIcon} width="17px" alt="Copy" />
                <div className="tooltip">{addressCopyText}</div>
              </button>
            </div>
          </li>
          <li className="py-2 px-2 border-b border-gray-700">
            {cheddaBalance.toFixed(4)} CHEDDA
          </li>
          <li className="py-2 px-2 border-b border-gray-700">
            {stakedCheddaBalance.toFixed(4)} xCHEDDA
          </li>
          <li className="py-4 px-5 rounded-b-md cursor-pointer flex items-center">
            <button
              onClick={disconnectWallet}
              className="h-8 primary-button-bg w-full rounded-lg font-bold uppercase text-md hover:opacity-90"
            >
              Disconnect
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileMenu;
