import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { FaEdit, FaBan, FaPlus, FaTrash } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const InvestmentPlan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [errors, setErrors] = useState({});

  const [data, setData] = useState([
    {
      packageName: "Silver Package",
      description:
        "100 USD - 0.5% per day - 5 days, 45 days locking. Locking till presale if converted.",
      fromAmount: 100,
      toAmount: 499,
      perDay: "0.5%",
      monthly: "15%",
    },
    {
      packageName: "Gold Package",
      description:
        "500 USD - 0.6% per day - 5 days, 90 days locking. Locking till presale if converted.",
      fromAmount: 500,
      toAmount: 999,
      perDay: "0.6%",
      monthly: "18%",
    },
    {
      packageName: "Platinum Package",
      description: "1000 USD - 0.7% per day - 5 days, 120 days locking.",
      fromAmount: 1000,
      toAmount: 2499,
      perDay: "0.7%",
      monthly: "21%",
    },
    {
      packageName: "Emerald Package",
      description: "2500 USD - 0.8% per day - 5 days, 180 days locking.",
      fromAmount: 2500,
      toAmount: 4999,
      perDay: "0.8%",
      monthly: "24%",
    },
    {
      packageName: "Diamond Package",
      description: "5000 USD - 0.9% per day - 5 days, 270 days locking.",
      fromAmount: 5000,
      toAmount: 10000,
      perDay: "0.9%",
      monthly: "27%",
    },
  ]);

  const [originalData] = useState([...data]);

  useEffect(() => {
    if (searchInput === "") {
      setData(originalData);
    } else {
      handleSearch();
    }
  }, [searchInput]);

  const validateForm = () => {
    const newErrors = {};
    if (!editRowData.packageName.trim()) {
      newErrors.packageName = "Package Name is required";
    }
    if (!editRowData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!editRowData.fromAmount && editRowData.fromAmount !== 0) {
      newErrors.fromAmount = "From Amount is required";
    }
    if (!editRowData.toAmount && editRowData.toAmount !== 0) {
      newErrors.toAmount = "To Amount is required";
    }
    if (!editRowData.perDay.trim()) {
      newErrors.perDay = "Per Day % is required";
    } else if (isNaN(parseFloat(editRowData.perDay))) {
      newErrors.perDay = "Per Day % must be a number";
    }
    if (!editRowData.monthly.trim()) {
      newErrors.monthly = "Monthly % is required";
    } else if (isNaN(parseFloat(editRowData.monthly))) {
      newErrors.monthly = "Monthly % must be a number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = (packageName) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this package?");
    if (confirmDelete) {
      const updatedData = data.filter((pkg) => pkg.packageName !== packageName);
      setData(updatedData);
    }
  };

  const handleSearch = () => {
    const filteredData = originalData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchInput.toLowerCase())
      )
    );
    setData(filteredData);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["S.No.", "Package Name", "Description", "From Amount", "To Amount", "Per Day %", "Monthly %"];
    const tableRows = data.map((row, index) => [
      index + 1,
      row.packageName,
      row.description,
      row.fromAmount,
      row.toAmount,
      row.perDay,
      row.monthly,
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });
    doc.save("investment_plans.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map((row, index) => ({
      "S.No.": index + 1,
      "Package Name": row.packageName,
      "Description": row.description,
      "From Amount": row.fromAmount,
      "To Amount": row.toAmount,
      "Per Day %": row.perDay,
      "Monthly %": row.monthly,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "InvestmentPlans");
    XLSX.writeFile(workbook, "investment_plans.xlsx");
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "S.No.",
        accessor: (_row, i) => i + 1,
        id: "serial",
      },
      {
        Header: "Package Name",
        accessor: "packageName",
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ value }) => (
          <div className="max-w-[250px] truncate" title={value}>
            {value}
          </div>
        ),
      },
      {
        Header: "From Amount",
        accessor: "fromAmount",
      },
      {
        Header: "To Amount",
        accessor: "toAmount",
      },
      {
        Header: "Per Day %",
        accessor: "perDay",
      },
      {
        Header: "Monthly %",
        accessor: "monthly",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => openEditModal(row.original)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => alert("Deactivate clicked")}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
              title="Deactivate"
            >
              <FaBan />
            </button>
            <button
              onClick={() => handleDelete(row.original.packageName)}
              className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700 text-sm"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [data]
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
      initialState: { pageIndex: 0, pageSize: 20 },
    },
    usePagination
  );

  const openEditModal = (rowData) => {
    setEditRowData({
      ...rowData,
      perDay: rowData.perDay.replace("%", ""),
      monthly: rowData.monthly.replace("%", ""),
    });
    setIsEditing(true);
    setIsModalOpen(true);
    setErrors({});
  };

  const openAddModal = () => {
    setEditRowData({
      packageName: "",
      description: "",
      fromAmount: "",
      toAmount: "",
      perDay: "",
      monthly: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditRowData(null);
    setErrors({});
  };

  const handleSave = () => {
    if (validateForm()) {
      const formattedData = {
        ...editRowData,
        perDay: `${parseFloat(editRowData.perDay)}%`,
        monthly: `${parseFloat(editRowData.monthly)}%`,
      };
      if (isEditing) {
        const updatedData = data.map((item) =>
          item.packageName === editRowData.packageName ? formattedData : item
        );
        setData(updatedData);
      } else {
        setData([...data, formattedData]);
      }
      closeModal();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#103944]">Investment Plans</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#103944] text-white px-4 py-2 rounded hover:bg-[#0e9d52]"
        >
          <FaPlus /> Add Package
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          <button
            onClick={handleExportPDF}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 text-sm"
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
        <div className="flex items-center justify-end">
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
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 overflow-x-auto">
        <table {...getTableProps()} className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-[#103944] text-white uppercase">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="px-4 py-2 whitespace-nowrap" key={column.id}>
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
                    <td {...cell.getCellProps()} className="px-4 py-2 whitespace-nowrap" key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-[#103944]">
                {isEditing ? "Edit" : "Add"} Investment Plan
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-600 text-3xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                <input
                  type="text"
                  value={editRowData.packageName}
                  onChange={(e) => setEditRowData({ ...editRowData, packageName: e.target.value })}
                  className={`w-full border ${errors.packageName ? "border-red-500" : "border-gray-300"} px-4 py-2 rounded-lg`}
                />
                {errors.packageName && (
                  <p className="text-red-500 text-xs mt-1">{errors.packageName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editRowData.description}
                  onChange={(e) => setEditRowData({ ...editRowData, description: e.target.value })}
                  rows={3}
                  className={`w-full border ${errors.description ? "border-red-500" : "border-gray-300"} px-4 py-2 rounded-lg`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Amount</label>
                  <input
                    type="number"
                    value={editRowData.fromAmount}
                    onChange={(e) => setEditRowData({ ...editRowData, fromAmount: Number(e.target.value) })}
                    className={`w-full border ${errors.fromAmount ? "border-red-500" : "border-gray-300"} px-4 py-2 rounded-lg`}
                  />
                  {errors.fromAmount && (
                    <p className="text-red-500 text-xs mt-1">{errors.fromAmount}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Amount</label>
                  <input
                    type="number"
                    value={editRowData.toAmount}
                    onChange={(e) => setEditRowData({ ...editRowData, toAmount: Number(e.target.value) })}
                    className={`w-full border ${errors.toAmount ? "border-red-500" : "border-gray-300"} px-4 py-2 rounded-lg`}
                  />
                  {errors.toAmount && (
                    <p className="text-red-500 text-xs mt-1">{errors.toAmount}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Per Day %</label>
                  <input
                    type="text"
                    value={editRowData.perDay}
                    onChange={(e) => setEditRowData({ ...editRowData, perDay: e.target.value })}
                    className={`w-full border ${errors.perDay ? "border-red-500" : "border-gray-300"} px-4 py-2 rounded-lg`}
                  />
                  {errors.perDay && (
                    <p className="text-red-500 text-xs mt-1">{errors.perDay}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly %</label>
                  <input
                    type="text"
                    value={editRowData.monthly}
                    onChange={(e) => setEditRowData({ ...editRowData, monthly: e.target.value })}
                    className={`w-full border ${errors.monthly ? "border-red-500" : "border-gray-300"} px-4 py-2 rounded-lg`}
                  />
                  {errors.monthly && (
                    <p className="text-red-500 text-xs mt-1">{errors.monthly}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={closeModal}
                  className="px-5 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 rounded-md bg-[#103944] text-white hover:bg-[#0e9d52]"
                >
                  {isEditing ? "Save Changes" : "Add Package"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPlan;
