"use client";

import React, { useState } from "react";
import CustomInput from "./ui/CustomeInput"
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { toast } from "react-toastify";
import { useScaffoldReadContract  } from "../hooks/scaffold-eth";


//0x25fE59A2a8ed3486EacFba40b963b153bF08cf48
//0x25fE59A2a8ed3486EacFba40b963b153bF08cf48
const ChildSavings = () => {
 

  const [age, setAge] = useState('')
  const [amount, setAmount] = useState('')
  const [gurdianAddress, setGurdianAddress] = useState('')
  const isFormFilled = age && amount && gurdianAddress
  
  const handleClear = () => {
    setAge('')
    setAmount('')
    setGurdianAddress('')
  }

  const { writeContractAsync} = useScaffoldWriteContract("Esusu")




  const savepromise = async () => {
    try {
      await writeContractAsync({
        functionName: ""
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  const saveForChild = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(savepromise(), {
        pending: "Saving...",
        success: "Saved successfully, congratulation",
        error: "Error while saving, contact admin",
      })
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className=" mt-14">
      <div className=" text-white text-lg font-bold flex justify-center items-center flex-col pt-10 pb-10 gap-7">
        <p>Welcome address</p>
        <p className=" text-center">
          Connect your child wallet address <br /> Any address connect to the
          dapp will be regarded as your child
        </p>
      </div>
      <div>
        <form className=" flex flex-col gap-5" onSubmit={saveForChild}>
          <div>
            <CustomInput onChange={(e) => setAge(e.target.value)} 
            
              placeholders="Enter Age"
              type="number"
            />
            {/* <PlaceholdersAndVanishInput
              // onChange={handleChange}
              // onSubmit={onSubmit}
              onChange={(e) => setAge(e.target.value)}
            /> */}
          </div>
          <div>
            <CustomInput 
              placeholders={"Amount"}
              // onChange={handleChange}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            
            />
            {/* <PlaceholdersAndVanishInput
              // onSubmit={onSubmit}
            /> */}
          </div>
          <div>
            <CustomInput 
            
              placeholders={"address"}
              type="text"
              // onChange={handleChange}
              onChange={(e) => setGurdianAddress(e.target.value)}
            />
            {/* <PlaceholdersAndVanishInput
              // onSubmit={onSubmit}
            /> */}
          </div>
          <div>
            {/* <CustomInput placeholder="Newind" className="" /> */}
          </div>
          <div className=" flex justify-center">
          <button className="text-white p-4 bg-blue-500/60 rounded-lg text-lg font-bold w-[100px]" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChildSavings;
