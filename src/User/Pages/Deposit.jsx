import { useState } from 'react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { FaCopy, FaWallet, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import 'react-toastify/dist/ReactToastify.css';

const Deposit = () => {
  const [method, setMethod] = useState('qr');
  const [amount, setAmount] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);

  const walletAddress = '0x1234abcd5678efgh9012ijklmnopqrstuvwx';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success('Wallet address copied!', {
      icon: <FaCheckCircle className="text-green-400" />,
      position: "top-center",
      className: 'bg-[#122121] text-white shadow-lg rounded-md',
      autoClose: 2000,
      transition: Slide,
    });
  };

  const handleConnectWallet = () => {
    // Simulate wallet connect
    setWalletConnected(true);
    toast.success('Wallet connected!', {
      icon: <FaCheckCircle className="text-green-400" />,
      position: "top-center",
      className: 'bg-[#122121] text-white shadow-lg rounded-md',
      autoClose: 2000,
      transition: Slide,
    });
  };

  const handleDeposit = () => {
    if (!walletConnected) {
      toast.error('Please connect your wallet first!', {
        icon: <FaTimesCircle className="text-red-400" />,
        position: "top-center",
        // className: 'bg-[#122121] text-white shadow-lg rounded-md',
        autoClose: 2000,
        transition: Slide,
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Enter a valid amount!', {
        icon: <FaTimesCircle className="text-red-400" />,
        position: "top-center",
        // className: 'bg-[#122121] text-white shadow-lg rounded-md',
        autoClose: 2000,
        transition: Slide,
      });
      return;
    }

    toast.success('Deposit successful!', {
      icon: <FaCheckCircle className="text-green-400" />,
      position: "top-center",
    //   className: 'bg-[#122121] text-white shadow-lg rounded-md',
      autoClose: 2000,
      transition: Slide,
    });
  };

  return (
    <div className="bg-[#12212154] backdrop-blur-xl border border-slate-700 border-gradient shadow-md shadow-slate-800/50 text-white p-6 rounded-md max-w-3xl mx-auto">
      {/* <ToastContainer /> */}

      <h2 className="text-2xl font-bold mb-6">Deposit</h2>

      <div className="flex mb-6 gap-4">
        <button
          className={`px-4 py-2 rounded text-sm font-semibold ${method === 'qr' ? 'bg-green-600' : 'bg-slate-700 hover:bg-slate-600'}`}
          onClick={() => setMethod('qr')}
        >
          Deposit via QR
        </button>
        <button
          className={`px-4 py-2 rounded text-sm font-semibold ${method === 'wallet' ? 'bg-green-600' : 'bg-slate-700 hover:bg-slate-600'}`}
          onClick={() => setMethod('wallet')}
        >
          Deposit via Wallet
        </button>
      </div>

      {method === 'qr' ? (
        <div className="space-y-4">
          <div className="bg-slate-900/30 p-4 rounded flex justify-center">
            <QRCode value={walletAddress} fgColor="#ffffff" bgColor="transparent" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Wallet Address</label>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded border border-slate-600">
              <span className="text-xs truncate">{walletAddress}</span>
              <button onClick={copyToClipboard} className="ml-auto text-blue-400 hover:text-blue-300">
                <FaCopy />
              </button>
            </div>
          </div>
          <p className="text-yellow-400 text-sm mt-2">
            ⚠️ Pay the exact amount on the given network. Otherwise, funds will be lost.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold"
              onClick={handleConnectWallet}
            >
              <FaWallet /> {walletConnected ? 'Connected' : 'Connect Wallet'}
            </button>
            {walletConnected && (
              <span className="text-green-400 text-sm">Wallet connected</span>
            )}
          </div>

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
