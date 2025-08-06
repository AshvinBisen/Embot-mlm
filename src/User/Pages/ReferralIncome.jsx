import React from 'react';
import { FaArrowsDownToPeople, FaPeopleGroup, FaPeoplePulling } from 'react-icons/fa6';

const referralData = [
    {
        level: 'Level 1',
        percentage: 3,
        users: 12,
        income: 150,
    },
    {
        level: 'Level 2',
        percentage: 2,
        users: 8,
        income: 80,
    },
    {
        level: 'Level 3',
        percentage: 1,
        users: 5,
        income: 40,
    },
];

const ReferralIncome = () => {
    const totalUsers = referralData.reduce((sum, r) => sum + r.users, 0);
    const totalIncome = referralData.reduce((sum, r) => sum + r.income, 0);

    return (
        <div className=" ">
            <h2 className="text-2xl font-bold mb-8 text-center text-primary">Your 3-Level Referral Income</h2>

            {/* Levels Tree */}
            <div className="flex flex-col items-center space-y-5 relative">

                {/* Level 1 */}
                <div className="bg-gradient-to-br from-green-400/10 to-green-700/10 border border-green-500/30 border-gradient px-6 py-4 rounded-lg w-full max-w-md shadow-lg  flex sm:flex-row flex-col-reverse sm:text-left text-center gap-5 ">
                    <div className="sm:w-1/2 w-full ">
                        <h3 className="text-xl font-semibold text-green-300 mb-1">Level 1</h3>
                        <p className="text-sm text-slate-300">3% Commission</p>
                        <p className="text-sm text-slate-300">Users Referred: <span className="font-bold text-white">{referralData[0].users}</span></p>
                        <p className="text-sm text-slate-300">Income Earned: <span className="text-green-400 font-semibold">${referralData[0].income}</span></p>
                    </div>
                    <div className=" sm:w-1/2 w-full">
                        <div className={`   w-24 h-24  mx-auto bg-gradient-to-br from-purple-500 to-secondary rounded-xl flex items-center justify-center`}>
                            <FaPeoplePulling className='text-3xl' />

                        </div>
                    </div>
                </div>

                {/* Down arrow */}
                <div className="w-px h-8 bg-slate-500"></div>

                {/* Level 2 */}
                <div className="bg-gradient-to-br from-blue-400/10 to-blue-700/10 border border-green-500/30 border-gradient px-6 py-4 rounded-lg w-full max-w-md shadow-lg  flex sm:flex-row flex-col-reverse sm:text-left text-center gap-5 ">
                    <div className="sm:w-1/2 w-full ">
                        <h3 className="text-xl font-semibold text-blue-300 mb-1">Level 2</h3>
                        <p className="text-sm text-slate-300">2% Commission</p>
                        <p className="text-sm text-slate-300">Users Referred: <span className="font-bold text-white">{referralData[1].users}</span></p>
                        <p className="text-sm text-slate-300">Income Earned: <span className="text-green-400 font-semibold">${referralData[1].income}</span></p>
                    </div>
                    <div className=" sm:w-1/2 w-full">
                        <div className={`   w-24 h-24  mx-auto bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center`}>
                            <FaArrowsDownToPeople className='text-3xl' />

                        </div>
                    </div>
                </div>
                

                {/* Down arrow */}
                <div className="w-px h-8 bg-slate-500"></div>

                {/* Level 3 */}
                <div className="bg-gradient-to-br from-purple-400/10 to-purple-700/10 border border-green-500/30 border-gradient px-6 py-4 rounded-lg w-full max-w-md shadow-lg  flex sm:flex-row flex-col-reverse sm:text-left text-center gap-5 ">
                    <div className="sm:w-1/2 w-full ">
                        <h3 className="text-xl font-semibold text-purple-300 mb-1">Level 3</h3>
                        <p className="text-sm text-slate-300">1% Commission</p>
                        <p className="text-sm text-slate-300">Users Referred: <span className="font-bold text-white">{referralData[2].users}</span></p>
                        <p className="text-sm text-slate-300">Income Earned: <span className="text-green-400 font-semibold">${referralData[2].income}</span></p>
                    </div>
                    <div className=" sm:w-1/2 w-full">
                        <div className={`   w-24 h-24  mx-auto bg-gradient-to-br from-secondary to-purple-500 rounded-xl flex items-center justify-center`}>
                            <FaPeopleGroup className='text-3xl' />

                        </div>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="mt-8 border-t border-slate-600 pt-4 text-sm flex flex-col md:flex-row justify-between gap-4 text-slate-300">
                <div>Total Referred Users: <span className="text-white font-medium">{totalUsers}</span></div>
                <div>Total Referral Income: <span className="text-green-400 font-semibold">${totalIncome}</span></div>
            </div>
        </div>
    );
};

export default ReferralIncome;
