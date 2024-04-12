import { Link, useLocation } from "react-router-dom";
import { AiOutlineDisconnect } from "react-icons/ai";
import Footer from "../Footer";
import { useConnectModal, useDisconnect, useAccount } from "@web3modal/react";

import styles from "./index.module.css";

const formatAddress = (a: string) =>
  `${a.substring(0, 4)}...${a.substring(38, 42)}`;

const Navbar = () => {
  const { open } = useConnectModal();
  const { account } = useAccount();
  const disconnect = useDisconnect();

  const { pathname } = useLocation();

  return (
    <div className="p-4 flex justify-between items-center backdrop-blur flex-col sm:flex-row">
      <Link to="/">
        <div className="flex items-center cursor-pointer">
          <img src="/rabbit.svg" alt="" className="w-20" />
          <h1 className="font-bold text-2xl title-font">World Cup Rabbit</h1>
        </div>
      </Link>
      <div className="mt-4 sm:mt-0">
        <Link
          className={`${pathname === "/" ? `active-font` : "home-font"} mr-8`}
          to="/"
        >
          Home
        </Link>
        <Link
          className={`${pathname === "/mint" ? `active-font` : "home-font"}`}
          to="mint"
        >
          Mint
        </Link>
      </div>
      <div className="mt-8 sm:mt-0 flex items-center">
        <Footer className="mr-4 !static hidden sm:block" />
        <button
          className={`bg-emerald-300 rounded-full p-4 font-bold connect-font text-white ${styles["gradient-border"]}`}
          onClick={() => (account.isConnected ? disconnect() : open())}
        >
          {account.isConnected ? (
            <>
              {formatAddress(account.address)}
              <AiOutlineDisconnect size={20} fill="#fff" className="ml-4" />
            </>
          ) : (
            "Connect Wallet"
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
