import React, { useState } from "react";

const usersData = [
  {
    id: 1,
    wallet: "0xAbc123...456",
    email: "ashvin@example.com",
    package: "Premium",
    earnings: { usd: 1200, emgt: 350 },
  },
  {
    id: 2,
    wallet: "0xDef456...789",
    email: "john@example.com",
    package: "Starter",
    earnings: { usd: 300, emgt: 90 },
  },
  {
    id: 3,
    wallet: "0x987654...321",
    email: "jane@example.com",
    package: "Gold",
    earnings: { usd: 600, emgt: 150 },
  },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = usersData.filter((user) =>
    `${user.wallet} ${user.email} ${user.package}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by wallet, email or package..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-600 font-medium">
            <tr>
              <th className="px-4 py-3">Wallet Address</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Investment Package</th>
              <th className="px-4 py-3">Total Earnings (USD / EMGT)</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{user.wallet}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.package}</td>
                  <td className="px-4 py-2">
                    ${user.earnings.usd} / {user.earnings.emgt} EMGT
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="px-3 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
