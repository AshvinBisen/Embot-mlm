import { FaArrowCircleDown, FaArrowCircleUp, FaExchangeAlt, FaWallet } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wallets = () => {
    const wallets = [
        {
            name: 'My Wallet',
            balance: 1540.25,
        },
        {
            name: 'Principle Wallet',
            balance: 2398.75,
        },
        {
            name: 'Emgt Wallet',
            balance: 2398.75,
        }
    ];

    const handleDeposit = (walletName) => {
        toast.success(`Deposit clicked for ${walletName}`);
    };

    const handleWithdraw = (walletName) => {
        toast.info(`Withdraw clicked for ${walletName}`);
    };

    const handleSwap = (walletName) => {
        toast.warning(`Swap clicked for ${walletName}`);
    };

    return (
        <>
            <h2 className="text-2xl text-primary   font-bold mb-6">  Wallets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wallets.map((wallet, idx) => (
                    <div
                        key={idx}
                        className="rounded-xl border border-gradient shadow-lg shadow-slate-800/40 bg-[#12212154] backdrop-blur-xl p-5 text-white space-y-4 "
                    >
                        <div className="flex gap-3 flex-wrap-reverse items-center justify-between">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <FaWallet className="text-primary" />
                                {wallet.name}
                            </h2>
                            <span className="text-sm text-slate-400">Wallet #{idx + 1}</span>
                        </div>

                        <div className="text-3xl  text-secondary">
                            $ {wallet.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                            <button
                                onClick={() => handleDeposit(wallet.name)}
                                className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-md shadow-emerald-800/30 transition-all duration-200"
                            >
                                <div  >
                                    <FaArrowCircleDown className='w-5 aspect-[1/1]' />
                                </div>
                                <p>
                                    Deposit
                                </p>
                            </button>

                            <button
                                onClick={() => handleWithdraw(wallet.name)}
                                className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md bg-gradient-to-br from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 shadow-md shadow-yellow-800/30 transition-all duration-200"
                            >
                                <div>
                                    <FaArrowCircleUp />
                                </div>
                                <p>
                                    Withdraw
                                </p>
                            </button>

                            <button
                                onClick={() => handleSwap(wallet.name)}
                                className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-md shadow-blue-800/30 transition-all duration-200"
                            >
                                <div>

                                <FaExchangeAlt />
                                </div>
                                <p>
                                Swap

                                </p>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Wallets;
