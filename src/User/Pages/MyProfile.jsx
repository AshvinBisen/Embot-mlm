import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaEye, FaEyeSlash, FaUser, FaPhone, FaCalendarAlt, FaEnvelope, FaGlobe, FaKey } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import ProfileUpdate from "../../assets/userImages/images/profileUpdate.webp";
import Footer from '../Components/Comman/Footer';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    dob: null,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDobChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!formData.dob) {
      setErrors({ dob: 'Date of Birth is required' });
      toast.error("Please select your date of birth");
    } else {
      setErrors({});
      toast.success("Profile updated successfully!");
      // API call here
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;
    const errorObj = {};
    if (!oldPassword || !newPassword || !confirmPassword) {
      errorObj.password = 'All fields are required';
    } else if (newPassword !== confirmPassword) {
      errorObj.password = "Passwords don't match";
    }
    if (Object.keys(errorObj).length > 0) {
      setErrors(errorObj);
      toast.error(errorObj.password);
    } else {
      setErrors({});
      toast.success("Password reset successful!");
      // API call here
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="bg-[#12212154] backdrop-blur-xl border border-slate-700 border-gradient shadow-md shadow-slate-800/50 text-white p-5 rounded-md">
        {/* Tabs */}
        <div className="flex border-b border-slate-600 mb-6">
          {['Personal Details', 'Password Details'].map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx === 0 ? 'personal' : 'password')}
              className={`px-4 py-2 text-sm font-semibold ${activeTab === (idx === 0 ? 'personal' : 'password')
                ? 'text-white border-b-2 border-blue-400 bg-gradient-to-b from-green-400/20 to-sky-400/50 rounded-t'
                : 'text-slate-400'} `}>
              {tab}
            </button>
          ))}
        </div>

        {/* Personal Details Form */}
        {activeTab === 'personal' && (
          <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm mb-1 font-bold flex items-center gap-2">
                  <FaUser className="text-sky-500" /> Name
                </label>
                <input type="text" value="TEST" readOnly className="w-full bg-transparent border-b border-slate-500 focus:outline-none text-white" />
              </div>
              <div>
                <label className="text-sm mb-1 font-bold flex items-center gap-2">
                  <FaPhone className="text-sky-500" /> Mobile Number
                </label>
                <input type="text" value="9876543256" readOnly className="w-full bg-transparent border-b border-slate-500 focus:outline-none text-white" />
              </div>
              <div>
                <label className="text-sm mb-1 font-bold flex items-center gap-2">
                  <FaCalendarAlt className="text-sky-500" /> Date Of Birth
                </label>
                <DatePicker
                  selected={formData.dob}
                  onChange={handleDobChange}
                  className={`w-full bg-transparent border-b ${errors.dob ? 'border-red-500' : 'border-slate-500'} focus:outline-none text-white`}
                  placeholderText="Select a date"
                  dateFormat="Pp"
                  popperPlacement="bottom-start"
                />
                {errors.dob && <p className="text-sm text-red-500 mt-1">{errors.dob}</p>}
              </div>
              <div>
                <label className="text-sm mb-1 font-bold flex items-center gap-2">
                  <FaEnvelope className="text-sky-500" /> Email Id
                </label>
                <input type="text" value="surendra@testcallback.com" readOnly className="w-full bg-transparent border-b border-slate-500 focus:outline-none text-white" />
              </div>
              <div>
                <label className="text-sm mb-1 font-bold flex items-center gap-2">
                  <FaGlobe className="text-sky-500" /> Country Name
                </label>
                <input type="text" value="India" readOnly className="w-full bg-transparent border-b border-slate-500 focus:outline-none text-white" />
              </div>

              <button type="submit" className="px-6 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white text-sm rounded mt-4">
                Profile Update
              </button>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-[24rem] rounded-lg bg-gradient-to-br from-slate-900/70 to-sky-800/50 flex items-center justify-center">
                <img src={ProfileUpdate} alt="Profile" />
              </div>
            </div>
          </form>
        )}

        {/* Password Details Form */}
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="max-w-xl space-y-6">
            {['oldPassword', 'newPassword', 'confirmPassword'].map((field, idx) => (
              <div className="relative" key={idx}>
                <label className="text-sm mb-1 font-bold flex items-center gap-2">
                  <FaKey className="text-sky-500" /> {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={showPassword[field.replace('Password', '').toLowerCase()] ? 'text' : 'password'}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-slate-500 focus:outline-none text-white pr-10"
                />
                <span
                  onClick={() => setShowPassword(prev => ({ ...prev, [field.replace('Password', '').toLowerCase()]: !prev[field.replace('Password', '').toLowerCase()] }))}
                  className="absolute right-2 top-7 text-slate-400 cursor-pointer"
                >
                  {showPassword[field.replace('Password', '').toLowerCase()] ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            ))}
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            <button type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-700 transition-colors text-white text-sm rounded">
              Reset Password
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;