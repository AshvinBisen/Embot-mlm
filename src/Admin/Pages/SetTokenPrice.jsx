import React, { useState, useMemo } from "react";
import { useTable } from "react-table";
import dayjs from "dayjs";

const SetTokenPrice = () => {
  const [tokenName, setTokenName] = useState("Token A");
  const [price, setPrice] = useState("");
  const [history, setHistory] = useState([]);

  const [lastPrices, setLastPrices] = useState({
    "Token A": 1.0,
    "Token B": 2.5,
    "Token C": 0.75,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const oldPrice = lastPrices[tokenName];
    const date = dayjs().format("YYYY-MM-DD hh:mm:ss A");

    const newEntry = {
      tokenName,
      lastPrice: oldPrice,
      newPrice: parseFloat(price),
      updatedAt: date,
    };

    setHistory([newEntry, ...history]);

    setLastPrices((prev) => ({
      ...prev,
      [tokenName]: parseFloat(price),
    }));

    setPrice("");
  };

  const columns = useMemo(
    () => [
      { Header: "Token Name", accessor: "tokenName" },
      { Header: "Last Price", accessor: "lastPrice" },
      { Header: "New Price", accessor: "newPrice" },
      { Header: "Updated At", accessor: "updatedAt" },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: history });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="min-h-screen bg-[#f5f7fa] p-6 flex flex-col items-center">
      {/* Token Price Form Card */}
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 mb-10 border border-gray-200">
        <h2 className="text-2xl font-bold text-[#103944] mb-6 text-center">
          Set Token Price
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#103944] mb-2">
              Select Token
            </label>
            <select
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2298D3] transition"
            >
              <option value="Token A">Token A</option>
              <option value="Token B">Token B</option>
              <option value="Token C">Token C</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#103944] mb-2">
              New Price
            </label>
            <input
              type="number"
              step="0.0001"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={`Current: $${lastPrices[tokenName]}`}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2298D3] transition"
            />
            <p className="text-xs text-gray-500 mt-1">
              Current Price: <span className="font-semibold text-green-600">${lastPrices[tokenName]}</span>
            </p>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#2298D3] hover:bg-[#0e9d52] text-white font-medium px-8 py-2 rounded-lg transition-all duration-300 shadow-md"
            >
              Save Price
            </button>
          </div>
        </form>
      </div>

      {/* Price Update History Table */}
      {history.length > 0 && (
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-[#103944]">
            Price Update History
          </h3>
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
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={i}
                      {...row.getRowProps()}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
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
          </div>
        </div>
      )}
    </div>
  );
};

export default SetTokenPrice;
