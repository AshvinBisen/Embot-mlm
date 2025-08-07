import React, { useEffect, useState, useMemo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const DepositReport = () => {
  const [deposits, setDeposits] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("deposits")) || [];
    setDeposits(data);
  }, []);

  const filteredDeposits = useMemo(() => {
    if (!searchInput) return deposits;
    return deposits.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, deposits]);

  const totalPages = Math.ceil(filteredDeposits.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredDeposits.slice(startIndex, startIndex + rowsPerPage);

  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < totalPages;

  const handlePrevious = () => {
    if (canPreviousPage) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (canNextPage) setCurrentPage((prev) => prev + 1);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["S.No.", "User Name", "Amount", "Wallet Type"];
    const tableRows = filteredDeposits.map((item, index) => [
      index + 1,
      item.userName,
      `$${item.amount}`,
      item.walletType,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("deposit_report.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredDeposits.map((item, index) => ({
        "S.No.": index + 1,
        "User Name": item.userName,
        Amount: item.amount,
        "Wallet Type": item.walletType,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DepositReport");
    XLSX.writeFile(workbook, "deposit_report.xlsx");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#103944]">Deposit Report</h2>

      {/* Export + Search Controls */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Export Buttons */}
        <div className="mb-2 md:mb-0">
          <button
            onClick={handleExportPDF}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 text-sm"
          >
            Export PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
          >
            Export Excel
          </button>
        </div>

        {/* Right: Search Bar */}
        <div className="flex items-center justify-end">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
          />
          <button
            onClick={() => {}}
            className="ml-2 bg-[#103944] text-white px-4 py-2 rounded hover:bg-[#0e9d52] text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
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
                  <td className="px-4 py-2 whitespace-nowrap">
                    {startIndex + index + 1}
                  </td>
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

        {/* Pagination */}
        {filteredDeposits.length > rowsPerPage && (
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
