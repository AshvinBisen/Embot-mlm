import React, { useState } from "react";

const Deposit = () => {
  const [formData, setFormData] = useState({
    userName: "",
    amount: "",
    walletType: "My Wallet",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    console.log("Sending OTP...");
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp === "123456") {
      const existing = JSON.parse(localStorage.getItem("deposits")) || [];
      const newDeposit = {
        ...formData,
        timestamp: new Date().toISOString(), // Add timestamp for uniqueness
      };
      localStorage.setItem("deposits", JSON.stringify([...existing, newDeposit]));
      alert("Deposit successful!");

      // Reset form
      setFormData({ userName: "", amount: "", walletType: "My Wallet" });
      setOtp("");
      setOtpSent(false);
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          User Deposit
        </h2>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="block text-[16px] font-medium text-[#103944] mb-1">
                User Name
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-[16px] font-medium text-[#103944] mb-1">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-[16px] font-medium text-[#103944] mb-1">
                Wallet Type
              </label>
              <select
                name="walletType"
                value={formData.walletType}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="My Wallet">My Wallet</option>
                <option value="Principle">Principle Wallet</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-[160px] mt-4 bg-[#103944] hover:bg-[#0e9d52] text-white font-medium py-2 px-4 rounded-md transition"
              >
                Send OTP
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="block text-[16px] font-medium text-[#103944] mb-1">
                Enter OTP (sent to your email)
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-[160px] bg-[#103944] hover:bg-[#0e9d52] text-white font-medium py-2 px-4 rounded-md transition"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Deposit;
