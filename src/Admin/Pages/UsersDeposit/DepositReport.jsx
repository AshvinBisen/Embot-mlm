import React, { useEffect, useState } from "react";

const DepositReport = () => {
  const [deposits, setDeposits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("deposits")) || [];
    setDeposits(data);
  }, []);

  const totalPages = Math.ceil(deposits.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = deposits.slice(startIndex, startIndex + rowsPerPage);

  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < totalPages;

  const handlePrevious = () => {
    if (canPreviousPage) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (canNextPage) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#103944]">Deposit Report</h2>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-[#103944] text-white uppercase">
            <tr>
              <th className="px-4 py-2 whitespace-nowrap">S.No.</th>
              <th className="px-4 py-2 whitespace-nowrap">User Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Amount</th>
              <th className="px-4 py-2 whitespace-nowrap">Wallet Type</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.length > 0 ? (
              currentRows.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap">{startIndex + index + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.userName}</td>
                  <td className="px-4 py-2 whitespace-nowrap">${item.amount}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.walletType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-6 py-8 text-gray-500 text-sm">
                  No deposit records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {deposits.length > rowsPerPage && (
          <div className="flex items-center justify-end mt-4">
            <span className="mr-4 text-[16px] font-semibold text-[#103944]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handlePrevious}
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
              onClick={handleNext}
              disabled={!canNextPage}
              className={`px-4 py-2 font-semibold rounded ${
                canNextPage
                  ? "bg-[#103944] text-[#FFF] hover:bg-[#0e9d52]"
                  : "bg-[#103944] text-[#FFF] cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositReport;
