"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CheddaLogo from "../assets/logos/app-logo.svg";
import ProfileMenu from "./ProfileMenu";
import Image from "next/image";
import { ConnectButton } from "./ConnectButton";
import { NetworkMenu } from "./NetworkMenu";
import { WalletModal } from "./WalletModal";
import { metamaskHooks, metaMask } from "../connectors/metaMask";
const { useAccounts } = metamaskHooks;
import { useVaultStats } from "../hooks/useVaultStats";

const menuItems = [
  {
    name: "Lend",
    path: "/lend",
    icon: "briefcase",
  },
  {
    name: "Borrow",
    path: "/borrow",
    icon: "cash",
  },
  {
    name: "Grotto",
    path: "/grotto",
    icon: "storefront",
  },
  {
    name: "Vote",
    path: "/vote",
    icon: "checkbox",
  },
];

const HeaderComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const accounts = useAccounts();

  const address = accounts?.[0];
  const { pools } = useVaultStats();

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);

  useEffect(() => {
    console.log("pools", pools);
  }, [pools]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <WalletModal isOpen={isOpenModal} onClose={handleToggleModal} />
      <div
        className={`h-20 bg-black border-b border-gray-800 flex items-center ${
          isScrolled ? " w-full fixed mb-20" : ""
        }`}
      >
        <div className="flex flex-row justify-between w-11/12 xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto items-center">
          <div>
            <Image
              src={CheddaLogo}
              width={70}
              className="w-40 md:hidden lg:flex"
              alt="App Logo"
            />
            <Image
              src="/assets/logos/chedda-logo.svg"
              className="w-16 flex lg:hidden"
              width={70}
              height={20}
              alt="Chedda Logo"
            />
          </div>
          <div className="flex flex-row text-white space-x-10 mt-2 text-sm sm:text-lg font-semibold">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="relative hover:opacity-80"
              >
                <div>{item.name}</div>
                <div className="hidden pacman-loader">
                  {/* Include your Pacman Loader component */}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-row gap-2 text-white">
            <NetworkMenu />
            {address ? (
              <ProfileMenu disconnectWallet={() => {}} address={address} />
            ) : (
              <ConnectButton connectWallet={handleToggleModal} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
