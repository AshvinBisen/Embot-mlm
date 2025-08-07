import React, { useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const UserManagement = () => {
  const [showPasswordRow, setShowPasswordRow] = useState({});

  const data = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      sNo: i + 1,
      sponsorId: `SPONSOR${i + 100}`,
      userId: `USER${i + 1000}`,
      password: "user@123",
      myWallet: "50",
      eWallet: "100",
      tradeProfitWallet: "30",
      reward: i % 2 === 0 ? "Reward 1" : "No reward",
      email: `user${i + 1}@mail.com`,
      walletAddress: "0x12...abcd",
      package: "Gold",
      earnings: "$150 / EMGT 200",
      registrationDate: "2025-08-01",
      paidStatus: i % 2 === 0 ? "Paid" : "Unpaid",
      status: i % 2 === 0 ? "Active" : "Inactive",
    }));
  }, []);

  const columns = useMemo(() => [
    { Header: "S.No.", accessor: "sNo" },
    { Header: "Sponsor ID", accessor: "sponsorId" },
    { Header: "User ID", accessor: "userId" },
    {
      Header: "Password",
      accessor: "password",
      Cell: ({ row }) => {
        const rowIndex = row.index;
        const isShown = showPasswordRow[rowIndex];
        return (
          <div className="flex items-center gap-2">
            <span>{isShown ? row.original.password : "********"}</span>
            <button
              onClick={() =>
                setShowPasswordRow((prev) => ({
                  ...prev,
                  [rowIndex]: !prev[rowIndex],
                }))
              }
            >
              {isShown ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        );
      },
    },
    { Header: "My Wallet", accessor: "myWallet" },
    { Header: "E Wallet", accessor: "eWallet" },
    { Header: "Trade Profit Wallet", accessor: "tradeProfitWallet" },
    { Header: "Reward", accessor: "reward" },
    { Header: "Email ID", accessor: "email" },
    { Header: "Wallet Address", accessor: "walletAddress" },
    { Header: "Investment Package", accessor: "package" },
    { Header: "Total Earnings (USD/EMGT)", accessor: "earnings" },
    { Header: "Registration Date", accessor: "registrationDate" },
    { Header: "Paid Status", accessor: "paidStatus" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Block Action",
      Cell: () => (
        <div className="flex gap-2">
          <button className="bg-green-500 px-2 py-1 rounded text-white text-sm">Active</button>
          <button className="bg-red-500 px-2 py-1 rounded text-white text-sm">Block</button>
        </div>
      ),
    },
    {
      Header: "USDT Withdraw",
      Cell: () => (
        <div className="flex gap-2">
          <button className="bg-blue-500 px-2 py-1 rounded text-white text-sm">On</button>
          <button className="bg-gray-500 px-2 py-1 rounded text-white text-sm">Off</button>
        </div>
      ),
    },
    {
      Header: "ROI",
      Cell: () => (
        <div className="flex gap-2">
          <button className="bg-blue-500 px-2 py-1 rounded text-white text-sm">On</button>
          <button className="bg-gray-500 px-2 py-1 rounded text-white text-sm">Off</button>
        </div>
      ),
    },
    {
      Header: "Quick Login",
      Cell: () => (
        <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm">Login</button>
      ),
    },
    {
      Header: "Action",
      Cell: () => (
        <button className="text-blue-500 text-lg">
          <FaEdit />
        </button>
      ),
    },
  ], [showPasswordRow]);

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
    { columns, data, initialState: { pageSize: 20 } },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  const exportToExcel = () => {
    const exportData = data.map(({ password, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "User_Management.xlsx");
  };

  const exportToPDF = () => {
    const input = document.getElementById("user-table");
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save("User_Management.pdf");
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-left text-[#103944]">User Management</h2>

      {/* Export + Search */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <button onClick={exportToPDF} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm">
            Export PDF
          </button>
          <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
            Export Excel
          </button>
        </div>

        <div className="flex items-center justify-end">
          <input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
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
      <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200 p-4">
        {/* <div className="min-w-[1800px]" id="user-table">
          <table {...getTableProps()} className="w-full text-sm border"> */}
        <div id="user-table" className="w-full overflow-x-auto">
          <table {...getTableProps()} className="min-w-[1800px] w-full text-sm border">
            <thead className="sticky top-0 z-10 bg-[#103944] text-white">
              {headerGroups.map((headerGroup, hgIndex) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={hgIndex} className="text-left">
                  {headerGroup.headers.map((column, colIndex) => (
                    <th
                      {...column.getHeaderProps()}
                      key={column.id}
                      className={`p-2 border whitespace-nowrap ${colIndex === 0 ? "sticky left-0 z-20 bg-[#103944]" : ""}`}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-100">
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        {...cell.getCellProps()}
                        key={cell.column.id}
                        className={`p-2 border whitespace-nowrap ${cellIndex === 0 ? "left-0 bg-white z-10" : ""}`}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4">
        <span className="mr-4 text-[16px] font-semibold text-[#103944]">
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
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
              ? "bg-[#103944] text-[#FFF] hover:bg-[#0e9d52]"
              : "bg-[#103944] text-[#FFF] cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
