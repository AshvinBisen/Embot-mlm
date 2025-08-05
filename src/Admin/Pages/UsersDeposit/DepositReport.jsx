import React, { useEffect, useState } from "react";

const DepositReport = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("deposits")) || [];
    setDeposits(data);
  }, []);

  return (
    <div className="p-6 md:p-10 bg-[#fff] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#103944] mb-6">Deposit Report</h2>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#103944] text-white text-left text-sm">
                <th className="px-4 py-3">S.No.</th>
                <th className="px-4 py-3">User Name</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Wallet Type</th>
              </tr>
            </thead>
            <tbody>
              {deposits.length > 0 ? (
                deposits.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 text-sm text-gray-700"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{item.userName}</td>
                    <td className="px-4 py-3">${item.amount}</td>
                    <td className="px-4 py-3">{item.walletType}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No deposit records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepositReport;
