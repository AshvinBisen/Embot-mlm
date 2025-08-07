import React, { useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";

const InvestmentReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRowData, setEditRowData] = useState(null);

  const data = useMemo(
    () => [
      {
        userName: "John Doe",
        userWallet: "0xABC123DEF456",
        packageName: "Silver Package",
        amount: "100 USD",
        date: "2025-08-06 10:30 AM",
      },
      {
        userName: "Jane Smith",
        userWallet: "0xXYZ789GHI012",
        packageName: "Gold Package",
        amount: "500 USD",
        date: "2025-08-05 03:45 PM",
      },
      {
        userName: "David Miller",
        userWallet: "0xABC999888",
        packageName: "Diamond Package",
        amount: "1000 USD",
        date: "2025-08-01 12:00 PM",
      },
      {
        userName: "Sara Khan",
        userWallet: "0xXYZZ77777",
        packageName: "Silver Package",
        amount: "150 USD",
        date: "2025-07-30 10:00 AM",
      },
      {
        userName: "Vikram Joshi",
        userWallet: "0xMMNNOO123",
        packageName: "Gold Package",
        amount: "700 USD",
        date: "2025-07-29 09:30 AM",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "S.No.",
        accessor: (_row, i) => i + 1,
        id: "serial",
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
        Header: "Package Name",
        accessor: "packageName",
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#103944]">Investment Report</h2>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full text-sm text-left text-gray-800"
        >
          <thead className="bg-[#103944] text-[#fff] uppercase">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-4 py-2 whitespace-nowrap"
                    key={column.id}
                  >
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
                      className="px-4 py-2 whitespace-nowrap"
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
                ? "bg-[#103944]  text-[#FFF] hover:bg-[#0e9d52]"
                : "bg-[#103944] text-[#fff] cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentReport;
