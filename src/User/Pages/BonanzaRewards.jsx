import React from 'react';
import {
  FaMedal,
  FaCrown,
  FaGem,
  FaLeaf,
  FaStar,
  FaShieldAlt,
  FaAward,
  FaChessKing,
  FaShapes,
} from 'react-icons/fa';

const rewards = [
  {
    rank: 'Silver - V1',
    roi: '0.25%',
    target: '$100',
    icon: <FaMedal />,
    gradient: 'from-gray-400 to-slate-500',
    description: 'Step into success with your first milestone!',
  },
  {
    rank: 'Gold',
    roi: '0.50%',
    target: '$500',
    icon: <FaCrown />,
    gradient: 'from-yellow-400 to-amber-500',
    description: 'Shine brighter as you scale your rewards.',
  },
  {
    rank: 'Platinum',
    roi: '0.75%',
    target: '$1,000',
    icon: <FaGem />,
    gradient: 'from-slate-300 to-gray-100',
    description: 'Solid growth with premium returns.',
  },
  {
    rank: 'Emerald',
    roi: '1.00%',
    target: '$2,000',
    icon: <FaLeaf />,
    gradient: 'from-green-400 to-emerald-600',
    description: 'Grow consistently and earn generously.',
  },
  {
    rank: 'Diamond',
    roi: '1.25%',
    target: '$3,000',
    icon: <FaShapes />,
    gradient: 'from-cyan-300 to-blue-500',
    description: 'Shine bright as your earnings soar.',
  },
  {
    rank: 'Double Diamond',
    roi: '1.50%',
    target: '$5,000',
    icon: <FaStar />,
    gradient: 'from-blue-500 to-indigo-600',
    description: 'Twice the impact, double the returns.',
  },
  {
    rank: 'Black Diamond',
    roi: '1.75%',
    target: '$7,500',
    icon: <FaShieldAlt />,
    gradient: 'from-black to-gray-800',
    description: 'Elite status with powerful rewards.',
  },
  {
    rank: 'Vice Chancellor Club',
    roi: '2.00%',
    target: '$10,000',
    icon: <FaAward />,
    gradient: 'from-purple-500 to-indigo-700',
    description: 'Lead with honor and earn with pride.',
  },
  {
    rank: 'Chairman Club',
    roi: '2.50%',
    target: '$15,000',
    icon: <FaChessKing />,
    gradient: 'from-pink-500 to-red-600',
    description: 'Rule the game with top-tier rewards.',
  },
];

const BonanzaRewards = () => {
  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-primary">Bonanza Rewards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward, index) => (
          <div
            key={index}
            className="rounded-xl border border-gradient bg-[#12212154] backdrop-blur-xl p-6 text-center shadow-md transition-all hover:scale-[1.02] hover:shadow-lg duration-300"
          >
            <div className={`w-20 h-20 mx-auto mb-4 rounded-xl flex items-center justify-center text-white text-5xl shadow-md bg-gradient-to-br ${reward.gradient}`}>
              {reward.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{reward.rank}</h3>
            <p className="text-sm text-white/70 mb-1 italic">{reward.description}</p>
            <p className="text-sm text-white/70 mb-1">ROI: <span className="text-white font-medium">{reward.roi}</span></p>
            <p className="text-sm text-white/70">Target: <span className="text-white font-medium">{reward.target}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BonanzaRewards;
