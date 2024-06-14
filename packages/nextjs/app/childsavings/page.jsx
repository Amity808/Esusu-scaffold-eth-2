"use client"

import React from 'react'
import bg from "~~/public/homebg.png";
import Navbar from "~~/components/Navbar"
import ChildSavings from "~~/components/ChildSavings"
import ChildHistory from "~~/components/ChildHistory"
import ChildSaveDeposit from '../../components/ChildSaveDeposit';
import { useAccount } from 'wagmi';

const Childsavings = () => {
    const headerStyle = {
        backgroundImage: `url(${bg.src})`,
        /* Additional styles can be added here */
    
        // Set background size to cover the container by default
        backgroundSize: "cover",
    
        // Center the background image by default
        backgroundPosition: "center",
    
        // Media query for mobile devices
        "@media (maxWidth: 768px)": {
          backgroundSize: "auto", // Adjust background size for smaller screens
          backgroundPosition: "center", // You can adjust this as needed
        },
      };

      const { address } = useAccount()
  return (
    <div style={headerStyle} className=' h-screen'>
        <div>
            {/* <Navbar /> */}
        </div>
        <ChildSavings />
        <ChildSaveDeposit address={address} />
        <ChildHistory />
    </div>
  )
}

export default Childsavings