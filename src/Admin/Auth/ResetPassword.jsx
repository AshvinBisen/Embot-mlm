import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/adminImages/Logo/logo_main.png';
import bgImage from '../../assets/adminImages/images/bg_login.jpg'; // Background image path

const ResetPassword = () => {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset Password Form Data:", form);
    // Add logic for reset password
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[100px] bg-[#103944] text-white py-2 rounded-md hover:bg-[#0e9d52] transition duration-300"
            >
              Submit
            </button>
          </div>


          <div className="text-center mt-4">
            <Link to="/admin/login" className="text-blue-600 hover:underline text-sm">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
