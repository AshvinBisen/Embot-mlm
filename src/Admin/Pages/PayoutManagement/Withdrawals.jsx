import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { FaCheck, FaTimes } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

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

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredData(data);
    } else {
      const lowerSearch = searchInput.toLowerCase();
      const filtered = data.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(lowerSearch)
        )
      );
      setFilteredData(filtered);
    }
  }, [searchInput, data]);

  const handleAction = (rowId, type) => {
    setActionStatus((prev) => ({ ...prev, [rowId]: type }));
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Withdrawals Report", 14, 10);
    autoTable(doc, {
      head: [
        [
          "S.No.",
          "User Account",
          "Username",
          "USDT Wallet",
          "Token Wallet",
          "Withdraw Date",
          "Paid Date",
          "Withdraw Amount",
          "Withdraw Charges",
          "Final Amount",
          "Tokens",
          "Status",
        ],
      ],
      body: filteredData.map((row, index) => [
        index + 1,
        row.userAccount,
        row.userName,
        row.usdtWallet,
        row.tokenWallet,
        row.withdrawDate,
        row.paidDate,
        row.withdrawAmount,
        row.withdrawCharges,
        row.finalAmount,
        row.tokens,
        row.status,
      ]),
    });
    doc.save("withdrawals_report.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((row, index) => ({
        "S.No.": index + 1,
        "User Account": row.userAccount,
        Username: row.userName,
        "USDT Wallet": row.usdtWallet,
        "Token Wallet": row.tokenWallet,
        "Withdraw Date": row.withdrawDate,
        "Paid Date": row.paidDate,
        "Withdraw Amount": row.withdrawAmount,
        "Withdraw Charges": row.withdrawCharges,
        "Final Amount": row.finalAmount,
        Tokens: row.tokens,
        Status: row.status,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Withdrawals");
    XLSX.writeFile(workbook, "withdrawals_report.xlsx");
  };

  const columns = useMemo(
    () => [
      {
        Header: "S.No.",
        accessor: (_row, i) => i + 1,
        id: "sno",
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
        Header: "User Account",
        accessor: "userAccount",
        Cell: ({ value }) => (
          <a
            href={`/user/login?account=${value}`}
            target="_blank"
            rel="noreferrer"
            className="bg-[#103944] text-white px-3 py-1 rounded hover:bg-[#0e9d52] transition-all duration-200 inline-block text-sm text-center"
          >
            Login
          </a>
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
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageSize: 5 },
    },
    usePagination
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#103944] mb-4">Withdrawals</h1>

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
            onClick={() => setSearchInput(searchInput)}
            className="ml-2 bg-[#103944] text-white px-4 py-2 rounded hover:bg-[#0e9d52] text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
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
    </div>
  );
};

export default Withdrawals;
