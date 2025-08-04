import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import ProfileUpdate from "../../assets/userImages/images/profileUpdate.webp";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [dob, setDob] = useState(null);
  const [dobError, setDobError] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleProfileSubmit = () => {
    if (!dob) {
      setDobError(true);
      toast.error("Please select your date of birth");
    } else {
      setDobError(false);
      toast.success("Profile updated successfully!");
      // You can now trigger your API update here
    }
  };

  const handlePasswordSubmit = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      toast.error("Please fill in all password fields");
    } else if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      toast.error("Passwords don't match");
    } else {
      setPasswordError('');
      toast.success("Password reset successful!");
      // Trigger password update API here
    }
  };

  return (
    <div className="bg-[#12212154] backdrop-blur-xl border border-slate-700 border-gradient shadow-md shadow-slate-800/50 text-white p-5 rounded-md">
      {/* <ToastContainer /> */}
      {/* Tabs */}
      <div className="flex border-b border-slate-600 mb-6">
        {['Personal Details', 'Password Details'].map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx === 0 ? 'personal' : 'password')}
            className={`px-4 py-2 text-sm font-semibold ${activeTab === (idx === 0 ? 'personal' : 'password')
              ? 'text-white border-b-2 border-blue-400 bg-blue-900/30 rounded-t'
              : 'text-slate-400'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Personal Details Form */}
      {activeTab === 'personal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input type="text" value="TEST" readOnly className="w-full bg-transparent border-b border-slate-500 focus:outline-none text-white" />
            </div>
            <div>
              <label className="block text-sm mb-1">Mobile Number</label>
              <input type="text" value="9876543256" readOnly className="w-full bg-transparent border-b border-slate-500 focus:outline-none text-white" />
            </div>
            <div>
              <label className="block text-sm mb-1">Date Of Birth</label>
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                className={`w-full bg-transparent border-b ${dobError ? 'border-red-500' : 'border-slate-500'} focus:outline-none text-white`}
                placeholderText="Select a date"
                dateFormat="Pp"
                popperPlacement="bottom-start"
                popperModifiers={[
                  {
                    name: 'offset',
                    options: { offset: [0, 10] },
                  },
                ]}
              />
              {dobError && <p className="text-sm text-red-500 mt-1">Date of Birth is required</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Email Id</label>
              <input type="text" value="surendra@testcallback.com" readOnly className="w-full bg-transparent border-b border-slate-500 focus:outline-none text-white" />
            </div>
            <div>
              <label className="block text-sm mb-1">Country Name</label>
              <input type="text" value="India" readOnly className="w-full bg-transparent border-b border-slate-500 focus:outline-none text-white" />
            </div>

            <button onClick={handleProfileSubmit} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm rounded mt-4">
              Profile Update
            </button>
          </div>

          {/* Right Side Image */}
          <div className="flex justify-center items-center">
            <div className="w-[24rem] rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/70 flex items-center justify-center">
              <img src={ProfileUpdate} alt="Profile" />
            </div>
          </div>
        </div>
      )}

      {/* Password Change Form */}
      {activeTab === 'password' && (
        <div className="max-w-xl space-y-6">
          <div className="relative">
            <label className="block text-sm mb-1">Old Password</label>
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full bg-transparent border-b border-slate-500 focus:outline-none text-white pr-10"
            />
            <span onClick={() => setShowOld(!showOld)} className="absolute right-2 top-7 text-slate-400 cursor-pointer">
              {showOld ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative">
            <label className="block text-sm mb-1">New Password</label>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-transparent border-b border-slate-500 focus:outline-none text-white pr-10"
            />
            <span onClick={() => setShowNew(!showNew)} className="absolute right-2 top-7 text-slate-400 cursor-pointer">
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative">
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border-b border-slate-500 focus:outline-none text-white pr-10"
            />
            <span onClick={() => setShowConfirm(!showConfirm)} className="absolute right-2 top-7 text-slate-400 cursor-pointer">
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}

          <button onClick={handlePasswordSubmit} className="px-6 py-2 bg-green-600 hover:bg-green-700 transition-colors text-white text-sm rounded">
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
