import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/adminImages/Logo/logo_main.png';
import bgImage from '../../assets/adminImages/images/bg_login.jpg';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Countdown for resend OTP
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = () => {
    if (!email) return alert("Please enter your email.");
    setOtpSent(true);
    setTimer(60);
    console.log("OTP sent for password reset to:", email);
    // API call to send OTP
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) return alert("Please enter OTP.");
    console.log("OTP submitted:", { email, otp });
    // API call to verify OTP and proceed
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className={`w-full max-w-md shadow-xl rounded-xl p-8 backdrop-blur-md bg-white/90 border border-white/30 transition-all duration-700 transform ${
          animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-14 w-auto" />
        </div>

        {/* Heading */}
        <h2 className="text-[28px] text-center font-bold text-[#103944] mb-6">
          Forgot Password
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label className="block text-[#103944] font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 mb-4 border border-[#103944] rounded outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {otpSent && (
            <>
              <label className="block text-[#103944] font-semibold mb-1">OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-2 mb-4 border border-[#103944] rounded outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              <div className="flex items-center justify-between mb-4">
                {timer > 0 ? (
                  <span className="text-sm text-gray-600">
                    OTP expires in {timer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </>
          )}

          <div className="flex justify-center">
            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-[120px] bg-[#103944] text-white py-2 rounded hover:bg-[#0e9d52] transition"
              >
                Send OTP
              </button>
            ) : (
              <button
                type="submit"
                className="w-[120px] bg-[#103944] text-white py-2 rounded hover:bg-[#0e9d52] transition"
              >
                Submit
              </button>
            )}
          </div>
        </form>

        {/* Link to Login */}
        <div className="text-right mt-4">
          <Link
            to="/admin/login"
            className="text-[15px] text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
