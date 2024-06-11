import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="pt-10">
      <div className=" flex flex-row max-sm:flex-col items-center justify-around">
        <div className=" flex justify-center items-center flex-col text-5xl gap-3">
          <p className=" font-bold text-white">
            Save For Feature, <br /> 
          </p>
          <p className="font-bold text-white">
          It's Yours, Start Today. <br /> 
          </p>
        </div>
        <div>
          <img src={"./typing.png"} alt="homebg" />
        </div>
      </div>
      <div className=" flex items-center justify-around pt-12">
        <p className=" text-white font-medium text-3xl">The easiest and safest place to save <br /> your token for the future</p>
        <button className=" text-white p-5 bg-blue-500 rounded-lg text-lg font-bold">Get Started</button>
      </div>
    </div>
  );
};

export default Header;
