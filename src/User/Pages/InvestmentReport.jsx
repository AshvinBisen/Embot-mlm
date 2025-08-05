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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';

// 🔹 Dummy investment data
const fullData = [
    { planName: 'Starter Pack', amount: 100, dailyReturn: 5, startDate: '2025-08-01', endDate: '2025-08-31', status: 'Locked' },
    { planName: 'Silver Plan', amount: 250, dailyReturn: 12, startDate: '2025-07-15', endDate: '2025-08-14', status: 'Claim' },
    { planName: 'Gold Plan', amount: 500, dailyReturn: 25, startDate: '2025-06-01', endDate: '2025-07-01', status: 'Complete' },
    { planName: 'Platinum Plan', amount: 1000, dailyReturn: 55, startDate: '2025-07-20', endDate: '2025-08-19', status: 'Claim' },
    { planName: 'Diamond Pack', amount: 2000, dailyReturn: 110, startDate: '2025-08-01', endDate: '2025-08-31', status: 'Locked' },
    { planName: 'Starter Pack', amount: 100, dailyReturn: 5, startDate: '2025-08-01', endDate: '2025-08-31', status: 'Locked' },
    { planName: 'Silver Plan', amount: 250, dailyReturn: 12, startDate: '2025-07-15', endDate: '2025-08-14', status: 'Claim' },
    { planName: 'Gold Plan', amount: 500, dailyReturn: 25, startDate: '2025-06-01', endDate: '2025-07-01', status: 'Complete' },
    { planName: 'Platinum Plan', amount: 1000, dailyReturn: 55, startDate: '2025-07-20', endDate: '2025-08-19', status: 'Claim' },
    { planName: 'Diamond Pack', amount: 2000, dailyReturn: 110, startDate: '2025-08-01', endDate: '2025-08-31', status: 'Locked' },
    { planName: 'Starter Pack', amount: 100, dailyReturn: 5, startDate: '2025-08-01', endDate: '2025-08-31', status: 'Locked' },
    { planName: 'Silver Plan', amount: 250, dailyReturn: 12, startDate: '2025-07-15', endDate: '2025-08-14', status: 'Claim' },
    { planName: 'Gold Plan', amount: 500, dailyReturn: 25, startDate: '2025-06-01', endDate: '2025-07-01', status: 'Complete' },
    { planName: 'Platinum Plan', amount: 1000, dailyReturn: 55, startDate: '2025-07-20', endDate: '2025-08-19', status: 'Claim' },
    { planName: 'Diamond Pack', amount: 2000, dailyReturn: 110, startDate: '2025-08-01', endDate: '2025-08-31', status: 'Locked' },
];

const columnHelper = createColumnHelper();

const columns = [
    {
        id: 'sno',
        header: 'S.No',
        cell: ({ row }) => <div className="text-left text-sm text-secondary">{row.index + 1}</div>,
    },
    columnHelper.accessor('planName', {
        header: 'Plan Name',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: info => `$${info.getValue()}`,
    }),
    columnHelper.accessor('dailyReturn', {
        header: 'Daily Return',
        cell: info => `$${info.getValue()}`,
    }),
    columnHelper.accessor('startDate', {
        header: 'Start Date',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('endDate', {
        header: 'End Date',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => (
            <span
                className={`px-2 py-1 rounded text-xs font-semibold ${info.getValue() === 'Locked'
                    ? 'bg-yellow-800 text-yellow-300'
                    : info.getValue() === 'Claim'
                        ? 'bg-blue-800 text-blue-300'
                        : 'bg-green-800 text-green-300'
                    }`}
            >
                {info.getValue()}
            </span>
        ),
    }),
];

const InvestmentReport = () => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const filteredData = useMemo(() => {
        return statusFilter
            ? fullData.filter(row => row.status === statusFilter)
            : fullData;
    }, [statusFilter]);

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

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'InvestmentReport');
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'investment-report.xlsx');
    };

    return (
        <div className="bg-[#12212154] backdrop-blur-xl border border-slate-700 border-gradient shadow-md shadow-slate-800/50 text-white p-6 rounded-md max-w-full mx-auto">
            <div className="flex justify-between mb-6 gap-4 flex-wrap-reverse">
                <h2 className="text-2xl text-primary font-bold">Investment Report</h2>
                <button
                    onClick={exportToExcel}
                    className="px-3 py-1 h-fit text-base border flex items-center justify-center gap-2 border-slate-600 rounded bg-slate-800 hover:bg-slate-700 transition"
                >
                    <PiMicrosoftExcelLogo className="text-green-600" />
                    <span>Export</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search plan name..."
                    className="flex-1 px-4 py-2 bg-transparent border border-slate-500 rounded text-white focus:outline-none"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-transparent bg-slate-700 border border-slate-500 rounded focus:outline-none"
                >
                    <option value="" className="bg-slate-700 text-white">All Status</option>
                    <option value="Locked" className="bg-slate-700 text-white">Locked</option>
                    <option value="Claim" className="bg-slate-700 text-white">Claim</option>
                    <option value="Complete" className="bg-slate-700 text-white">Complete</option>
                </select>
            </div>

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

export default InvestmentReport;
