// pages/ReferralIncome.js
import React, { useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const ReferralIncome = () => {
  const [searchInput, setSearchInput] = useState("");

  const data = useMemo(
    () => [
      {
        userName: "Mark Henry",
        userWallet: "0xABC1234567890DEF",
        level: "1",
        amount: "90",
        date: "2025-08-05",
      },
      {
        userName: "Elena Smith",
        userWallet: "0xDEF7891234560ABC",
        level: "2",
        amount: "180",
        date: "2025-08-06",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: "S.No.", accessor: (_row, i) => i + 1, id: "sno" },
      { Header: "User Name", accessor: "userName" },
      { Header: "User Wallet", accessor: "userWallet" },
      { Header: "Level", accessor: "level" },
      { Header: "Amount (USD)", accessor: "amount" },
      { Header: "Date", accessor: "date" },
    ],
    []
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Referral Income Report", 14, 10);
    autoTable(doc, {
      head: [["S.No.", "User Name", "User Wallet", "Level", "Amount (USD)", "Date"]],
      body: data.map((row, i) => [
        i + 1,
        row.userName,
        row.userWallet,
        row.level,
        row.amount,
        row.date,
      ]),
    });
    doc.save("referral_income.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((row, i) => ({
        "S.No.": i + 1,
        "User Name": row.userName,
        "User Wallet": row.userWallet,
        Level: row.level,
        "Amount (USD)": row.amount,
        Date: row.date,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ReferralIncome");
    XLSX.writeFile(workbook, "referral_income.xlsx");
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  );

  const handleSearch = () => {
    setGlobalFilter(searchInput);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#103944] mb-4">Referral Income</h1>

      {/* Top Controls */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={exportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
          >
            Export PDF
          </button>
          <button
            onClick={exportExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
          >
            Export Excel
          </button>
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-[#103944] text-white px-4 py-2 rounded hover:bg-[#0e9d52] text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table
          {...getTableProps()}
          className="min-w-full text-sm text-left text-gray-800"
        >
          <thead className="bg-[#103944] text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="px-4 py-2" key={column.id}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id} className="border-b">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="px-4 py-2" key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4">
        <span className="text-sm text-gray-600 mr-4">
          Page {state.pageIndex + 1} of {pageOptions.length}
        </span>
        <div>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-2 mr-2 font-semibold rounded bg-[#103944] text-white hover:bg-[#0e9d52] disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-2 font-semibold rounded bg-[#103944] text-white hover:bg-[#0e9d52] disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralIncome;
