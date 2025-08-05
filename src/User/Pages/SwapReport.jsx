import React, { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// 🔹 Dummy Swap Report Data
const fullData = [
    { from: 'USDT', to: 'EMGT', amount: 100, fee: 5, emgtAmount: 95, date: '2025-08-01' },
    { from: 'USDT', to: 'EMGT', amount: 200, fee: 10, emgtAmount: 190, date: '2025-08-02' },
    { from: 'USDT', to: 'EMGT', amount: 300, fee: 15, emgtAmount: 285, date: '2025-08-03' },
    { from: 'USDT', to: 'EMGT', amount: 100, fee: 5, emgtAmount: 95, date: '2025-08-01' },
    { from: 'USDT', to: 'EMGT', amount: 200, fee: 10, emgtAmount: 190, date: '2025-08-02' },
    { from: 'USDT', to: 'EMGT', amount: 300, fee: 15, emgtAmount: 285, date: '2025-08-03' },
    { from: 'USDT', to: 'EMGT', amount: 100, fee: 5, emgtAmount: 95, date: '2025-08-01' },
    { from: 'USDT', to: 'EMGT', amount: 200, fee: 10, emgtAmount: 190, date: '2025-08-02' },
    { from: 'USDT', to: 'EMGT', amount: 300, fee: 15, emgtAmount: 285, date: '2025-08-03' },
    { from: 'USDT', to: 'EMGT', amount: 100, fee: 5, emgtAmount: 95, date: '2025-08-01' },
    { from: 'USDT', to: 'EMGT', amount: 200, fee: 10, emgtAmount: 190, date: '2025-08-02' },
    { from: 'USDT', to: 'EMGT', amount: 300, fee: 15, emgtAmount: 285, date: '2025-08-03' },
];

const columnHelper = createColumnHelper();

const columns = [
    {
        id: 'sno',
        header: 'S.No',
        cell: ({ row }) => <div className="text-left text-sm text-secondary">{row.index + 1}</div>,
    },
    columnHelper.accessor('from', {
        header: 'From',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('to', {
        header: 'To',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('amount', {
        header: 'USDT Amount',
        cell: info => `$${info.getValue()}`,
    }),
    columnHelper.accessor('fee', {
        header: 'Swap Fee',
        cell: info => `$${info.getValue()}`,
    }),
    columnHelper.accessor('emgtAmount', {
        header: 'EMGT Amount',
        cell: info => `${info.getValue()}`,
    }),
    columnHelper.accessor('date', {
        header: 'Date',
        cell: info => info.getValue(),
    }),
];

const SwapReport = () => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data: fullData,
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

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(fullData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SwapReport');
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'swap-report.xlsx');
    };

    return (
        <div className="bg-[#12212154] backdrop-blur-xl border border-slate-700 border-gradient shadow-md shadow-slate-800/50 text-white p-6 rounded-md max-w-full mx-auto">
            <div className="flex justify-between mb-6 gap-4 flex-wrap-reverse">
                <h2 className=" text-xl md:text-2xl text-primary font-bold">Swap Report</h2>
                <button
                    onClick={exportToExcel}
                    className="px-3 py-1 h-fit text-base border flex items-center justify-center gap-2 border-slate-600 rounded bg-slate-800 hover:bg-slate-700 transition"
                >
                    <PiMicrosoftExcelLogo className="text-green-600" />
                    <span>Export</span>
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search from/to..."
                    className="w-full px-4 py-2 bg-transparent border border-slate-500 rounded text-white focus:outline-none"
                />
            </div>

            {/* Table */}
            <div className="overflow-auto rounded">
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-sky-950/40">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="text-left px-4 py-2 border-b border-slate-700 text-primary text-nowrap"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-slate-800/40 transition text-nowrap">
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

            {/* Pagination */}
            <div className="mt-6 flex md:flex-row flex-col gap-4 items-center justify-between text-sm">
                <div className="text-secondary">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <div className="space-x-2 flex">
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 border text-xs rounded disabled:opacity-40"
                    >
                        First
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 border text-xs rounded disabled:opacity-40"
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 border text-xs rounded disabled:opacity-40"
                    >
                        <FaAngleRight />
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 border text-xs rounded disabled:opacity-40"
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SwapReport;
