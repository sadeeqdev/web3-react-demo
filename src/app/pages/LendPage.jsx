"use client";

import React from "react";
import BackIcon from "../assets/icon/back-icon.png";
import Image from "next/image";
import { LendContainer } from "../components/LendContainer";
import { AppPageTitle } from "../components/PageTitle";

const LendPage = () => {
  return (
    <div className="default-background">
      <AppPageTitle
        heading="Lend Assets"
        subHeading="Deposit and Withdraw tokens."
      />
      <div className="w-11/12 xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto">
        <button
          className="flex items-center mt-6 text-[#5DDEFA] text-xs font-semibold hover:opacity-80"
          onClick={() => {}}
        >
          <Image src={BackIcon} className="w-2 mr-1.5" alt="Back Icon" />
          Back to Market
        </button>
      </div>
      <LendContainer />
    </div>
  );
};

export default LendPage;
