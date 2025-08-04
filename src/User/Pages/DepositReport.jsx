import React, { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// 🔹 Local dummy data
const fullData = [
    { id: 1, username: 'ArjunBose', amount: 185, walletType: 'My Wallet', date: '2025-07-21' },
    { id: 2, username: 'LaraMendez', amount: 310, walletType: 'Principle', date: '2025-08-01' },
    { id: 3, username: 'ZhangWei', amount: 120, walletType: 'My Wallet', date: '2025-08-02' },
    { id: 4, username: 'FatimaNoor', amount: 290, walletType: 'Principle', date: '2025-07-29' },
    { id: 5, username: 'DiegoRamos', amount: 405, walletType: 'My Wallet', date: '2025-08-03' },
    { id: 6, username: 'PriyaNair', amount: 230, walletType: 'Principle', date: '2025-07-30' },
    { id: 7, username: 'KenjiIto', amount: 330, walletType: 'My Wallet', date: '2025-08-04' },
    { id: 8, username: 'SofiaIvanova', amount: 275, walletType: 'Principle', date: '2025-08-05' },
    { id: 9, username: 'AliMohammed', amount: 190, walletType: 'My Wallet', date: '2025-07-28' },
    { id: 10, username: 'EmilyWhite', amount: 245, walletType: 'Principle', date: '2025-08-06' },
    { id: 11, username: 'JinPark', amount: 260, walletType: 'My Wallet', date: '2025-08-07' },
    { id: 12, username: 'MariaGomez', amount: 315, walletType: 'Principle', date: '2025-07-25' },
    { id: 13, username: 'RajSingh', amount: 150, walletType: 'My Wallet', date: '2025-07-26' },
    { id: 14, username: 'ChenLu', amount: 390, walletType: 'Principle', date: '2025-08-08' },
    { id: 15, username: 'SarahAli', amount: 220, walletType: 'My Wallet', date: '2025-08-09' },
    { id: 16, username: 'OmarFaruk', amount: 175, walletType: 'Principle', date: '2025-07-27' },
    { id: 17, username: 'NoraKhan', amount: 280, walletType: 'My Wallet', date: '2025-08-10' },
    { id: 18, username: 'LucasBrown', amount: 200, walletType: 'Principle', date: '2025-08-11' },
    { id: 19, username: 'AminaDiallo', amount: 340, walletType: 'My Wallet', date: '2025-08-12' },
    { id: 20, username: 'VikramJoshi', amount: 155, walletType: 'Principle', date: '2025-08-13' },
];


const columnHelper = createColumnHelper();

const columns = [
    {
        id: 'sno',
        header: 'S.No',
        cell: ({ row }) => row.index + 1,
    },
    columnHelper.accessor('username', {
        header: 'Username',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: info => `$${info.getValue()}`,
    }),
    columnHelper.accessor('walletType', {
        header: 'Wallet Type',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('date', {
        header: 'Date',
        cell: info => info.getValue(),
    }),
];

const DepositReport = () => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [walletFilter, setWalletFilter] = useState('');
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // 🧠 Filtered by walletType dropdown
    const filteredData = useMemo(() => {
        return walletFilter
            ? fullData.filter(row => row.walletType === walletFilter)
            : fullData;
    }, [walletFilter]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            globalFilter,
            pagination,
        },
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="bg-[#12212154] backdrop-blur-xl border border-slate-700 border-gradient shadow-md shadow-slate-800/50 text-white p-6 rounded-md max-w-full mx-auto">
            <ToastContainer position="top-right" />
            <h2 className="text-2xl font-bold mb-6">Deposit Report</h2>

            {/* 🔍 Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search username or wallet..."
                    className="flex-1 px-4 py-2 bg-transparent  border border-slate-500 rounded text-white focus:outline-none"
                />
                <select
                    value={walletFilter}
                    onChange={(e) => setWalletFilter(e.target.value)}
                    className="px-4 py-2 bg-transparent bg-slate-700  border border-slate-500 rounded   focus:outline-none"
                >
                    <option value="" className="bg-slate-700 text-white  ">All Wallets</option>
                    <option value="Principle" className="bg-slate-700 text-white  ">Principle Wallet</option>
                    <option value="My Wallet" className="bg-slate-700 text-white  ">My Wallet</option>
                </select>
            </div>

            {/* 🧾 Table */}
            <div className="overflow-auto rounded">
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-sky-950/40">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="text-left px-4 py-2 border-b border-slate-700 text-nowrap "
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-slate-800/40 transition text-nowrap ">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-4 py-2 border-b border-slate-700">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {table.getRowModel().rows.length === 0 && (
                    <p className="text-center text-sm text-slate-400 mt-4">No data found.</p>
                )}
            </div>

            {/* 📃 Pagination Controls */}
            <div className="mt-6 flex md:flex-row flex-col gap-4 items-center justify-between text-sm">
                <div className="text-slate-400">
                    Page {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
                </div>
                <div className="space-x-2 flex  ">
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 border md:text-sm text-xs rounded disabled:opacity-40"
                    >
                        First
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 border   md:text-sm text-xs rounded disabled:opacity-40"
                    >
                        <FaAngleLeft/>
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 border md:text-sm text-xs rounded disabled:opacity-40"
                    >
                        <FaAngleRight />
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 border md:text-sm text-xs rounded disabled:opacity-40"
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepositReport;
