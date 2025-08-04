import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
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
import { GiProfit, GiTakeMyMoney } from 'react-icons/gi';
import { GrAnnounce, GrMoney } from 'react-icons/gr';
import { IoTodayOutline } from 'react-icons/io5';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { PiHandWithdrawDuotone } from 'react-icons/pi';
import { TbPigMoney, TbShare3 } from 'react-icons/tb';

import logoicon from "../../../src/assets/userImages/Logo/icon2.png"
import events  from '../../assets/userImages/images/events.jpg';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Required core styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Footer from '../Components/Comman/Footer';



const Dashboard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('https://Easy Money.biz/portal/register?ref=EM934678');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // bg-[#12212154]

  const investment = 500;
  const earning = 200;
  const earningTimes = 2;
  const remaining = 100;
  const total = investment + earning;

  const data = [
    ['Type', 'Value'],
    ['Invested', investment],
    ['Remaining', total - investment],
  ];

  const options = {
    pieHole: 0.75,
    pieStartAngle: 270,
    slices: {
      0: { color: '#4ade80' }, // Tailwind green-400
      1: { color: '#1e3a8a' }, // Tailwind blue-900
    },
    tooltip: { trigger: 'selection' }, // ✅ Tooltips show on hover
    legend: 'none',
    backgroundColor: 'transparent',
    chartArea: { width: '100%', height: '100%' },
  };


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
      <div className="grid  lg:grid-cols-6 gap-4">
        <div className="grid  lg:col-span-4   grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'My Wallet', value: '$0234', color: 'bg-purple-500', icon: <FaDollarSign /> },
            { title: 'Deposit Wallet', value: '$2234', color: 'bg-orange-500', icon: <FaChartLine /> },
            { title: 'Total Investment', value: '023423', color: 'bg-green-500', icon: <FaBullseye /> },
            { title: 'ROI Wallet', value: '$02434', color: 'bg-blue-500', icon: <FaDollarSign /> },
            { title: 'My Wallet', value: '$0234', color: 'bg-purple-500', icon: <FaDollarSign /> },
            { title: 'Deposit Wallet', value: '$2234', color: 'bg-orange-500', icon: <FaChartLine /> },
            { title: 'Total Investment', value: '023423', color: 'bg-green-500', icon: <FaBullseye /> },
            { title: 'ROI Wallet', value: '$02434', color: 'bg-blue-500', icon: <FaDollarSign /> },
          ].map((item, idx) => (
            <div key={idx} className="    bg-[#12212154]   backdrop-blur-xl border-gradient p-4       shadow-md shadow-slate-800/50">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 aspect-[1/1] ${item.color} rounded-full flex items-center justify-center`}>
                  {item.icon}
                </div>
                <span className="text-sm text-slate-300">{item.title}</span>
              </div>
              <div className="text-lg font-bold">{item.value}</div>
            </div>
          ))}


        </div>

        <div className='   lg:col-span-2 border-gradient border  bg-gradient-to-br from-green-400/10 to-blue-900/10    '>
          
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            // navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            loop={true}
            className=" h-full     "
          >
            <SwiperSlide>
              <img src={events} className=" h-full object-cover " alt="Event Slide 1" />
            </SwiperSlide>
            {/* You can duplicate SwiperSlide for more images */}
            <SwiperSlide>
              <img src={events} className="h-full object-cover" alt="Event Slide 2" />
            </SwiperSlide>
          </Swiper>
        </div>

      </div>

      {/* Row 2: Referral + Incomes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-[#12212154] flex flex-col justify-between  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50">
          <div className="mb-5  ">
            <h3 className="text-lg font-semibold text-[#48D77C] mb-2">TOTAL INCOMES</h3>
            <p className='text-sm leading-tight text-gray-300' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias voluptates quia pariatur eaque, sunt vitae.</p>

          </div>
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
                -
                <span className="font-bold">$0</span>
              </div>
            ))}
          </div>
        </div>

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

            </div>
            <button
              onClick={handleCopy}
              className="bg-[#48D77C] mt-3 hover:bg-[#38a861] px-4 py-1 rounded text-sm transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
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



        <div className="bg-[#12212154]    backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50">
          <h3 className="text-lg font-semibold text-[#48D77C] mb-4">PROFIT TRACKER</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Investment</span>
              <span className="font-bold">${investment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Earning</span>
              <span className="font-bold">${earning}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Earning Times</span>
              <span className="font-bold">{earningTimes}X</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Remaining</span>
              <span className="font-bold">${remaining}</span>
            </div>
          </div>

          <div className="flex mt-10 justify-center mb-4">
            <div className="relative w-44 h-44 rounded-full">
              {/* Donut Chart */}
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width="176px"
                height="176px"
                loader={<div>Loading chart...</div>}
              />
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-900 rounded-full flex items-center justify-center">
                  <GiProfit className="text-white w-10 h-10" />
                </div>
              </div>

            </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6 text-center">
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

        <div className="bg-[#12212154] lg:col-span-2  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50 text-center">
          <h3 className="text-lg font-semibold text-[#48D77C] mb-4">Easy Money TOKEN OVERVIEW</h3>
          <div className="    flex items-center justify-center mx-auto mb-3">
            <img src={logoicon} className='w-10' alt="" />
          </div>
          <p className="text-lg font-bold mb-1">Easy Money Token Price</p>
          <p className="text-white text-sm">1 Easy Money = 0.01 USDT</p>
        </div>
      </div>


      {/* Row 5: Announcements + Token */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className=" relative lg:col-span-2 bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50">
          <div className="absolute right-0 top-0">
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
        {/* <div className="bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50 text-center">
          <h3 className="text-lg font-semibold text-[#48D77C] mb-4">Easy Money TOKEN OVERVIEW</h3>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-lg font-bold">Z</span>
          </div>
          <p className="text-lg font-bold mb-1">Easy Money Token Price</p>
          <p className="text-white text-sm">1 Easy Money = 0.01 USDT</p>
        </div> */}
        <div className="bg-[#12212154]  backdrop-blur-xl border-gradient p-6 border border-slate-700 shadow-md shadow-slate-800/50 text-center">
          <h3 className="text-lg font-semibold text-[#48D77C] mb-4">BONUS ACHIEVEMENT</h3>
          <div className="text-yellow-500 font-bold mb-2">Not Qualified</div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">View Report</button>
        </div>
      </div>



      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Dashboard;
