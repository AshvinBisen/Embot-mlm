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

const Sidebar = () => (
  <aside className={`fixed inset-y-0 left-0 w-20 flex flex-col items-center pt-8 ${glass} z-30`}>
    {[FaUsers, FaChartLine, FaHandHoldingUsd, FaGift].map((Icon, idx) => (
      <Icon key={idx} className="mb-8 text-3xl text-white hover:scale-110 transition-transform duration-200" />
    ))}
  </aside>
);

const StatCard = ({ title, value, icon: Icon, gradient }) => (
  <div
    className={`m-2 p-4 rounded-2xl flex items-center transition-transform hover:scale-105 ${glass} justify-start`}
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
  <div className="flex justify-between items-center border-b pb-2">
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

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white-100 via-blue-100 to-white">
      <Sidebar />
      <main className="flex-1 ml-10 p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#254A6B] to-[#234767] bg-clip-text text-transparent">
            Dashboard
          </h1>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {stats.map((item, idx) => (
            <StatCard key={idx} {...item} />
          ))}
        </section>

        <section className="flex flex-col gap-6 mt-10">
          <div className="bg-white/70 backdrop-blur-lg shadow-md rounded-2xl p-6 w-full">
            <h3 className="text-2xl font-semibold text-[#254A6B] mb-5">Latest Sign Ups</h3>
            {signUps.length === 0 ? (
              <div className="text-gray-500 text-center py-6">No data available.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="text-xs uppercase bg-[#254A6B] text-white rounded-t-xl">
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
                        className={`transition hover:bg-gray-100/60 ${idx % 2 === 0 ? 'bg-white/40' : 'bg-gray-50/50'} border-b border-gray-200 rounded-lg`}
                      >
                        <td className="px-5 py-4 whitespace-nowrap text-sm">{user.joiningDate}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                              user.status === 'Member' ? 'bg-[#10B25E]/20 text-[#10B25E]' : 'bg-red-100 text-red-600'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-medium">{user.name}</td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="bg-[#10B25E] hover:bg-[#0e9d52] text-white text-xs px-4 py-1.5 rounded-full shadow-md transition"
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

          <div className={`${glass} flex-1 rounded-xl p-6`}>
            <h3 className="font-bold text-xl mb-4 text-gray-700">Recent Tickets</h3>
            {/* <div className="text-gray-500">No data available.</div> */}
            <div className="overflow-x-auto">
  <table className="min-w-full text-sm text-left">
    <thead>
      <tr className="text-xs uppercase bg-[#254A6B] text-white">
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
          } border-b border-gray-200`}
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


        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden relative">
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-2 right-2 text-[#FFF] hover:text-red-600 text-2xl font-bold "
              >
                &times;
              </button>

              {/* Header Section */}
              <div className="bg-[#10B25E] p-6 flex flex-col items-center text-white">
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4"
                />
                <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
                <span
                  className={`mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                    selectedUser.status === 'Member'
                      ? 'bg-white text-[#10B25E]'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {selectedUser.status}
                </span>
              </div>

              {/* Info Section */}
              <div className="p-6 space-y-4 text-sm text-[#254A6B]">
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
