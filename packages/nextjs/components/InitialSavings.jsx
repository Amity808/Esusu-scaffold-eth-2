'use client'

import React, { useState } from "react";
// import { PlaceholdersAndVanishInput } from "~~/components/ui/placeholders-and-vanish-input";
import { toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";
import { parseEther } from "viem";
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
        args: [days, purpose, parseEther(targetAmount)],
      })
     
      handleClear()
      console.log("Saved successfully")
      handleClear()
    } catch (error) {
      console.log(error);

    }
  }
  return (
      <>
   
    
    {/* dif */}

    <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>Initial Savings</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Secure your future.</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action flex justify-center items-center">
      <form method="dialog" >
        {/* if there is a button in form, it will close the modal */}<div>
          <CustomInput onChange={(e) => setDays(e.target.value)} 
            className=" w-[400px] text-black"
              placeholders="numbers of days"
              type="number"
            />
          </div>
          <div>
          <CustomInput onChange={(e) => setPurpose(e.target.value)} 
            className=" w-[400px] text-black"
              placeholders="What is the purpose"
              type="text"
            />
          </div>
          <div>
          <CustomInput onChange={(e) => setTargetAmount(e.target.value)} 
            className=" w-[400px] text-black"
              placeholders="What's your target amount"
              type="number"
            />
          </div>
          <div>
          </div>
          {/* <div className=" flex justify-center"> */}
          <button className="text-white p-4 bg-blue-500/60 rounded-lg text-lg font-bold w-[100px]" onSubmit={initialSave} disabled={isPending} type="submit">Save</button>
          {/* </div> */}
        <button className="text-white p-4 bg-blue-500/60 rounded-lg text-lg font-bold w-[100px]">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </>
  );
};

export default InitialSavings;
