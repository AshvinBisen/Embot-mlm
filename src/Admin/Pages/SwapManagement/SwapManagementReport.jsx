import React, { useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const SwapManagementReport = () => {
  const [searchInput, setSearchInput] = useState("");

  const data = useMemo(
    () => [
      {
        userName: "Alice",
        userWallet: "0xABC1234567890DEFABC1234567890DEF",
        swapFrom: "Token A",
        swapTo: "Token B",
        amount: 150,
        date: "2025-08-07 10:30 AM",
      },
      {
        userName: "Bob",
        userWallet: "0xDEF7890123456ABCDEF7890123456ABC",
        swapFrom: "Token C",
        swapTo: "Token A",
        amount: 200,
        date: "2025-08-06 09:15 AM",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "S.No.",
        accessor: (_row, i) => i + 1,
        id: "sno",
      },
      {
        Header: "User Name",
        accessor: "userName",
      },
      {
        Header: "User Wallet",
        accessor: "userWallet",
      },
      {
        Header: "Swap From",
        accessor: "swapFrom",
      },
      {
        Header: "Swap To",
        accessor: "swapTo",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Swap Management Report", 14, 10);
    autoTable(doc, {
      head: [["S.No.", "User Name", "User Wallet", "Swap From", "Swap To", "Amount", "Date"]],
      body: data.map((row, index) => [
        index + 1,
        row.userName,
        row.userWallet,
        row.swapFrom,
        row.swapTo,
        row.amount,
        row.date,
      ]),
    });
    doc.save("swap_management_report.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((row, index) => ({
        "S.No.": index + 1,
        "User Name": row.userName,
        "User Wallet": row.userWallet,
        "Swap From": row.swapFrom,
        "Swap To": row.swapTo,
        "Amount": row.amount,
        Date: row.date,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Swap Management");
    XLSX.writeFile(workbook, "swap_management_report.xlsx");
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

  const { pageIndex } = state;

  const handleSearch = () => {
    setGlobalFilter(searchInput);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#103944] mb-4">Swap Management Report</h1>

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

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table {...getTableProps()} className="min-w-full text-sm text-left text-gray-800">
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
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id || rowIndex} className="border-b">
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

      <div className="flex items-center justify-end mt-4">
        <span className="text-sm text-gray-600 mr-4">
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <div>
          <button
            onClick={previousPage}
            disabled={!canPreviousPage}
            className={`px-4 py-2 mr-2 font-semibold rounded ${
              canPreviousPage
                ? "bg-[#103944] text-white hover:bg-[#0e9d52]"
                : "bg-[#103944] text-white cursor-not-allowed"
            }`}
          >
            Prev
          </button>
          <button
            onClick={nextPage}
            disabled={!canNextPage}
            className={`px-4 py-2 font-semibold rounded ${
              canNextPage
                ? "bg-[#103944] text-white hover:bg-[#0e9d52]"
                : "bg-[#103944] text-white cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapManagementReport;
