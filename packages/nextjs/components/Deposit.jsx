'use client'

import React, { useState } from "react";
import CustomInput from "./ui/CustomeInput"
import { toast } from "react-toastify";
import { useScaffoldWriteContract  } from "../hooks/scaffold-eth";


const Deposit = () => {
  

  const [Amount, setAmount] = useState('')
  
  const { writeContractAsync, isPending } = useScaffoldWriteContract("GetSpaceMarketplace")

  const handleClear = () => {
    setAmount('')
  }

  
  const savepromise = async () => {
    await writeContractAsync({
      functionName: "depositSave",
      args: [Amount]
    })

  }
  
  const initialSave = async (e) => {
    e.preventDefault();
    try {
      await writeContractAsync({
        functionName: "depositSave",
        args: [Amount]
      })
      handleClear()
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className=" mt-14">
      <div className=" text-white text-lg font-bold flex justify-center items-center flex-col pt-10 pb-10 gap-7">
        <p>Welcome address</p>
        {/* <p className=" text-center">
          Connect your child wallet address <br /> Any address connect to the
          dapp will be regarded as your child
        </p> */}
      </div>
      <div>
        <form className=" flex flex-col gap-5 justify-center items-center" onSubmit={initialSave}>
          <div>
          <CustomInput onChange={(e) => setAmount(e.target.value)} 
            className=" w-[400px]"
              placeholders="numbers of days"
              type="number"
            />
          </div>
          
          <div className=" flex justify-center">
          <button className="text-white p-4 bg-blue-500/60 rounded-lg text-lg font-bold w-[100px]" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
