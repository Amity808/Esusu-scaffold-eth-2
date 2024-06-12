import React, { useState } from "react";
import CustomInput from "../components/ui/CustomeInput"
import { toast } from "react-toastify";
import { useScaffoldWriteContract, useScaffoldReadContract  } from "../hooks/scaffold-eth";
import { useAccount } from "wagmi";

const ChildSavings = () => {


  const { address } = useAccount()
 

  const [age, setAge] = useState('')
  const [amount, setAmount] = useState('')
  const [gurdianAddress, setGurdianAddress] = useState('')
  const isFormFilled = age && amount && gurdianAddress

  const { writeContractAsync, isPending } = useScaffoldWriteContract("Esusu")

  
  const handleClear = () => {
    setAge('')
    setAmount('')
    setGurdianAddress('')
  }

  const { data: dtailapp } = useScaffoldReadContract({
    contractName: "Esusu",
    functionName: "_childSavings",
    args:[
      address
    ]
  })

  console.log(dtailapp, "child")

  const saveAmount = BigInt(Math.round(amount * 1000000))


  const savepromise = async (e) => {
    e.preventDefault();
    try {
      await writeContractAsync({
        functionName: "depositChildSavingsReg",
        args: [age, saveAmount, gurdianAddress]
      })
      handleClear();
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>

{/* nnnn */}
    {/* Open the modal using document.getElementById('ID').showModal() method */}
    {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Secure your child future.</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action flex justify-center items-center">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <div>
            <CustomInput onChange={(e) => setAge(e.target.value)} 
            className=" w-[400px] text-white"
              placeholders="Enter Age"
              type="number"
            />
          </div>
          <div>
            <CustomInput 
            className=" w-[400px] text-white"
              placeholders={"Amount"}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            
            />
          </div>
          <div>
            <CustomInput 
            className=" w-[400px]"
              placeholders={"address"}
              type="text"
              onChange={(e) => setGurdianAddress(e.target.value)}
            />
            
          </div>
          <div>
          </div>
          {/* <div className=" flex justify-center"> */}
          <button className="text-white p-4 bg-blue-500/60 rounded-lg text-lg font-bold w-[100px]" onClick={savepromise} disabled={isPending} type="submit">Save</button>
          {/* </div> */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </>
  );
};

export default ChildSavings;
