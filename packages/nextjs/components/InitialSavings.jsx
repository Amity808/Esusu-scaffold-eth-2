'use client'

import React, { useState } from "react";
// import { PlaceholdersAndVanishInput } from "~~/components/ui/placeholders-and-vanish-input";
import { toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";
import CustomInput from "~~/components/ui/CustomeInput"
import { useScaffoldWriteContract } from "../hooks/scaffold-eth"

const InitialSavings = () => {
 
  const [days, setDays] = useState('')
  const [toggle, setToggle] = useState(false);
  const [purpose, setPurpose] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const isFormFilled = days && targetAmount && purpose

  const handleClear = () => {
    setDays('')
    setTargetAmount('')
    setPurpose('')
  }

 const { writeContractAsync, isPending } = useScaffoldWriteContract("Esusu")


  
  const initialSave = async (e) => {
    e.preventDefault();
    try {

      await writeContractAsync({
        functionName: "initialSaving",
        args: [days, purpose, targetAmount],
      })
     
      console.log("Saved successfully")
      handleClear()
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className=" mt-14">
      <button
        id="modalBioDate"
        type="button"
        data-bs-toggle="modalBioData"
        data-bs-target="#modalCenter"
        className=" text-black font-bold text-lg border-2 rounded-xl py-1 bg-[#fdfeff] px-3 flex items-center mr-10 flex-col text-center drop-shadow-xl"
        onClick={() => setToggle(true)}
      >
        Initial Savings
      </button>
     {toggle && (
      <>
       <div className=" text-white text-lg font-bold flex justify-center items-center flex-col pt-10 pb-10 gap-7 w-[600px] rounded-2xl bg-slate-100">
        <p>Welcome address</p>
        <p className=" text-center">
          Connect your child wallet address <br /> Any address connect to the
          dapp will be regarded as your child
        </p>
      </div>
      <div>
        <form className=" flex flex-col gap-5 justify-center items-center" onSubmit={initialSave}>
          <div>
          <CustomInput onChange={(e) => setDays(e.target.value)} 
            className=" w-[400px] text-white"
              placeholders="numbers of days"
              type="number"
            />
          </div>
          <div>
          <CustomInput onChange={(e) => setPurpose(e.target.value)} 
            className=" w-[400px] text-white"
              placeholders="What is the purpose"
              type="text"
            />
          </div>
          <div>
          <CustomInput onChange={(e) => setTargetAmount(e.target.value)} 
            className=" w-[400px] text-white"
              placeholders="What's your target amount"
              type="number"
            />
          </div>
          <div className=" flex justify-center">
          <button className="text-white p-4 bg-blue-500/60 rounded-lg text-lg font-bold w-[100px]" type="submit">Save</button>
          <button type="button" onClick={() => setToggle(false)}>
                  <IoMdCloseCircle size={30} color="#06102b" />
          </button>
          </div>
        </form>
      </div>
      </>
     )}
    </div>
  );
};

export default InitialSavings;
