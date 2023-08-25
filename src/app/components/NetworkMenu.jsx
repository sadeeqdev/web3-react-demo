import React, { useEffect, useState } from "react";
import OasisLogo from "../assets/logos/wrose-logo.png";
import PolygonLogo from "../assets/logos/matic-logo.png";
import ArrowDown from "../assets/icon/arrow-down.svg";
import Image from "next/image";

export const NetworkMenu = () => {
  const [isOpenNetworkMenu, setIsOpenNetworkMenu] = useState(false);

  const openNetworkMenu = () => {
    setIsOpenNetworkMenu(!isOpenNetworkMenu);
  };

  const onNetworkSelected = (name) => {
    // Implement the logic for handling network selection
    // For example, update the selected network state
    console.log(`Selected network: ${name}`);
  };

  const env = {
    config: {
      ui: {
        logo: PolygonLogo,
        chainName: "Polygon",
      },
    },
  };

  const networkList = [
    // Define your network objects here
    { name: "Polygon", icon: PolygonLogo },
    { name: "Oasis", icon: OasisLogo },
    // ...
  ];

  const onDocumentClick = (event) => {
    const targetElement = event.target;
    if (!targetElement.closest(".network-menu-container")) {
      setIsOpenNetworkMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return (
    <div className="relative network-menu-container">
      <button
        onClick={openNetworkMenu}
        className="h-10 w-36 sm:h-11 lg:w-36 p-1 rounded sm:rounded-lg network_button flex justify-evenly items-center text-sm lg:text-[16px] font-semibold hover:opacity-90"
      >
        <div>
          <Image
            src={env.config.ui.logo}
            alt="Logo"
            className="w-6 h-6 lg:h-7 lg:w-7"
          />
        </div>
        <div>{env.config.ui.chainName}</div>
        <div>
          <Image src={ArrowDown} alt="Arrow" className="w-2.5 h-2.5" />
        </div>
      </button>
      <div
        className={`absolute mt-1 w-full bg-[#13161F] text-white menu-bg rounded-[10px] shadow-lg z-10 ${
          isOpenNetworkMenu ? "" : "hidden"
        }`}
        id="mySelectMenu"
      >
        <ul className="list-reset">
          {networkList.map((network, index) => (
            <li
              key={index}
              onClick={() => onNetworkSelected(network.name)}
              className={`py-2 px-2 border-b border-gray-700 hover:bg-gray-700 hover:rounded-t-md cursor-pointer flex items-center text-sm sm:text-[16px] font-semibold gap-2 ${
                index === networkList.length - 1
                  ? "last:border-none hover:last:rounded-t-none last:rounded-b-md"
                  : ""
              }`}
            >
              <Image
                src={network.icon}
                alt={`${network.name} Icon`}
                className="w-6 h-6 lg:h-7 lg:w-7"
              />
              {network.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
