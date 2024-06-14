"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useScaffoldWriteContract, useScaffoldReadContract } from "../../../hooks/scaffold-eth";
import CustomInput from "~~/components/ui/CustomeInput";
import { toast } from "react-toastify";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import Navbar from "~~/components/Navbar";

const ChildSaveDeposit = () => {
  const [Amount, setAmount] = useState("");

  const { writeContractAsync, isPending } = useScaffoldWriteContract("Esusu");


  const { address } = useAccount()
  const handleClear = () => {
    setAmount("");
  };

  const { data: fetchData } = useScaffoldReadContract({
    contractName: "Esusu",
    functionName: "_childSavings",
    args: [address]
});

const [historyData, setHistoryData] = useState(null)
 
const getSavings = useCallback(() => {
  if (!fetchData) return null;

  setHistoryData({
      childAge: fetchData[0],
      amount: Number(fetchData[1]),
      targetChild: Number(fetchData[2]),
      childAddress: fetchData[3],
      fatherAddress: fetchData[4],
      canWithdraw: Number(fetchData[5])
  })
}, [fetchData]);

useEffect(() => {
  getSavings()
}, [getSavings])

  const initialSave = async (e) => {
    e.preventDefault();
    try {
      await writeContractAsync({
        functionName: "depositForChild",
        args: [historyData?.childAddress],
        value: parseEther(Amount),
      });
      handleClear();
    } catch (error) {
      handleClear();
      console.log(error);
    }
  };
  return (
    <>
      {/* Dialogo */}
      <Navbar />

      <div className=" mt-14">
      <div className=" text-white text-lg font-bold flex justify-center items-center flex-col pt-10 pb-10 gap-7">
        <p>Welcome address</p>
        <p className=" text-center">
          Connect your child wallet address <br /> Any address connect to the
          dapp will be regarded as your child
        </p>
      </div>
      <div>
        <form className=" flex flex-col gap-5 justify-center items-center">
        
        <div>
                <CustomInput
                  onChange={e => setAmount(e.target.value)}
                  className=" w-[400px]"
                  placeholders="amount"
                  type="number"
                />
              </div> 
              <button
                className="text-white p-4 bg-blue-500/60 rounded-lg text-lg font-bold w-[100px]"
                onClick={initialSave}
                disabled={isPending}
                type="submit"
              >
                Save
              </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ChildSaveDeposit;
