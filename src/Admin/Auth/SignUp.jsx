import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/adminImages/Logo/logo_main.png';
import bgImage from '../../assets/adminImages/images/bg_login.jpg';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validatePassword = (password) => {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };

  const handleSendOtp = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must include uppercase, lowercase and a number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess("");
      return;
    }

    // Clear errors and show success
    setErrors({});
    setSuccess("✅ OTP sent successfully to your email.");
    setOtpSent(true);
    setTimer(60);
    console.log("OTP sent to:", email);
    // ➕ You can add actual API call here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    else if (!validatePassword(password)) newErrors.password = "Password must include uppercase, lowercase and a number";

    if (!otp) newErrors.otp = "OTP is required";
    else if (otp.length !== 6 || isNaN(otp)) newErrors.otp = "OTP must be exactly 6 digits";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess("");
    } else {
      setErrors({});
      console.log("SignUp Data:", { email, password, otp });
      setSuccess("🎉 Account created successfully! Redirecting...");
      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
    }
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
        <h2 className="text-[28px] text-center font-bold text-[#103944] mb-4">Admin Sign Up</h2>

        {success && (
          <div className="text-green-600 text-center text-sm mb-4">{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block text-[#103944] font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 mb-1 border border-[#103944] rounded outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-600 text-sm mb-2">{errors.email}</p>}

          <label className="block text-[#103944] font-semibold mb-1 mt-2">Password</label>
          <input
            type="password"
            placeholder="Create password"
            className="w-full p-2 mb-1 border border-[#103944] rounded outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-600 text-sm mb-2">{errors.password}</p>}

          {!otpSent ? (
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={
                  !email || !validateEmail(email) ||
                  !password || !validatePassword(password)
                }
                className={`w-[120px] py-2 rounded transition ${
                  !email || !validateEmail(email) ||
                  !password || !validatePassword(password)
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#103944] text-white hover:bg-[#0e9d52]"
                }`}
              >
                Send OTP
              </button>
            </div>
          ) : (
            <>
              <label className="block text-[#103944] font-semibold mb-1 mt-4">OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-2 mb-1 border border-[#103944] rounded outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {errors.otp && <p className="text-red-600 text-sm mb-2">{errors.otp}</p>}

              <div className="flex items-center justify-between mb-4 mt-1">
                {timer > 0 ? (
                  <span className="text-sm text-gray-600">OTP expires in {timer}s</span>
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

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-[120px] bg-[#103944] text-white py-2 rounded hover:bg-[#0e9d52] transition"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>

        <div className="text-right mt-4">
          <Link to="/admin/login" className="text-[15px] text-blue-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
