'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { useScaffoldReadContract } from "../hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { useAccount } from 'wagmi';
import Deposit from "./Deposit"
const HistoryCard = ({id}) => {

  const { address } = useAccount()
  const [historyData, setHistoryData] = useState(null)

  const { data: fetchData } = useScaffoldReadContract({
    contractName: "Esusu",
    functionName: "_savings",
    args: [id]
});


console.log(id, "id")

console.log(fetchData)

const getSavings = useCallback(() => {
  if (!fetchData) return null;

  setHistoryData({
    owner: fetchData[0],
    savingsAmount: fetchData[1],
    target: Number(fetchData[2]),
    startDate: fetchData[3],
    endDate: Number(fetchData[4]),
    purpose: fetchData[5],
    isTime: Number(fetchData[6]),
    forceWithdraw: fetchData[7],
    inSaving: Boolean(fetchData[8]),
    SavingsStatus: fetchData[9],
    nonce: Number(fetchData[10]),
  })
}, [fetchData]);

useEffect(() => {
  getSavings()
}, [getSavings])
let timeStampNs = historyData?.isTime

  let timeStampS = timeStampNs / 1e9;

  let date = new Date(timeStampS * 1000)

  let readableDate = date.toLocaleString()
  console.log("Readable date", readableDate)

  console.log(historyData?.isTime)


console.log(historyData?.SavingsStatus)
if (!historyData) return null;

  return (
    <>
    {address == historyData?.owner ? <>

    <div className=' mt-10'>
        <div className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 m-3">
            {/* <Address address={historyData?.owner} /> */}
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Current Amount: {historyData?.savingsAmount}
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Purpose {historyData?.purpose}
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Target {historyData?.target}
          </p>
          <div className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <Link target="_blank" href={'/'}> {readableDate}</Link>
            <Link target="_blank" href={`/space/${id}`} className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              With draw Date 
            </Link>
          </div>
          <div>
            <p>End Date: {readableDate}</p>
            <button className="mt-4 text-sm text-white bg-black rounded-full px-3 py-1">Withdraw</button>
            <Deposit id={id} />
          </div>
        </div>
    </div>
    </> : <div>
      {/* <p>You dont have not initail Savings. Visit <Link href={"/savetarget"}>Initial Savings</Link></p> */}
      </div>}
    </>
  )
}

export default HistoryCard
