import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
const TargetSavings = () => {
  const placeholders = ["How many month do you want to save", "Number of month"];
  const placeholderAmount = ["Whats the purpose", "Your saving is safe with us"];
//   const placeholderAdd = ["Input gudian address", "We secure he future"];
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
        <form className=" flex flex-col gap-5">
          <div>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              inputType="number"
              // onChange={handleChange}
              // onSubmit={onSubmit}
            />
          </div>
          <div>
            <PlaceholdersAndVanishInput
              placeholders={placeholderAmount}
              // onChange={handleChange}
              inputType="number"
              // onSubmit={onSubmit}
            />
          </div>
          {/* <div>
            <PlaceholdersAndVanishInput
              placeholders={placeholderAdd}
              inputType="text"
              // onChange={handleChange}
              // onSubmit={onSubmit}
            />
          </div> */}
          <div className=" flex justify-center">
          <button className="text-white p-4 bg-blue-500/60 rounded-lg text-lg font-bold w-[100px]">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TargetSavings;
