import React, { useState, useMemo, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const SetTokenPrice = () => {
  const [tokenName, setTokenName] = useState("Token A");
  const [price, setPrice] = useState("");
  const [history, setHistory] = useState([]);
  const [lastPrices, setLastPrices] = useState({
    "Token A": 1.0,
    "Token B": 2.5,
    "Token C": 0.75,
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("priceHistory"));
    const storedPrices = JSON.parse(localStorage.getItem("lastPrices"));
    if (storedHistory) setHistory(storedHistory);
    if (storedPrices) setLastPrices(storedPrices);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("priceHistory", JSON.stringify(history));
    }
  }, [history, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("lastPrices", JSON.stringify(lastPrices));
    }
  }, [lastPrices, isInitialized]);

  const filteredData = useMemo(() => {
    if (!searchInput) return history;
    return history.filter((entry) =>
      Object.values(entry).some((value) =>
        String(value).toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!price || price.trim() === "") {
      setMessage({ type: "error", text: "Please enter a valid price." });
    } else {
      const oldPrice = lastPrices[tokenName];
      const date = dayjs().format("YYYY-MM-DD hh:mm:ss A");

      const newEntry = {
        tokenName,
        lastPrice: oldPrice,
        newPrice: parseFloat(price),
        updatedAt: date,
      };

      const updatedHistory = [newEntry, ...history];
      setHistory(updatedHistory);
      setLastPrices((prev) => ({
        ...prev,
        [tokenName]: parseFloat(price),
      }));
      setMessage({ type: "success", text: "Price updated successfully!" });
      setPrice("");
    }

    // Clear the message after 3 seconds
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleDelete = (index) => {
    const updatedHistory = [...filteredData];
    updatedHistory.splice(index, 1);
    setHistory(
      history.filter((entry, i) => i !== history.indexOf(filteredData[index]))
    );
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Token Name", "Last Price", "New Price", "Updated At"];
    const tableRows = filteredData.map((item) => [
      item.tokenName,
      `$${item.lastPrice}`,
      `$${item.newPrice}`,
      item.updatedAt,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("token_price_history.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TokenPriceHistory");
    XLSX.writeFile(workbook, "token_price_history.xlsx");
  };

  const columns = useMemo(
    () => [
      { Header: "Token Name", accessor: "tokenName" },
      { Header: "Last Price", accessor: "lastPrice" },
      { Header: "New Price", accessor: "newPrice" },
      { Header: "Updated At", accessor: "updatedAt" },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <button
            onClick={() => handleDelete(row.index)}
            className="text-red-500 hover:text-red-700 transition"
          >
            <Trash2 size={18} />
          </button>
        ),
      },
    ],
    [filteredData]
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
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  return (
    <div className="min-h-screen bg-[#fff] p-6 flex flex-col items-center">
      {/* Token Price Form */}
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 mb-10 border border-gray-200">
        <h2 className="text-2xl font-bold text-[#103944] mb-6 text-center">
          Set Token Price
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[16px] font-semibold text-[#103944] mb-2">
              Select Token
            </label>
            <select
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            >
              <option value="Token A">Token A</option>
              <option value="Token B">Token B</option>
              <option value="Token C">Token C</option>
            </select>
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-[#103944] mb-2">
              New Price
            </label>
            <input
              type="number"
              step="0.0001"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={`Current: $${lastPrices[tokenName]}`}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
            <p className="text-[14px] text-gray-500 mt-2">
              Current Price:{" "}
              <span className="font-semibold text-green-600">
                ${lastPrices[tokenName]}
              </span>
            </p>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#103944] hover:bg-[#0e9d52] text-white font-medium px-8 py-2 rounded-lg transition-all duration-300 shadow-md"
            >
              Save Price
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-white text-sm font-medium ${
                message.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>

      {/* History Table */}
      {history.length > 0 && (
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#103944] mb-4 text-start">
            Price Update History
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <div className="mb-2 md:mb-0">
              <button
                onClick={handleExportPDF}
                className="mr-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
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

            <div className="flex items-center justify-end w-full md:w-auto">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search..."
                className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
              />
            </div>
          </div>

          <div className="overflow-auto rounded-md">
            <table
              {...getTableProps()}
              className="min-w-full text-sm text-[#103944] bg-white"
            >
              <thead className="bg-[#103944] text-white">
                {headerGroups.map((headerGroup, i) => (
                  <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, j) => (
                      <th
                        key={j}
                        {...column.getHeaderProps()}
                        className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr key={i} {...row.getRowProps()} className="hover:bg-gray-50">
                      {row.cells.map((cell, j) => (
                        <td key={j} {...cell.getCellProps()} className="px-6 py-3">
                          {cell.column.id === "newPrice" ? (
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              ${cell.value}
                            </span>
                          ) : cell.column.id === "lastPrice" ? (
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                              ${cell.value}
                            </span>
                          ) : (
                            cell.render("Cell")
                          )}
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
                onClick={previousPage}
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
                onClick={nextPage}
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
      )}
    </div>
  );
};

export default SetTokenPrice;