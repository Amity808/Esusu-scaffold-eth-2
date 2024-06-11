import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import homebg from "../public/homebg.png";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className={` text-white font-medium text-lg flex flex-row justify-around pt-8`}>
      <div>
        <p className=" text-3xl font-bold">Esusu</p>
      </div>
      <div>
        <ul className=" list-none flex flex-row gap-3 items-center">
          <li><Link href={"/"}>Home</Link></li>
          <li><Link href={"/childsavings"}>Child Saving</Link></li>
          <li><Link href={"/targetSavings"}>Target Savings</Link></li>
          <li><Link href={"/history"}>History</Link></li>
          <li>
            <ConnectButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
