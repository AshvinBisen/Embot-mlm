import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const SessionLog = () => {
  const [searchInput, setSearchInput] = useState("");

  const data = useMemo(
    () => [
      {
        adminId: "admin001",
        loginTime: "2025-08-06 10:15 AM",
        ip: "192.168.1.1",
        status: "Success",
      },
      {
        adminId: "admin002",
        loginTime: "2025-08-06 11:45 AM",
        ip: "192.168.1.2",
        status: "Failed",
      },
      // Add more logs here as needed
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
        Header: "Admin ID",
        accessor: "adminId",
      },
      {
        Header: "Login Time",
        accessor: "loginTime",
      },
      {
        Header: "IP Address",
        accessor: "ip",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Admin Session Log", 14, 10);
    autoTable(doc, {
      head: [["S.No.", "Admin ID", "Login Time", "IP Address", "Status"]],
      body: data.map((row, index) => [
        index + 1,
        row.adminId,
        row.loginTime,
        row.ip,
        row.status,
      ]),
    });
    doc.save("admin_session_log.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((row, index) => ({
        "S.No.": index + 1,
        "Admin ID": row.adminId,
        "Login Time": row.loginTime,
        "IP Address": row.ip,
        Status: row.status,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Session Log");
    XLSX.writeFile(workbook, "admin_session_log.xlsx");
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

  // 🔁 Auto-filter on every keystroke
  useEffect(() => {
    setGlobalFilter(searchInput || undefined);
  }, [searchInput, setGlobalFilter]);

  const handleSearch = () => {
    setGlobalFilter(searchInput || undefined);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#103944] mb-4">Session Log</h1>

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
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i} className="border-b text-start">
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

export default SessionLog;
