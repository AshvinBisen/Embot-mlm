import React, { useState } from 'react';
import {
  FaUserCheck,
  FaUserClock,
  FaUsers,
  FaGift,
  FaHandHoldingUsd,
  FaHourglassHalf,
  FaChartLine,
  FaDollarSign,
} from 'react-icons/fa';

const glass = "bg-white bg-opacity-40 backdrop-blur-md border border-white border-opacity-80 shadow-xl";

const StatCard = ({ title, value, icon: Icon, gradient }) => (
  <div
    className={`m-2 p-4 rounded-2xl flex items-center transition-transform hover:scale-105 ${glass} justify-start shadow-[inset_-7px_-6px_16.8px_-7px_#fff,inset_6px_10px_19.6px_-11px_#00000012,-12px_-11px_21px_4px_#fff,12px_11px_21.9px_#00000040]`}
    style={{ minWidth: '220px' }}
  >
    <div
      className="rounded-full p-4 mr-4 flex items-center justify-center"
      style={{ background: gradient }}
    >
      <Icon className="text-white text-3xl" />
    </div>
    <div className="flex flex-col text-align-start">
      <div className="text-gray-800 font-semibold font-24px">{title}</div>
      <div className="text-indigo-600 font-bold font-20px">{value}</div>
    </div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-2 z-1">
    <span className="font-medium">{label}</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

const stats = [
  { title: "Today's Member", value: 0, icon: FaUserCheck, gradient: 'linear-gradient(135deg,#36d1c4,#5b86e5)' },
  { title: 'Unpaid Member', value: 10, icon: FaUserClock, gradient: 'linear-gradient(135deg,#af67e9,#f68d7f)' },
  { title: 'ROI Income', value: '$9.6', icon: FaDollarSign, gradient: 'linear-gradient(135deg,#f7971e,#ffd200)' },
  { title: 'Level Income', value: '$6.08', icon: FaDollarSign, gradient: 'linear-gradient(135deg,#21d397,#7d5fff)' },
  { title: 'Referral Income', value: '$0', icon: FaGift, gradient: 'linear-gradient(135deg,#f7971e,#ffd200)' },
  { title: 'Total Income', value: '$15.68', icon: FaHandHoldingUsd, gradient: 'linear-gradient(135deg,#dd5e89,#f7bb97)' },
  { title: 'Paid Member', value: 9, icon: FaUserCheck, gradient: 'linear-gradient(135deg,#43cea2,#185a9d)' },
  { title: 'Total Members', value: 19, icon: FaUsers, gradient: 'linear-gradient(135deg,#6190e8,#a7bfe8)' },
  { title: "Today's Pending Withdraw", value: 0, icon: FaHourglassHalf, gradient: 'linear-gradient(135deg,#f7971e,#ffd200)' },
  { title: 'Total Pending Withdraw', value: 50, icon: FaHourglassHalf, gradient: 'linear-gradient(135deg,#eb5757,#000000)' },
  { title: "Today's Business", value: '$7000', icon: FaChartLine, gradient: 'linear-gradient(135deg,#fc5c7d,#6a82fb)' },
  { title: 'Total Business', value: '$8800', icon: FaChartLine, gradient: 'linear-gradient(135deg,#fc5c7d,#6a82fb)' },
];

const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState(null);

  const signUps = [
    {
      id: 1,
      name: 'Ram Verma',
      status: 'Member',
      joiningDate: '2025-08-04 10:30 AM',
      image: 'https://via.placeholder.com/100',
      sponsorName: 'Amit Sharma',
      email: 'ram@example.com',
      phone: '+91 9876543210',
      address: '123, Main Street, Delhi, India'
    },
    {
      id: 2,
      name: 'Ravi Sharma',
      status: 'Not a Member',
      joiningDate: '2025-08-03 04:10 PM',
      image: 'https://via.placeholder.com/100',
      sponsorName: 'Neha Gupta',
      email: 'ravi@example.com',
      phone: '+91 9123456789',
      address: '456, Central Avenue, Mumbai, India'
    },
  ];

  const handleUpdate = () => {
    if (price.trim() === '') {
      setMessage({ type: 'error', text: 'Please enter a valid price.' });
    } else {
      setMessage({ type: 'success', text: 'Price updated successfully!' });
      setPrice('');
    }

    // Clear the message after 3 seconds
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white-100 via-blue-100 to-white z-1">
      <main className="flex-1 min-h-screen p-4 md p-6 lg:ml-5 overflow-x-hidden overflow-y-auto">
        <div className="max-w-screen-2xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#103944] to-[#234767] bg-clip-text text-transparent">
              Dashboard
            </h1>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {stats.map((item, idx) => (
              <StatCard key={idx} {...item} />
            ))}
          </section>

          <section className="mt-10 flex flex-col lg:flex-row gap-6">
            {/* Left Side - Latest Transactions */}
            <div className={`${glass} lg:w-2/5 w-full p-6 rounded-xl shadow-[inset_-7px_-6px_16.8px_-7px_#fff,inset_6px_10px_19.6px_-11px_#00000012,-12px_-11px_21px_4px_#fff,12px_11px_21.9px_#00000040]`}>
              <h3 className="text-2xl font-semibold mb-4 text-[#103944]">Latest Transactions</h3>
              <div className="space-y-4">
                {[
                  {
                    user: 'Ram Verma',
                    amount: '$200',
                    type: 'Credit',
                    date: '2025-08-04 11:00 AM',
                  },
                  {
                    user: 'Ravi Sharma',
                    amount: '$150',
                    type: 'Debit',
                    date: '2025-08-03 04:30 PM',
                  },
                  {
                    user: 'Aman Yadav',
                    amount: '$500',
                    type: 'Credit',
                    date: '2025-08-02 03:20 PM',
                  },
                ].map((txn, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-white/70 shadow-sm">
                    <div>
                      <div className="font-medium text-[#103944]">{txn.user}</div>
                      <div className="text-xs text-gray-500">{txn.date}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${txn.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {txn.amount}
                      </div>
                      <div className="text-xs">{txn.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Manage Token Price & Wallet Request */}
            <div className="lg:w-3/5 w-full flex flex-col gap-6">
              {/* Manage Token Price */}
              <div className={`${glass} p-6 rounded-xl shadow-[inset_-7px_-6px_16.8px_-7px_#fff,inset_6px_10px_19.6px_-11px_#00000012,-12px_-11px_21px_4px_#fff,12px_11px_21.9px_#00000040]`}>
                <h3 className="text-2xl font-semibold mb-4 text-[#103944]">Manage Token Price</h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 grid-cols-1 gap-4 sm:grid-cols-none">
                  <label className="text-sm font-medium sm:w-1/3">Current Token Price</label>
                  
                  <input
                    type="text"
                    placeholder="$0.50"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full sm:w-2/3 px-4 py-2 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />

                  <button
                    onClick={handleUpdate}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#2298D3] text-white hover:bg-[#0e9d52] transition"
                  >
                    Update
                  </button>
                </div>

                {/* Message Display */}
                {message && (
                  <div
                    className={`mt-4 p-3 rounded-lg text-white text-sm font-medium ${
                      message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {message.text}
                  </div>
                )}
              </div>

              {/* User Wallet Request */}
              <div className={`${glass} p-6 rounded-xl shadow-[inset_-7px_-6px_16.8px_-7px_#fff,inset_6px_10px_19.6px_-11px_#00000012,-12px_-11px_21px_4px_#fff,12px_11px_21.9px_#00000040]`}>
                <h3 className="text-2xl font-semibold mb-4 text-[#103944]">User Wallet Requests</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left">
                    <thead>
                      <tr className="text-xs uppercase bg-[#103944] text-white">
                        <th className="px-5 py-3">User</th>
                        <th className="px-5 py-3">Amount</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3">Request Date</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {[
                        {
                          user: 'Ram Verma',
                          amount: '$300',
                          status: 'Pending',
                          date: '2025-08-04',
                        },
                        {
                          user: 'Ravi Sharma',
                          amount: '$100',
                          status: 'Approved',
                          date: '2025-08-03',
                        },
                      ].map((req, idx) => (
                        <tr
                          key={idx}
                          className={`transition hover:bg-gray-100/60 ${idx % 2 === 0 ? 'bg-white/40' : 'bg-gray-50/50'} border-b border-gray-400`}
                        >
                          <td className="px-5 py-4 font-medium">{req.user}</td>
                          <td className="px-5 py-4">{req.amount}</td>
                          <td className="px-5 py-4">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                                req.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">{req.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6 mt-10">
            <div className="bg-white/70 backdrop-blur-lg shadow-md rounded-2xl p-6 w-full shadow-[inset_-7px_-6px_16.8px_-7px_#fff,inset_6px_10px_19.6px_-11px_#00000012,-12px_-11px_21px_4px_#fff,12px_11px_21.9px_#00000040]">
              <h3 className="text-2xl font-semibold text-[#103944] mb-5">Latest Sign Ups</h3>
              {signUps.length === 0 ? (
                <div className="text-gray-500 text-center py-6">No data available.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left">
                    <thead>
                      <tr className="text-xs uppercase bg-[#103944] text-white rounded-t-xl">
                        <th className="px-5 py-3">Joining Date</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {signUps.map((user, idx) => (
                        <tr
                          key={user.id}
                          className={`transition hover:bg-gray-100/60 ${idx % 2 === 0 ? 'bg-white/40' : 'bg-gray-50/50'} border-b border-gray-400 rounded-lg`}
                        >
                          <td className="px-5 py-4 whitespace-nowrap text-sm">{user.joiningDate}</td>
                          <td className="px-5 py-4">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                                user.status === 'Member' ? 'bg-[#2298D3]/20 text-[#2298D3]' : 'bg-red-100 text-red-600'
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-medium">{user.name}</td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="bg-[#2298D3] hover:bg-[#0e9d52] text-white text-xs px-4 py-1.5 rounded-full shadow-md transition"
                            >
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className={`${glass} flex-1 rounded-xl p-6 shadow-[inset_-7px_-6px_16.8px_-7px_#fff,inset_6px_10px_19.6px_-11px_#00000012,-12px_-11px_21px_4px_#fff,12px_11px_21.9px_#00000040]`}>
              <h3 className="text-2xl font-semibold text-[#103944] mb-5">Recent Tickets</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="text-xs uppercase bg-[#103944] text-white">
                      <th className="px-5 py-3">Name</th>
                      <th className="px-5 py-3">Issue</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Ticket Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {[
                      {
                        name: 'Ram Verma',
                        issue: 'Technical Issue',
                        status: 'Processing',
                        date: '2025-08-04 09:45 AM',
                      },
                      {
                        name: 'Ravi Sharma',
                        issue: 'Bonus Issue',
                        status: 'Unread',
                        date: '2025-08-03 02:15 PM',
                      },
                      {
                        name: 'Aman Yadav',
                        issue: 'Other',
                        status: 'Read',
                        date: '2025-08-02 11:00 AM',
                      },
                    ].map((ticket, idx) => (
                      <tr
                        key={idx}
                        className={`transition hover:bg-gray-100/60 ${
                          idx % 2 === 0 ? 'bg-white/40' : 'bg-gray-50/50'
                        } border-b border-gray-400`}
                      >
                        <td className="px-5 py-4 font-medium whitespace-nowrap">{ticket.name}</td>
                        <td className="px-5 py-4">{ticket.issue}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                              ticket.status === 'Read'
                                ? 'bg-green-100 text-green-600'
                                : ticket.status === 'Unread'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">{ticket.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden relative">
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-2 right-2 text-[#FFF] hover:text-red-600 text-2xl font-bold"
              >
                &times;
              </button>

              {/* Header Section */}
              <div className="bg-[#2298D3] p-6 flex flex-col items-center text-white">
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4"
                />
                <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
                <span
                  className={`mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                    selectedUser.status === 'Member'
                      ? 'bg-white text-[#2298D3]'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {selectedUser.status}
                </span>
              </div>

              {/* Info Section */}
              <div className="p-6 space-y-4 text-sm text-[#103944]">
                <InfoRow label="Sponsor Name" value={selectedUser.sponsorName} />
                <InfoRow label="Email ID" value={selectedUser.email} />
                <InfoRow label="Contact No." value={selectedUser.phone} />
                <InfoRow label="Joining Date" value={selectedUser.joiningDate} />
                <InfoRow label="Address" value={selectedUser.address} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;