import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/adminImages/Logo/logo_main.png';
import bgImage from '../../assets/adminImages/images/bg_login.jpg';

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      newErrors.password = "Password must be strong (uppercase, lowercase, number)";
    }

    return newErrors;
  };

  

  const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    setSuccess("");
  } else {
    console.log("Login Data:", form);
    setErrors({});
    setSuccess("Login successful!");

    // ✅ Simulate saving token
    localStorage.setItem("adminToken", "fake_admin_token");

    // ✅ Correct redirection
    setTimeout(() => {
      navigate("/admin/dashboard"); // Use absolute path
    }, 2000);
  }
};


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 transition-all duration-700"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className={`w-full max-w-md shadow-xl rounded-xl p-8 backdrop-blur-md bg-white/80 border border-white/30 transition-all duration-700 transform ${
          animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-14 w-auto drop-shadow-lg" />
        </div>

        {/* Heading */}
        <h2 className="text-[28px] text-center font-bold text-[#103944] mb-2">
          Welcome to Admin Panel
        </h2>
        <p className="text-[16px] text-center text-[#000] mb-6">
          Please login to continue
        </p>

        {/* Success Message */}
        {success && (
          <div className="text-green-600 text-sm text-center mb-4">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label className="block text-[#103944] font-semibold mb-1 text-[16px]">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 mb-1 border border-[#103944] rounded outline-none transition duration-300 focus:border-[#0e9d52] focus:ring-2 focus:ring-[#0e9d52]/30"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mb-3">{errors.email}</p>
          )}

          <label className="block text-[#103944] font-semibold mb-1 text-[16px]">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-2 mb-1 border border-[#103944] rounded outline-none transition duration-300 focus:border-[#0e9d52] focus:ring-2 focus:ring-[#0e9d52]/30"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mb-3">{errors.password}</p>
          )}

          {/* Submit */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-[120px] bg-[#103944] text-white py-2 rounded shadow-md hover:bg-[#0e9d52] transition duration-300 transform hover:scale-[1.02]"
            >
              Login
            </button>
          </div>

          {/* Links */}
          <div className="flex justify-between mt-4 text-[15px]">
            <Link to="/admin/forget-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
            <Link to="/admin/sign-up" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
