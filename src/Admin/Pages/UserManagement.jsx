import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    {
      id: 1,
      sponsorId: 'SPONSOR100',
      userId: 'USER1000',
      password: 'pass123',
      myWallet: 50,
      eWallet: 100,
      principleWallet: 75,
      tradeProfitWallet: 30,
      reward: 'Reward',
      email: 'user1@mail.com',
      walletAddress: '0x12...abcd',
      investmentPackage: 'Gold',
      totalEarnings: '$150 / EMGT 200',
      registrationDate: '2025-08-01 10:30 AM',
      paidStatus: 'Paid',
      status: 'Active',
      blockStatus: 'Unblocked',
      usdtWithdraw: 'On',
      roi: 'On',
    },
    // Add more user objects...
  ]);

  const [showPassword, setShowPassword] = useState({});
  const [editUser, setEditUser] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 20;

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < totalPages - 1;

  const togglePasswordVisibility = (id) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuickLogin = (email, password) => {
    navigate(`/user/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  };

  const handleEdit = (user) => {
    setEditUser({ ...user });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    setUsers(users.map(user => 
      user.id === editUser.id ? editUser : user
    ));
    setEditUser(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPageIndex(0); // Reset to first page on search
  };

  const exportToExcel = () => {
    const data = filteredUsers.map((user) => ({
      'S.No.': user.id,
      'Sponsor ID': user.sponsorId,
      'User ID': user.userId,
      Password: user.password,
      'My Wallet': user.myWallet,
      'E Wallet': user.eWallet,
      'Principle Wallet': user.principleWallet,
      'Trade Profit Wallet': user.tradeProfitWallet,
      Reward: user.reward,
      'Email ID': user.email,
      'Wallet Address': user.walletAddress,
      'Investment Package': user.investmentPackage,
      'Total Earnings (USD/EMGT)': user.totalEarnings,
      'Registration Date': user.registrationDate,
      'Paid Status': user.paidStatus,
      Status: user.status,
      'Block Status': user.blockStatus,
      'USDT Withdraw': user.usdtWithdraw,
      ROI: user.roi,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'UserManagement.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const columns = [
      'S.No.', 'Sponsor ID', 'User ID', 'Password', 'My Wallet', 'E Wallet', 
      'Principle Wallet', 'Trade Profit Wallet', 'Reward', 'Email ID', 'Wallet Address',
      'Investment Package', 'Total Earnings (USD/EMGT)', 'Registration Date', 
      'Paid Status', 'Status', 'Block Status', 'USDT Withdraw', 'ROI'
    ];

    const data = filteredUsers.map((user) => [
      user.id, user.sponsorId, user.userId, user.password, user.myWallet, user.eWallet,
      user.principleWallet, user.tradeProfitWallet, user.reward, user.email, 
      user.walletAddress, user.investmentPackage, user.totalEarnings, user.registrationDate,
      user.paidStatus, user.status, user.blockStatus, user.usdtWithdraw, user.roi
    ]);

    let page = 1;
    let start = 0;

    while (start < data.length) {
      const pageData = data.slice(start, start + pageSize);
      autoTable(doc, {
        head: [columns],
        body: pageData,
        startY: page === 1 ? 20 : 10,
        theme: 'striped',
        headStyles: { fillColor: [16, 57, 68] },
        styles: { fontSize: 8, cellPadding: 2 },
        margin: { top: 20 },
        didDrawPage: () => {
          doc.setFontSize(10);
          doc.text(`Page ${page}`, doc.internal.pageSize.getWidth() - 30, 10);
        },
      });
      start += pageSize;
      if (start < data.length) {
        doc.addPage();
        page++;
      }
    }
    doc.save('UserManagement.pdf');
  };

  const getDropdownStyle = (value, field) => {
    if (field === 'paidStatus') {
      return value === 'Paid' 
        ? 'bg-green-100 text-green-800 border-green-300' 
        : 'bg-red-100 text-red-800 border-red-300';
    }
    if (field === 'status') {
      return value === 'Active' 
        ? 'bg-green-100 text-green-800 border-green-300' 
        : 'bg-red-100 text-red-800 border-red-300';
    }
    if (field === 'blockStatus') {
      return value === 'Unblocked' 
        ? 'bg-green-100 text-green-800 border-green-300' 
        : 'bg-red-100 text-red-800 border-red-300';
    }
    if (field === 'usdtWithdraw' || field === 'roi') {
      return value === 'On' 
        ? 'bg-green-100 text-green-800 border-green-300' 
        : 'bg-red-100 text-red-800 border-red-300';
    }
    if (field === 'reward') {
      return value === 'Reward' 
        ? 'bg-green-100 text-green-800 border-green-300' 
        : 'bg-red-100 text-red-800 border-red-300';
    }
    return '';
  };

  return (
    <div className="p-4 mx-auto max-w-[1260px] md:p-6">
      <h2 className="text-2xl font-bold mb-4 text-left text-[#103944]">
        User Management
      </h2>

      <div className="mb-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex gap-2 mb-4 md:mb-0">
          <button onClick={exportToPDF} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 text-sm">
            Export PDF
          </button>
          <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 text-sm">
            Export Excel
          </button>
        </div>
        <div className="flex items-center w-full md:w-auto">
          <input 
            placeholder="Search..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[#103944]" 
          />
          <button className="ml-2 bg-[#103944] text-white px-4 py-2 rounded-lg hover:bg-[#0e9d52] transition duration-200 text-sm">
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200 p-4">
        <table className="min-w-[1800px] w-full text-sm border">
          <thead className=" top-0  bg-[#103944] text-white">
            <tr className="text-left">
              <th className="p-2 border  left-0 z-2 bg-[#103944] whitespace-nowrap">S.No.</th>
              <th className="p-2 border whitespace-nowrap">Sponsor ID</th>
              <th className="p-2 border whitespace-nowrap">User ID</th>
              <th className="p-2 border whitespace-nowrap">Password</th>
              <th className="p-2 border whitespace-nowrap">My Wallet</th>
              <th className="p-2 border whitespace-nowrap">E Wallet</th>
              <th className="p-2 border whitespace-nowrap">Principle Wallet</th>
              <th className="p-2 border whitespace-nowrap">Trade Profit Wallet</th>
              <th className="p-2 border whitespace-nowrap">Reward</th>
              <th className="p-2 border whitespace-nowrap">Email ID</th>
              <th className="p-2 border whitespace-nowrap">Wallet Address</th>
              <th className="p-2 border whitespace-nowrap">Investment Package</th>
              <th className="p-2 border whitespace-nowrap">Total Earnings (USD/EMGT)</th>
              <th className="p-2 border whitespace-nowrap">Registration Date</th>
              <th className="p-2 border whitespace-nowrap">Paid Status</th>
              <th className="p-2 border whitespace-nowrap">Status</th>
              <th className="p-2 border whitespace-nowrap">Block Action</th>
              <th className="p-2 border whitespace-nowrap">USDT Withdraw</th>
              <th className="p-2 border whitespace-nowrap">ROI</th>
              <th className="p-2 border whitespace-nowrap">Quick Login</th>
              <th className="p-2 border whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="p-2 border left-0 bg-white z-10">{user.id}</td>
                <td className="p-2 border">{user.sponsorId}</td>
                <td className="p-2 border">{user.userId}</td>
                <td className="p-2 border">
                  <div className="flex items-center">
                    <span>{showPassword[user.id] ? user.password : '••••'}</span>
                    <button onClick={() => togglePasswordVisibility(user.id)} className="ml-2 text-gray-600 hover:text-gray-800">
                      {showPassword[user.id] ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </td>
                <td className="p-2 border">{user.myWallet}</td>
                <td className="p-2 border">{user.eWallet}</td>
                <td className="p-2 border">{user.principleWallet}</td>
                <td className="p-2 border">{user.tradeProfitWallet}</td>
                <td className="p-2 border">
                  <select
                    value={user.reward}
                    onChange={(e) => setUsers(users.map(u => u.id === user.id ? { ...u, reward: e.target.value } : u))}
                    className={`border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#103944] transition duration-200 ${getDropdownStyle(user.reward, 'reward')}`}
                  >
                    <option value="Reward">Reward</option>
                    <option value="No Reward">No Reward</option>
                  </select>
                </td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.walletAddress}</td>
                <td className="p-2 border">{user.investmentPackage}</td>
                <td className="p-2 border">{user.totalEarnings}</td>
                <td className="p-2 border">{user.registrationDate}</td>
                <td className="p-2 border">
                  <select
                    value={user.paidStatus}
                    onChange={(e) => setUsers(users.map(u => u.id === user.id ? { ...u, paidStatus: e.target.value } : u))}
                    className={`border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#103944] transition duration-200 ${getDropdownStyle(user.paidStatus, 'paidStatus')}`}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <select
                    value={user.status}
                    onChange={(e) => setUsers(users.map(u => u.id === user.id ? { ...u, status: e.target.value } : u))}
                    className={`border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#103944] transition duration-200 ${getDropdownStyle(user.status, 'status')}`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <select
                    value={user.blockStatus}
                    onChange={(e) => setUsers(users.map(u => u.id === user.id ? { ...u, blockStatus: e.target.value } : u))}
                    className={`border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#103944] transition duration-200 ${getDropdownStyle(user.blockStatus, 'blockStatus')}`}
                  >
                    <option value="Unblocked">Unblocked</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <select
                    value={user.usdtWithdraw}
                    onChange={(e) => setUsers(users.map(u => u.id === user.id ? { ...u, usdtWithdraw: e.target.value } : u))}
                    className={`border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#103944] transition duration-200 ${getDropdownStyle(user.usdtWithdraw, 'usdtWithdraw')}`}
                  >
                    <option value="On">On</option>
                    <option value="Off">Off</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <select
                    value={user.roi}
                    onChange={(e) => setUsers(users.map(u => u.id === user.id ? { ...u, roi: e.target.value } : u))}
                    className={`border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#103944] transition duration-200 ${getDropdownStyle(user.roi, 'roi')}`}
                  >
                    <option value="On">On</option>
                    <option value="Off">Off</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <button 
                    onClick={() => handleQuickLogin(user.email, user.password)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Login
                  </button>
                </td>
                <td className="p-2 border">
                  <button 
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-200"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
            <h3 className="text-3xl font-bold mb-6 text-center text-[#103944] border-b pb-2">
              User Profile Edit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(editUser).map((key) => (
                key !== 'id' && (
                  <div key={key} className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {['paidStatus', 'status', 'blockStatus', 'usdtWithdraw', 'roi', 'reward'].includes(key) ? (
                      <select
                        name={key}
                        value={editUser[key]}
                        onChange={handleEditChange}
                        className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#103944] transition duration-200 ${getDropdownStyle(editUser[key], key)}`}
                      >
                        {key === 'paidStatus' && (
                          <>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                          </>
                        )}
                        {key === 'status' && (
                          <>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </>
                        )}
                        {key === 'blockStatus' && (
                          <>
                            <option value="Unblocked">Unblocked</option>
                            <option value="Blocked">Blocked</option>
                          </>
                        )}
                        {(key === 'usdtWithdraw' || key === 'roi') && (
                          <>
                            <option value="On">On</option>
                            <option value="Off">Off</option>
                          </>
                        )}
                        {key === 'reward' && (
                          <>
                            <option value="Reward">Reward</option>
                            <option value="No Reward">No Reward</option>
                          </>
                        )}
                      </select>
                    ) : (
                      <input
                        type={key === 'password' ? 'password' : 'text'}
                        name={key}
                        value={editUser[key]}
                        onChange={handleEditChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#103944] transition duration-200"
                        placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim()}`}
                      />
                    )}
                  </div>
                )
              ))}
            </div>
            <div className="flex justify-end mt-8 space-x-4">
              <button 
                onClick={() => setEditUser(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={saveEdit}
                className="bg-[#103944] text-white px-6 py-2 rounded-lg hover:bg-[#0e9d52] transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end mt-4">
        <span className="text-sm text-gray-600 mr-4">
          Page {pageIndex + 1} of {totalPages}
        </span>
        <div>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`px-4 py-2 mr-2 font-semibold rounded ${
              canPreviousPage
                ? "bg-[#103944] text-[#FFF] hover:bg-[#0e9d52]"
                : "bg-[#103944] text-[#FFF] cursor-not-allowed"
            }`}
          >
            Prev
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`px-4 py-2 font-semibold rounded ${
              canNextPage
                ? "bg-[#103944]  text-[#FFF] hover:bg-[#0e9d52]"
                : "bg-[#103944] text-[#fff] cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;