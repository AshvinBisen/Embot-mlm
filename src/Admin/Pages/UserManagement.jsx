import React, { useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";

const UserManagement = () => {
  const [showPasswordRow, setShowPasswordRow] = useState({});

  const data = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      sNo: i + 1,
      name: `User ${i + 1}`,
      sponsorId: `SPONSOR${i + 100}`,
      userId: `USER${i + 1000}`,
      password: "user@123",
      myWallet: "50",
      eWallet: "100",
      tradeProfitWallet: "30",
      reward: i % 2 === 0 ? "Reward 1" : "No reward",
      mobile: "9876543210",
      email: `user${i + 1}@mail.com`,
      walletAddress: "0x12...abcd",
      package: "Gold",
      earnings: "$150 / EMGT 200",
      registrationDate: "2025-08-01",
      upgradeDate: "2025-08-04",
      city: "Mumbai",
      state: "Maharashtra",
      paidStatus: i % 2 === 0 ? "Paid" : "Unpaid",
      status: i % 2 === 0 ? "Active" : "Inactive",
    }));
  }, []);

  const columns = useMemo(() => [
    { Header: "S.No.", accessor: "sNo" },
    { Header: "Name", accessor: "name" },
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
    { Header: "Mobile Number", accessor: "mobile" },
    { Header: "Email ID", accessor: "email" },
    { Header: "Wallet Address", accessor: "walletAddress" },
    { Header: "Investment Package", accessor: "package" },
    { Header: "Total Earnings (USD/EMGT)", accessor: "earnings" },
    { Header: "Registration Date", accessor: "registrationDate" },
    { Header: "Upgrade Date", accessor: "upgradeDate" },
    { Header: "City", accessor: "city" },
    { Header: "State", accessor: "state" },
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-left text-[#103944]">User Management</h2>
      <div className="mb-4">
        <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search users..."
          className="w-[220px] p-2 border rounded shadow"
        />
      </div>

      {/* <div className="w-full overflow-x-auto"> */}
       <div className="w-full overflow-x-auto  bg-white rounded-lg shadow-md border border-gray-200 p-4">
        <div className="min-w-[2200px]">
          <table {...getTableProps()} className="w-full text-sm border">
            <thead className="sticky top-0 z-10 bg-[#103944] text-white">
              {headerGroups.map((headerGroup, hgIndex) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={hgIndex} className="text-left">
                  {headerGroup.headers.map((column, colIndex) => (
                    <th
                      {...column.getHeaderProps()}
                      key={column.id} // ✅ Key added here
                      className={`p-2 border whitespace-nowrap ${colIndex === 0 ? "sticky left-0 z-20 bg-[#103944]" : ""}`}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                  {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-100"> {/* ✅ key={row.id} */}
                {row.cells.map((cell, cellIndex) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id} // ✅ Key here too
                    className={`p-2 border whitespace-nowrap ${cellIndex === 0 ? " left-0 bg-white z-10" : ""}`}
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
