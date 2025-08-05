import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';

const plans = [
    {
        name: 'Silver',
        amount: 100,
        roi: '0.5%',
        stakingDays: '5 days',
        lockPeriod: '45 days',
    },
    {
        name: 'Gold',
        amount: 500,
        roi: '0.6%',
        stakingDays: '5 days',
        lockPeriod: '90 days',
    },
    {
        name: 'Platinum',
        amount: 1000,
        roi: '0.7%',
        stakingDays: '5 days',
        lockPeriod: '120 days',
    },
    {
        name: 'Emerald',
        amount: 2500,
        roi: '0.8%',
        stakingDays: '5 days',
        lockPeriod: '180 days',
    },
    {
        name: 'Diamond',
        amount: 5000,
        roi: '0.9%',
        stakingDays: '5 days',
        lockPeriod: '270 days',
    },
];

const Investments = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleInvestClick = (plan) => {
        setSelectedPlan(plan);
        setShowModal(true);
    };

    const confirmPurchase = () => {
        toast.success(`${selectedPlan.name} Plan Purchased Successfully!`);
        setShowModal(false);
    };

    const cancelPurchase = () => {
        toast.error(`Purchase Cancelled.`);
        setShowModal(false);
    };

    return (
        <>
            <h2 className="text-2xl text-primary   font-bold mb-6">Investment Plans</h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="relative group p-[1px] border-gradient bg-gradient-to-br from-black to-blue-500/20 hover:shadow-sm hover:shadow-[rgba(34,152,211,0.53)] transition-all duration-300"
                    >
                        <div className="relative bg-[#12212154] backdrop-blur-xl h-full p-6 flex flex-col justify-between">
                            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-all duration-300 bg-gradient-to-br from-white/40 via-transparent to-transparent" />

                            <div className="text-xs uppercase font-semibold bg-gradient-to-r from-[#2298D3] to-[#05CE99] text-white px-3 py-1 rounded-full w-max mb-4">
                                Most Popular
                            </div>

                            <div className="z-10 space-y-1 mb-6">
                                <h2 className="text-xl uppercase font-semibold tracking-wider">{plan.name}</h2>
                                <p className="text-4xl font-extrabold text-green-400">
                                    ₹{plan.amount.toLocaleString()}
                                </p>
                            </div>

                            <ul className="text-sm text-slate-300 list-disc  space-y-1 z-10 mb-6">
                                <li>
                                    Daily ROI: <span className="text-white text-base font-medium">{plan.roi}</span>
                                </li>
                                <li>
                                    Staking Days: <span className="text-white font-medium">{plan.stakingDays}</span> (Excl. Sat/Sun)
                                </li>
                                <li>
                                    Locking Period: <span className="text-white font-medium">{plan.lockPeriod}</span>
                                </li>
                                <li>
                                    Cap: <span className="text-white font-medium">3x</span>
                                </li>
                            </ul>

                            <button
                                className="z-10 mt-auto w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-[#2298d341] to-[#05CE99] hover:opacity-90 transition"
                                onClick={() => handleInvestClick(plan)}
                            >
                                Invest Now
                            </button>

                            <div className="z-10 mt-5 pt-4 border-t border-white/10 text-sm space-y-2">
                                {[
                                    'Stable Returns',
                                    'Secure Staking',
                                    '  Withdrawals after Locking '
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-slate-200">
                                        <FaCheck className="text-green-400" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-[#122121ee] text-white max-w-md w-full rounded-xl p-6 shadow-lg border border-gradient">
                        <h2 className="text-xl font-bold mb-4 text-center">Confirm Investment</h2>
                        <p className="text-sm text-center mb-6">
                            Are you sure you want to purchase the <span className="font-semibold text-green-400">{selectedPlan.name}</span> plan?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmPurchase}
                                className="px-4 py-2 bg-gradient-to-r from-[#2298D3] to-[#05CE99] rounded-md font-semibold hover:opacity-90"
                            >
                                Yes
                            </button>
                            <button
                                onClick={cancelPurchase}
                                className="px-4 py-2 bg-white/10 border border-white/20 rounded-md font-semibold hover:bg-white/20"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Investments;
