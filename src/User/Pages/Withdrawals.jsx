import  { useState } from 'react';
import { toast } from 'react-toastify';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { FiDollarSign } from 'react-icons/fi';
import { TbWallet } from 'react-icons/tb';

const Withdrawals = () => {
  const [walletType, setWalletType] = useState('my');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState({
    my: 1500,
    principle: 3200,
    emgt: 1000,
  });

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > balance[walletType]) {
      toast.error('Insufficient balance in selected wallet');
      return;
    }

    toast.success('Withdraw request submitted!');
    setAmount('');
  };

  const getWalletLabel = (type) => {
    switch (type) {
      case 'my': return 'My Wallet';
      case 'principle': return 'Principle Wallet';
      case 'emgt': return 'EMGT Wallet';
      default: return '';
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-[#12212154] backdrop-blur-xl border-gradient border p-6 rounded-xl text-white shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center">Withdraw Funds</h2>

      {/* Wallet Selector */}
      <div>
        <label className="block text-slate-400 text-sm mb-1">Select Wallet</label>
        <div className="flex items-center bg-transparent border border-white/10 rounded-md gap-3 px-3 py-1">
          <div className="aspect-[1/1] glow-text bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <TbWallet className="m-2" />
          </div>
          <select
            value={walletType}
            onChange={(e) => setWalletType(e.target.value)}
            className="w-full py-2 bg-transparent text-white focus:outline-none"
          >
            <option value="my" className='bg-gray-800' >My Wallet</option>
            <option value="principle" className='bg-gray-800' >Principle Wallet</option>
            <option value="emgt" className='bg-gray-800' >EMGT Wallet</option>
          </select>
        </div>
      </div>

      {/* Balance Info */}
      <div className="flex items-center justify-between bg-transparent border border-white/10 px-4 py-3 rounded-md text-slate-300 text-sm">
        <div className="flex items-center gap-2">
          <MdOutlineAccountBalanceWallet className="text-green-400 text-xl" />
          Available Balance in {getWalletLabel(walletType)}:
        </div>
        <span className="text-white font-semibold">${balance[walletType]}</span>
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-slate-400 text-sm mb-1">Enter Amount</label>
        <div className="flex items-center bg-transparent border border-white/10 rounded-md gap-3 px-3 py-1">
          <div className="aspect-[1/1] glow-text bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <FiDollarSign className="m-2" />
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full py-2 bg-transparent text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Withdraw Button */}
      <button
        onClick={handleWithdraw}
        className="w-full py-2 rounded-md font-semibold text-white bg-gradient-to-r from-[#2298d341] to-[#05CE99] hover:opacity-90 transition"
      >
        Withdraw
      </button>
    </div>
  );
};

export default Withdrawals;
