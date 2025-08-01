import React, { useState } from 'react';
import { BiSolidOffer } from 'react-icons/bi';
import { BsMicrosoftTeams } from 'react-icons/bs';
import {
  FaChartLine,
  FaDollarSign,
  FaUsers,
  FaBullseye,
  FaCog,
  FaPeopleArrows,
} from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { GiTakeMyMoney } from 'react-icons/gi';
import { GrAnnounce, GrMoney } from 'react-icons/gr';
import { IoTodayOutline } from 'react-icons/io5';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { PiHandWithdrawDuotone } from 'react-icons/pi';
import { TbPigMoney, TbShare3 } from 'react-icons/tb';

const Dashboard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('https://Easy Money.biz/portal/register?ref=EM934678');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // bg-[#12212154]
 
  return (
    <div className="text-white p-4 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl uppercase text-[#48D77C] font-bold">
            Welcome, TEST CALLBACK Have a nice day!
          </h1>
          <p className="text-blue-300 text-sm">EM934678</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <FaCog className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">TC</span>
            </div>
            <span className="text-sm">TEST CALLBACK (EM934678)</span>
          </div>
        </div>
      </div>

      {/* Row 1: Wallets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'My Wallet', value: '$0', color: 'bg-purple-500', icon: <FaDollarSign /> },
          { title: 'Deposit Wallet', value: '$2', color: 'bg-orange-500', icon: <FaChartLine /> },
          { title: 'Total Investment', value: '0', color: 'bg-green-500', icon: <FaBullseye /> },
          { title: 'ROI Wallet', value: '$0', color: 'bg-blue-500', icon: <FaDollarSign /> },
        ].map((item, idx) => (
          <div key={idx} className="   bg-[#12212154]   backdrop-blur-xl border-gradient p-4 border border-slate-700 shadow-md shadow-slate-800/50">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center`}>
                {item.icon}
              </div>
              <span className="text-sm text-slate-300">{item.title}</span>
            </div>
            <div className="text-2xl font-bold">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Row 2: Referral + Incomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className=" space-y-5 ">
          <div className="bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50">
            <div className={`w-8 h-8 bg-green-500 mb-3 rounded-full flex items-center justify-center`}>
              <TbShare3 />

            </div>
            <h3 className="text-lg font-semibold text-[#48D77C] mb-4">REFERRAL LINK</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-slate-700 rounded-lg p-3">
              <input
                type="text"
                value="https://Easy Money.biz/portal/register?ref=EM934678"
                readOnly
                className="flex-1 bg-transparent text-blue-300 text-sm outline-none w-full sm:w-auto"
              />
              <button
                onClick={handleCopy}
                className="bg-[#48D77C] hover:bg-[#38a861] px-4 py-1 rounded text-sm transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50">
            <h3 className="text-lg font-semibold text-[#48D77C] mb-4">TEAM BUSINESS OVERVIEW</h3>
            <div className="space-y-4">
              {['Direct Business', 'Total Team Business', 'Today Team Business'].map((text, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <FaUsers className="w-3 h-3" />
                    </div>
                    <span className="text-sm">{text}</span>
                  </div>
                  <span className="font-bold text-sm">$0</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50">
          <h3 className="text-lg font-semibold text-[#48D77C] mb-4">TOTAL INCOMES</h3>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-44 h-44 bg-gradient-to-br from-green-400 to-blue-900 rounded-full flex items-center justify-center">
                <GiTakeMyMoney className="h-20 w-20     " />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">%</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            {['ROI Income', 'Level Income', 'Bonus Income'].map((label, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="text-slate-300">{label}</span>
                <span className="font-bold">$0</span>
              </div>
            ))}
          </div>
        </div>



      </div>

      {/* Row 3: Team + Investment */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">


        <div className="bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50 flex flex-col justify-center text-center">
          <div className={`w-full mb-4 h-14 mx-auto bg-gradient-to-br from-green-500 to-blue-900 rounded-md flex items-center justify-center`}>
            <TbPigMoney className='text-2xl' />
          </div>
          <h3 className="text-lg font-semibold text-[#48D77C] mb-4">INVESTMENT OVERVIEW</h3>
          <p className="text-sm text-slate-400">Total Investment</p>
          <p className="text-2xl font-bold">$0</p>
        </div>

        <div className="bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50">
          <div className="grid grid-cols-2 gap-4 text-center      ">
            <div className='space-y-4'>
              <div className={`w-full h-14 mx-auto bg-gradient-to-br from-green-500 to-blue-900 rounded-md flex items-center justify-center`}>
                <MdOutlineCalendarMonth className='text-2xl' />
              </div>
              <p className="text-sm text-slate-400">Monthly Income</p>
              <p className="text-xl font-bold">$0</p>
            </div>
            <div className='space-y-4'>
              <div className={`w-full h-14 mx-auto bg-gradient-to-br from-green-500 to-blue-900 rounded-md flex items-center justify-center`}>
                <IoTodayOutline className='text-2xl' />
              </div>
              <p className="text-sm text-slate-400">Daily Income</p>
              <p className="text-xl font-bold">$0</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50 text-center">
          <h3 className="text-lg font-semibold text-[#48D77C] mb-4">TRANSACTIONS</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className={`w-14 mb-4 h-14  mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center`}>
                <GrMoney className='text-2xl' />
              </div>
              <p className="text-slate-400 text-sm">Total Earning</p>
              <p className="text-3xl font-bold">$0</p>
            </div>
            <div>
              <div className={`w-14 mb-4 h-14  mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center`}>
                <PiHandWithdrawDuotone className='text-2xl' />
              </div>
              <p className="text-slate-400 text-sm">Total Withdraw</p>
              <p className="text-3xl font-bold">$0</p>
            </div>
          </div>
        </div>


      </div>

      {/* Row 4: Team Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 text-center">
        {[
          { title: 'Total Team', value: "1", icon: <FaPeopleGroup className='text-2xl' /> },
          { title: 'My Direct', value: "2", icon: <BsMicrosoftTeams className='text-2xl' /> },
          { title: 'Indirect', value: "3", icon: <FaPeopleArrows className='text-2xl' /> }].map((label, idx) => (
            <div key={idx} className="bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50">
              <div className={`w-14 mb-4 h-14  mx-auto bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center`}>
                {label.icon}

              </div>
              <div className="text-3xl font-bold mb-2">{label.value}</div>
              <p className="text-sm text-slate-400">{label.title}</p>
            </div>
          ))}
      </div>


      {/* Row 5: Announcements + Token */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className=" relative lg:col-span-2 bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50">
          <div className="absolute right-[-1rem] top-[-1rem]">
            <BiSolidOffer className='text-[6rem]  text-green-500 ' />
          </div>
          <div className=" flex items-center gap-4 ">

            <div className={`w-14 mb-4 h-14  glow-text bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center`}>
              <GrAnnounce className='text-2xl ' />
            </div>

            <h3 className="text-lg font-semibold glow-text  text-[#48D77C] mb-4">LATEST ANNOUNCEMENT</h3>
          </div>
          <h4 className="text-xl glow-text font-bold mb-4">Empowering Decentralized Income with Easy Money</h4>
          <p className="text-slate-300 glow-text text-sm leading-relaxed">
            Easy Money Project is a next-gen blockchain-based MLM (Multi-Level Marketing) platform designed to empower individuals with a decentralized, secure, and transparent income model.
          </p>
        </div>
        <div className="bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50 text-center">
          <h3 className="text-lg font-semibold text-[#48D77C] mb-4">Easy Money TOKEN OVERVIEW</h3>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-lg font-bold">Z</span>
          </div>
          <p className="text-lg font-bold mb-1">Easy Money Token Price</p>
          <p className="text-white text-sm">1 Easy Money = 0.01 USDT</p>
        </div>
      </div>

      {/* Row 6: Transactions + Bonus */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="md:col-span-2 bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50 text-center">
          <h3 className="text-lg font-semibold text-[#48D77C] mb-4">TRANSACTIONS</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Total Earning</p>
              <p className="text-3xl font-bold">$0</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Withdraw</p>
              <p className="text-3xl font-bold">$0</p>
            </div>
          </div>
        </div>

        <div className="bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50 text-center">
          <h3 className="text-lg font-semibold text-[#48D77C] mb-4">BONUS ACHIEVEMENT</h3>
          <div className="text-yellow-500 font-bold mb-2">Not Qualified</div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">View Report</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-slate-400 border-t border-slate-700 shadow-md shadow-slate-800/50 pt-4">
        Copyright 2024-25 © Easy Money. All Rights Reserved
      </footer>
    </div>
  );
};

export default Dashboard;
