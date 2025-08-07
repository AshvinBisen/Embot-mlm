import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaCopy, FaWallet, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import 'react-toastify/dist/ReactToastify.css';

const Deposit = () => {
  const [method, setMethod] = useState('qr');
  const [depositType, setDepositType] = useState('usdt'); // 'usdt' or 'emgt'
  const [amount, setAmount] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);

  const walletAddress = '0x1234abcd5678efgh9012ijklmnopqrstuvw';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success('Wallet address copied!', {
      icon: <FaCheckCircle className="text-primary" />,
    });
  };

  const handleConnectWallet = () => {
    setWalletConnected(true);
    toast.success('Wallet connected!', {
      icon: <FaCheckCircle className="text-primary" />,
    });
  };

  const handleDeposit = () => {
    if (!walletConnected) {
      toast.error('Please connect your wallet first!', {
        icon: <FaTimesCircle className="text-red-400" />,
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Enter a valid amount!', {
        icon: <FaTimesCircle className="text-red-400" />,
      });
      return;
    }

    toast.success('Deposit successful!', {
      icon: <FaCheckCircle className="text-primary" />,
    });
  };

  return (
    <div className="bg-[#12212154] backdrop-blur-xl border border-slate-700 border-gradient shadow-md shadow-slate-800/50 text-white p-5 rounded-md max-w-2xl mx-auto">
      <div className="flex justify-center mb-6 border-b border-slate-600 gap-4">
        <button
          className={`px-4 py-2 rounded-t ${method === 'qr'
            ? 'text-white border-b-2 border-sky-400 bg-gradient-to-b from-primary/50 to-sky-400/50 rounded-t'
            : 'bg-slate-800/50'}`}
          onClick={() => setMethod('qr')}
        >
          Deposit via QR
        </button>
        <button
          className={`px-4 py-2 rounded-t md:text-base text-sm ${method === 'wallet'
            ? 'text-white border-b-2 border-sky-400 bg-gradient-to-b from-primary/50 to-sky-400/50 rounded-t'
            : 'bg-slate-800/50'}`}
          onClick={() => setMethod('wallet')}
        >
          Deposit via Wallet
        </button>
      </div>

      {method === 'qr' ? (
        <div className="space-y-4">
          {/* Dropdown for USDT / EMGT */}
          <div>
            <label className="block text-sm font-semibold mb-1">Select Token</label>
            <select
              value={depositType}
              onChange={(e) => setDepositType(e.target.value)}
              className="w-full bg-transparent border border-slate-800 px-4 py-2 rounded text-white focus:outline-none"
            >
              <option value="usdt" className='bg-gray-700' >Deposit in USDT</option>
              <option value="emgt" className='bg-gray-700' >Deposit in EMGT</option>
            </select>
          </div>

          {/* QR Code */}
          <div className="bg-gradient-to-br from-secondary/50 to-primary/50 p-4 rounded flex justify-center">
            <QRCode value={walletAddress} fgColor="#ffffff" bgColor="transparent" />
          </div>

          {/* Wallet Address with Copy Button */}
          <div>
            <label className="block text-sm font-semibold mb-1">Wallet Address</label>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded border border-slate-600">
              <span className="text-base truncate">{walletAddress}</span>
              <button onClick={copyToClipboard} className="ml-auto text-sky-400 hover:text-sky-300">
                <FaCopy />
              </button>
            </div>
          </div>

          {/* Warning */}
          <p className="text-yellow-400 text-sm mt-2">
            ⚠️ Pay the exact amount on the given network. Otherwise, funds will be lost.
          </p>
        </div>
      ) : (
        <div className="space-y-6 mt-10">
          {/* Connect Wallet */}
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-sky-700 rounded text-sm font-semibold"
              onClick={handleConnectWallet}
            >
              <FaWallet /> {walletConnected ? 'Connected' : 'Connect Wallet'}
            </button>
            {walletConnected && (
              <span className="text-primary text-sm">Wallet connected</span>
            )}
          </div>

          {/* Enter Amount */}
          <div>
            <label className="block text-sm font-semibold mb-1">Enter Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent border border-slate-600 px-4 py-2 rounded text-white focus:outline-none"
              placeholder="Enter amount"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleDeposit}
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-sm font-semibold"
          >
            Deposit
          </button>
        </div>
      )}
    </div>
  );
};

export default Deposit;
