import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import EMicon from '../../assets/adminImages/Logo/icon1.png';
import logo from '../../assets/adminImages/Logo/logo_main.png';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dropdownRef = useRef();
  const navigate = useNavigate(); // ✅ For redirecting on logout

  const handleToggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // ✅ Clear token
    navigate("/admin/login"); // ✅ Redirect to login
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditProfileClick = () => {
    setShowModal(true);
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccessMessage("");
  };

  const handleSave = () => {
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => {
      setSuccessMessage("");
      setShowModal(false);
    }, 3000);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 text-[#103944] font-semibold focus:outline-none"
      >
        <img src={EMicon} alt="EM bot" className="h-6" />
        <span className="uppercase">Hi, EM Bot</span>
        <FaChevronDown className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <ul className="text-sm text-[#103944]">
            <li
              onClick={handleEditProfileClick}
              className="px-4 py-2 hover:bg-[#103944] hover:text-white flex items-center gap-2 cursor-pointer"
            >
              <FaUser />
              <span>Edit Profile</span>
            </li>
            <li
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-[#103944] flex items-center gap-2 text-red-500 cursor-pointer border-t"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
            {/* Logo */}
            <div className="flex flex-col items-center mb-4">
              <img src={logo} alt="Admin Logo" className="h-14 mb-2" />
              <h2 className="text-2xl font-bold text-[#103944]">Edit Admin Profile</h2>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 w-full bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
                {successMessage}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#103944] mb-1">Admin ID</label>
                <input
                  type="text"
                  value="admin123"
                  disabled
                  className="w-full px-4 py-2 rounded border bg-gray-100 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#103944] mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#103944]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#103944] mb-1">Email</label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#103944]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 bg-gray-300 text-[#103944] rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[#103944] text-white rounded hover:bg-[#08242f] transition"
              >
                Save
              </button>
            </div>

            {/* Close Button on top right */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
