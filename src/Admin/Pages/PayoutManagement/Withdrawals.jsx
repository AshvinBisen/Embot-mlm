import React, { useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { FaCheckCircle, FaTimesCircle, FaTimes, FaCheck } from "react-icons/fa";

const truncateAddress = (address) => {
  if (!address) return "";
  const lower = address.toLowerCase();
  return lower.length > 12
    ? `${lower.slice(0, 6)}...${lower.slice(-6)}`
    : lower;
};

const Withdrawals = () => {
  const [actionStatus, setActionStatus] = useState({});
  const [searchInput, setSearchInput] = useState("");

  const data = useMemo(
    () => [
      {
        id: 1,
        userAccount: "user1",
        userName: "John Doe",
        usdtWallet: "USDT1234567890ABCDEF1234567890ABCDEF12345678",
        tokenWallet: "TOKEN1234567890ABCDEF1234567890ABCDEF123456",
        withdrawDate: "2025-08-06 10:30 AM",
        paidDate: "2025-08-07",
        withdrawAmount: "100",
        withdrawCharges: "5",
        finalAmount: "95",
        tokens: "50",
        status: "Pending",
      },
      {
        id: 2,
        userAccount: "user2",
        userName: "Jane Smith",
        usdtWallet: "USDT78901234567890ABCDEF1234567890ABCDEF12",
        tokenWallet: "TOKEN78901234567890ABCDEF1234567890ABCDEF12",
        withdrawDate: "2025-08-05 11:15 AM",
        paidDate: "2025-08-06",
        withdrawAmount: "200",
        withdrawCharges: "10",
        finalAmount: "190",
        tokens: "100",
        status: "Pending",
      },
    ],
    []
  );

  const handleAction = (rowId, type) => {
    setActionStatus((prev) => ({ ...prev, [rowId]: type }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "S.No.",
        accessor: (_row, i) => i + 1,
        id: "sno",
      },
      {
        Header: "User Account",
        accessor: "userAccount",
        Cell: ({ value }) => (
          <a
            href={`/admin-login/${value}`}
            className="text-blue-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            Login
          </a>
        ),
      },
      {
        Header: "Username",
        accessor: "userName",
      },
      {
        Header: "Wallet Address",
        accessor: (row) => (
          <div>
            <div>USDT: {truncateAddress(row.usdtWallet)}</div>
            <div>Token: {truncateAddress(row.tokenWallet)}</div>
          </div>
        ),
        id: "walletAddress",
      },
      {
        Header: "Withdraw Date",
        accessor: "withdrawDate",
      },
      {
        Header: "Paid Date",
        accessor: "paidDate",
      },
      {
        Header: "Withdraw Amount",
        accessor: "withdrawAmount",
      },
      {
        Header: "Withdraw Charges",
        accessor: "withdrawCharges",
      },
      {
        Header: "Final Amount",
        accessor: "finalAmount",
      },
      {
        Header: "Tokens",
        accessor: "tokens",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded ${
              value === "Paid"
                ? "bg-green-100 text-green-700"
                : value === "Rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Action",
        Cell: ({ row }) => {
          const status = actionStatus[row.original.id];

          if (status === "Approved")
            return (
              <span className="text-green-600 font-bold flex items-center gap-1">
                <FaCheck /> Approved
              </span>
            );
          if (status === "Rejected")
            return (
              <span className="text-red-600 font-bold flex items-center gap-1">
                <FaTimes /> Rejected
              </span>
            );

          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(row.original.id, "Approved")}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(row.original.id, "Rejected")}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
              >
                Reject
              </button>
            </div>
          );
        },
      },
    ],
    [actionStatus]
  );

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
      <h1 className="text-2xl font-bold text-[#103944] mb-4">Withdrawals</h1>

      {/* Search Row */}
      <div className="mb-4 flex items-center justify-end">
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
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2"
                      key={cell.column.id}
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

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4">
        <span className="text-sm text-gray-600 mr-4">
          Page {state.pageIndex + 1} of {pageOptions.length}
        </span>
        <div>
          <button
            onClick={() => previousPage()}
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
            onClick={() => nextPage()}
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

export default Withdrawals;
