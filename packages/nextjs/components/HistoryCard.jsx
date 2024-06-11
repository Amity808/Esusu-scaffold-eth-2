'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { useScaffoldReadContract } from "../hooks/scaffold-eth";

const HistoryCard = ({ id }) => {

  const [historyData, setHistoryData] = useState(null)

  const { data: fetchData } = useScaffoldReadContract({
    contractName: "Esusu",
    functionName: "_savings",
    args: [id]
});

const getSavings = useCallback(() => {
  if (!fetchData) return null;

  setHistoryData({
    owner: fetchData[0],
    savingsAmount: fetchData[1],
    target: fetchData[2],
    startDate: fetchData[3],
    endDate: fetchData[4],
    purpose: fetchData[5],
    isTime: fetchData[6],
    forceWithdraw: fetchData[7],
    inSaving: fetchData[8],
    SavingsStatus: fetchData[9],
    nonce: fetchData[10],
  })
}, [fetchSpace]);

useEffect(() => {
  getSavings()
}, [getSavings])


console.log(historyData?.SavingsStatus)
if (!historyData) return null;

  return (
    <div className=' mt-10'>
        <div className="text-white">
      <ul className=' list-none flex items-center justify-around'>

        <li>ID</li>
        <li>{historyData?.savingsAmount}</li>
        <li>{historyData?.purpose}</li>
        <li>{historyData?.startDate}</li>
        <li>{historyData?.endDate}</li>
        <li>Activities</li>

        {/* <li>ID</li>
        <li>Target</li>
        <li>Purpose</li>
        <li>Start Data</li>
        <li>CLaim Date</li>
        <li>Activities</li> */}
      </ul>
    </div>
    </div>
  )
}

export default HistoryCard
