import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputNumber from "rc-input-number";
import { useConnectModal, useAccount } from "@web3modal/react";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import {
  parseEther,
  formatEther,
  formatUnits,
  parseUnits,
} from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { setErrorMsg } from "@/store/modules/app";

import json from "@/assets/WorldCupRabbitNFT.json";

import "animate.css";
import "rc-input-number/assets/index.css";

import type { RootState } from "@/store";

const contract_address: string = process.env.REACT_APP_CONTRACT_ADDRESS || "";

const provider = window.ethereum
  ? new Web3Provider(window.ethereum)
  : undefined;
let contract = new Contract(contract_address, json.abi, provider);

const price = 0.041;
const max = 400;
const successInfo = { msg: "", hash: "" };

const Mint = () => {
  const errorMsg = useSelector((state: RootState) => state.app.errorMsg);
  const dispatch = useDispatch();

  const { open } = useConnectModal();
  const { account } = useAccount();

  const [paused, setPaused] = useState(false);
  const [lastCount, setLastCount] = useState(400);
  const [commonGas, setCommonGas] = useState("0");
  const [count, setCount] = useState(1);
  const [move, setMove] = useState(false);
  const [successMsg, setSuccessMsg] = useState({ ...successInfo });

  const getMintTxParams = async () => {
    const data = await contract.populateTransaction.mint(count);
    // const nonce = await contract.signer.getTransactionCount()
    return {
      ...data,
      // nonce,
      value: parseEther(totalPrice),
    };
  };

  const getCommonGas = async () => {
    const params = await getMintTxParams();
    try {
      const bigNumberGas = await contract.signer.estimateGas(params);
      const gas = formatUnits(bigNumberGas, "gwei");
      setCommonGas(gas);
    } catch (err: any) {
      if (err.reason.includes("paused")) {
        return setPaused(true);
      }
      dispatch(setErrorMsg(err.reason));
      console.dir(err);
    }
  };

  const totalPrice = useMemo(() => {
    if (account.isConnected) {
      setTimeout(() => {
        getCommonGas();
      }, 100);
    }
    const _c = BigNumber.from(count);

    const _p = parseUnits(`${price}`);

    return formatEther(_c.mul(_p));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, account.isConnected]);

  const getLastCount = async () => {
    const bigNum = await contract.totalSupply();
    setLastCount(max - bigNum.toNumber());
  };

  const mint = async () => {
    if (!contract.signer) {
      return open();
    }
    setSuccessMsg({ ...successInfo });
    setMove(true);

    try {
      const params = await getMintTxParams();

      const tx = await contract.signer.sendTransaction(params);

      const done = await tx.wait();

      if (done.transactionHash) {
        setSuccessMsg({
          msg: `Ok! You can see it in your wallet later, or you can check`,
          hash: done.transactionHash,
        });
        getLastCount();
      }
      setMove(false);
    } catch (error: any) {
      const { action, reason } = error;
      console.dir(error);
      // JSON.stringify(error)
      const msg = reason
        ? `${action}: ${reason}`
        : "An error has occurred. You need to try resetting your account or re importing";

      dispatch(setErrorMsg(msg));
      setMove(false);
    }
  };

  const handleChange = (nextValue: number | null) => {
    setCount(nextValue || count);
  };

  useEffect(() => {
    if (account.address && provider) {
      const signer = provider.getSigner(account.address);
      contract = contract.connect(signer);
      getLastCount();
    }
  }, [account.address]);

  return (
    <>
      <div className="flex-1 mt-10 sm:mt-32 heng-bg bg-auto sm:bg-contain sm:bg-bottom">
        <div className="text-center m-auto p-8 bg-white shadow-xl rounded-lg w-11/12 sm:w-9/12 relative">
          {paused ? (
            <>Sorry, We Paused There</>
          ) : lastCount === 0 ? (
            <>Sorry, We Soldout</>
          ) : (
            <>
              <div className="m-4 p-4 bg-indigo-500 text-white font-bold rounded-lg">
                We decided that each wallet can have 10 tokens
              </div>
              <div className="static sm:absolute connect-font">
                You maybe need {totalPrice} + {commonGas} ETH
              </div>
              <div className="static sm:absolute right-8 font-bold connect-font">
                Last {lastCount}/400
              </div>
              <div className="p-4 pt-10 mb-4">
                <InputNumber
                  className="!text-lg !h-10"
                  min={1}
                  max={lastCount}
                  precision={0}
                  onChange={handleChange}
                  value={count}
                />
              </div>
              <button
                className={`mint-font text-3xl sm:text-5xl animate__animated ${
                  move ? "animate__tada" : ""
                }`}
                onClick={mint}
                disabled={move}
              >
                Mint {count === 1 ? "A" : count} Rabbit{count === 1 ? "" : "s"}{" "}
                !
              </button>
              {!move && (
                <div className="mt-8">
                  <span className="error-font text-xl break-words">
                    {errorMsg}
                  </span>
                </div>
              )}
              {move && (
                <div className="mt-8">
                  <span className="green-font text-xl">
                    We are mitting, please Wait ...
                  </span>
                </div>
              )}
              {successMsg.hash && (
                <div className="mt-8 break-words">
                  <span className="green-font text-xl">
                    {successMsg.msg} on{" "}
                    <a
                      className="active-font"
                      href={`https://etherscan.io/tx/${successMsg.hash}`}
                    >
                      etherscan
                    </a>
                  </span>
                  <p>{successMsg.hash}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Mint;
