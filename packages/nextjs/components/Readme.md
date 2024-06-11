import React, { useState } from "react";
import CustomInput from "../components/ui/CustomeInput"
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { toast } from "react-toastify";
import { Esusu } from "../contract/Esusu"
import {ethers} from "ethers"
import {utils, BrowserProvider } from "zksync-ethers"
import { getWallet } from "../utils/getWallet"
import { Generatepayment } from "../contract/GeneralPayment"

const ChildSavings = () => {
  const placeholders = ["input age you want her to withdraw", "e.g 12, in year"];
  const placeholderAmount = ["Input amount", "Your saving is safe with us"];
  const placeholderAdd = ["Input gudian address", "We secure he future"];

  let provider;

  if (typeof window !== "undefined" && window.ethereum) {
    provider = new BrowserProvider(window.ethereum);
  }

  const [age, setAge] = useState('')
  const [amount, setAmount] = useState('')
  const [gurdianAddress, setGurdianAddress] = useState('')
  const isFormFilled = age && amount && gurdianAddress

  const handleClear = () => {
    setAge('')
    setAmount('')
    setGurdianAddress('')
  }

  const wallet = getWallet(process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY);
  
  const esusuContract = new ethers.Contract(
    Esusu.address,
    Esusu.abi,
    wallet
  )

  const paymasterParams = utils.getPaymasterParams(Generatepayment.address, {
    type: "General",
    innerInput: new Uint8Array(),
  })

  // const savepromise = async (e) => {
  //   e.preventDefault()
  //   if(!isFormFilled) alert("Please the correct details")

  //     try {
  //       let paymasterBalance = await provider.getBalance(Generatepayment.address);
  //     console.log("Balance paymaster ", paymasterBalance.toString());

  //     const saveAmount = BigInt(Math.round(amount * 1000000))

  //     const result = await esusuContract.depositChildSavingsReg(
  //       age, saveAmount, gurdianAddress, {
  //         customData: {
  //           gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
  //           paymasterParams: paymasterParams,
  //         }
  //       }
  //     );

  //     await result.wait();

  //     console.log(result, "result")
  //     handleClear();
  //     } catch (error) {
  //       console.log(error)
  //     }
  // }
  const savepromise = async (e) => {
    e.preventDefault();
    if (!isFormFilled) alert("Please fill in the correct details");
  
    try {
      let paymasterBalance = await provider.getBalance(Generatepayment.address);
      console.log("Balance paymaster ", paymasterBalance.toString());
  
      if (!esusuContract || typeof esusuContract.depositChildSavingsReg!== 'function') {
        throw new Error('Contract instance is undefined or does not have the expected method.');
      }
      
      const saveAmount = BigInt(Math.round(amount * 1000000));
  
      // Estimate gas for the transaction
      const estimatedGas = await esusuContract.estimateGas.depositChildSavingsReg(age, saveAmount, gurdianAddress, {
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams: paymasterParams,
        },
      });
      console.log(estimatedGas)
  
      // Set gas price and max fee per gas according to EIP-1559
      const gasPrice = await provider.getGasPrice();
      const maxFeePerGas = ethers.utils.parseUnits('10', 'gwei'); // Example value, adjust as needed
      const maxPriorityFeePerGas = ethers.utils.parseUnits('1', 'gwei'); // Example value, adjust as needed
  
      const result = await esusuContract.depositChildSavingsReg(
        age, saveAmount, guardianAddress, {
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paymasterParams,
          },
          gasLimit: estimatedGas.add(10000), // Add a buffer to the estimated gas
          gasPrice: gasPrice,
          maxFeePerGas: maxFeePerGas,
          maxPriorityFeePerGas: maxPriorityFeePerGas,
        }
      );
  
      await result.wait();
  
      console.log(result, "result");
      handleClear();
    } catch (error) {
      console.log(error);
    }
  };
  
  
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
        <form className=" flex flex-col gap-5" onSubmit={savepromise}>
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
