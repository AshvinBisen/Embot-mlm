import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaDollarSign } from 'react-icons/fa';
import { SiExpensify, SiTether } from 'react-icons/si';

const Swap = () => {
    const usdtBalance = 1000;
    const swapFeePercent = 5;

    const [form, setForm] = useState({
        usdt: '',
        emgt: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'usdt') {
            const fee = (value * swapFeePercent) / 100;
            const emgt = value - fee;
            setForm({
                usdt: value,
                emgt: value ? emgt.toFixed(2) : '',
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const usdt = parseFloat(form.usdt);
        const emgt = parseFloat(form.emgt);

        if (!usdt || usdt <= 0 || usdt > usdtBalance) {
            toast.error('Enter a valid USDT amount within your balance.');
            return;
        }

        toast.success(`Swapped ${usdt} USDT for ${emgt} EMGT`);
        setForm({ usdt: '', emgt: '' });
    };

    return (
        <div className="max-w-xl mx-auto bg-[#12212154] backdrop-blur-xl border-gradient border p-6 rounded-xl text-white shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-center">Swap (USDT → EMGT)</h2>

            {/* Balance */}
            <div className="text-sm text-slate-300 text-center">
                Your USDT Balance: <span className="text-white text-lg font-semibold">${usdtBalance}</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* USDT Input */}
                <div className="relative">
                    <label className="block text-slate-400 text-sm mb-1">USDT Amount</label>
                    <div className="flex items-center bg-transparent border border-white/10 rounded-md px-3">
                        <SiTether className="text-slate-400 mr-2" />
                        <input
                            type="number"
                            step="0.01"
                            name="usdt"
                            value={form.usdt}
                            onChange={handleChange}
                            placeholder="Enter USDT"
                            className="w-full py-2 bg-transparent text-white focus:outline-none"
                        />
                    </div>
                </div>

                {/* EMGT Output */}
                <div className="relative">
                    <label className="block text-slate-400 text-sm mb-1">You’ll Receive (EMGT)</label>
                    <div className="flex items-center bg-transparent border border-white/10 rounded-md px-3">
                        <SiExpensify className="text-slate-400 mr-2" />
                        <input
                            type="number"
                            step="0.01"
                            name="emgt"
                            value={form.emgt}
                            disabled
                            placeholder="EMGT Amount"
                            className="w-full py-2 bg-transparent text-white focus:outline-none"
                        />
                    </div>
                </div>

                {/* Fee Display */}
                {form.usdt && (
                    <div className="flex justify-between text-sm text-slate-400">
                        <span>Swap Fee ({swapFeePercent}%)</span>
                        <span className="text-white">
                            ${((form.usdt * swapFeePercent) / 100).toFixed(2)}
                        </span>
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 rounded-md font-semibold text-white bg-gradient-to-r from-[#2298d341] to-[#05CE99] hover:opacity-90 transition"
                >
                    Swap Now
                </button>
            </form>
        </div>
    );
};

export default Swap;
