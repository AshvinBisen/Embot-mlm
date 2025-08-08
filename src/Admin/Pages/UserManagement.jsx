import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const UserManagement = () => {
  const users = [
    {
      id: 1,
      sponsorId: 'SPONSOR100',
      userId: 'USER1000',
      myWallet: 50,
      eWallet: 100,
      tradeProfitWallet: 30,
      reward: 'Reward 1',
      email: 'user1@mail.com',
      walletAddress: '0x12...abcd',
      investmentPackage: 'Gold',
      totalEarnings: '$150 / EMGT 200',
      registrationDate: '2025-08-01',
      paidStatus: 'Paid',
      status: 'Active',
    },
    {
      id: 2,
      sponsorId: 'SPONSOR101',
      userId: 'USER1001',
      myWallet: 50,
      eWallet: 100,
      tradeProfitWallet: 30,
      reward: 'No reward',
      email: 'user2@mail.com',
      walletAddress: '0x12...abcd',
      investmentPackage: 'Gold',
      totalEarnings: '$150 / EMGT 200',
      registrationDate: '2025-08-01',
      paidStatus: 'Unpaid',
      status: 'Inactive',
    },
    {
      id: 1,
      sponsorId: 'SPONSOR100',
      userId: 'USER1000',
      myWallet: 50,
      eWallet: 100,
      tradeProfitWallet: 30,
      reward: 'Reward 1',
      email: 'user1@mail.com',
      walletAddress: '0x12...abcd',
      investmentPackage: 'Gold',
      totalEarnings: '$150 / EMGT 200',
      registrationDate: '2025-08-01',
      paidStatus: 'Paid',
      status: 'Active',
    },
    {
      id: 2,
      sponsorId: 'SPONSOR101',
      userId: 'USER1001',
      myWallet: 50,
      eWallet: 100,
      tradeProfitWallet: 30,
      reward: 'No reward',
      email: 'user2@mail.com',
      walletAddress: '0x12...abcd',
      investmentPackage: 'Gold',
      totalEarnings: '$150 / EMGT 200',
      registrationDate: '2025-08-01',
      paidStatus: 'Unpaid',
      status: 'Inactive',
    },
    {
      id: 1,
      sponsorId: 'SPONSOR100',
      userId: 'USER1000',
      myWallet: 50,
      eWallet: 100,
      tradeProfitWallet: 30,
      reward: 'Reward 1',
      email: 'user1@mail.com',
      walletAddress: '0x12...abcd',
      investmentPackage: 'Gold',
      totalEarnings: '$150 / EMGT 200',
      registrationDate: '2025-08-01',
      paidStatus: 'Paid',
      status: 'Active',
    },
    {
      id: 2,
      sponsorId: 'SPONSOR101',
      userId: 'USER1001',
      myWallet: 50,
      eWallet: 100,
      tradeProfitWallet: 30,
      reward: 'No reward',
      email: 'user2@mail.com',
      walletAddress: '0x12...abcd',
      investmentPackage: 'Gold',
      totalEarnings: '$150 / EMGT 200',
      registrationDate: '2025-08-01',
      paidStatus: 'Unpaid',
      status: 'Inactive',
    },
    {
      id: 1,
      sponsorId: 'SPONSOR100',
      userId: 'USER1000',
      myWallet: 50,
      eWallet: 100,
      tradeProfitWallet: 30,
      reward: 'Reward 1',
      email: 'user1@mail.com',
      walletAddress: '0x12...abcd',
      investmentPackage: 'Gold',
      totalEarnings: '$150 / EMGT 200',
      registrationDate: '2025-08-01',
      paidStatus: 'Paid',
      status: 'Active',
    },
    {
      id: 2,
      sponsorId: 'SPONSOR101',
      userId: 'USER1001',
      myWallet: 50,
      eWallet: 100,
      tradeProfitWallet: 30,
      reward: 'No reward',
      email: 'user2@mail.com',
      walletAddress: '0x12...abcd',
      investmentPackage: 'Gold',
      totalEarnings: '$150 / EMGT 200',
      registrationDate: '2025-08-01',
      paidStatus: 'Unpaid',
      status: 'Inactive',
    },
    {
      id: 1,
      sponsorId: 'SPONSOR100',
      userId: 'USER1000',
      myWallet: 50,
      eWallet: 100,
      tradeProfitWallet: 30,
      reward: 'Reward 1',
      email: 'user1@mail.com',
      walletAddress: '0x12...abcd',
      investmentPackage: 'Gold',
      totalEarnings: '$150 / EMGT 200',
      registrationDate: '2025-08-01',
      paidStatus: 'Paid',
      status: 'Active',
    },
    {
      id: 2,
      sponsorId: 'SPONSOR101',
      userId: 'USER1001',
      myWallet: 50,
      eWallet: 100,
      tradeProfitWallet: 30,
      reward: 'No reward',
      email: 'user2@mail.com',
      walletAddress: '0x12...abcd',
      investmentPackage: 'Gold',
      totalEarnings: '$150 / EMGT 200',
      registrationDate: '2025-08-01',
      paidStatus: 'Unpaid',
      status: 'Inactive',
    },
    // Add more user objects...
  ];

  const pageSize = 2;
  const [pageIndex, setPageIndex] = useState(0);
  const totalPages = Math.ceil(users.length / pageSize);

  const paginatedUsers = users.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < totalPages - 1;

  const previousPage = () => {
    if (canPreviousPage) {
      setPageIndex((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (canNextPage) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const exportToExcel = () => {
    const data = users.map((user) => ({
      'S.No.': user.id,
      'Sponsor ID': user.sponsorId,
      'User ID': user.userId,
      Password: '********',
      'My Wallet': user.myWallet,
      'E Wallet': user.eWallet,
      'Trade Profit Wallet': user.tradeProfitWallet,
      Reward: user.reward,
      'Email ID': user.email,
      'Wallet Address': user.walletAddress,
      'Investment Package': user.investmentPackage,
      'Total Earnings (USD/EMGT)': user.totalEarnings,
      'Registration Date': user.registrationDate,
      'Paid Status': user.paidStatus,
      Status: user.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'UserManagement.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageSize = 20;

    const columns = [
      'S.No.',
      'Sponsor ID',
      'User ID',
      'Password',
      'My Wallet',
      'E Wallet',
      'Trade Profit Wallet',
      'Reward',
      'Email ID',
      'Wallet Address',
      'Investment Package',
      'Total Earnings (USD/EMGT)',
      'Registration Date',
      'Paid Status',
      'Status',
    ];

    const data = users.map((user) => [
      user.id,
      user.sponsorId,
      user.userId,
      '********',
      user.myWallet,
      user.eWallet,
      user.tradeProfitWallet,
      user.reward,
      user.email,
      user.walletAddress,
      user.investmentPackage,
      user.totalEarnings,
      user.registrationDate,
      user.paidStatus,
      user.status,
    ]);

    let page = 1;
    let start = 0;
    while (start < data.length) {
      const pageData = data.slice(start, start + pageSize);
      doc.autoTable({
        head: [columns],
        body: pageData,
        startY: page === 1 ? 20 : 10,
        theme: 'striped',
        headStyles: { fillColor: [16, 57, 68] },
        styles: { fontSize: 8, cellPadding: 2 },
        margin: { top: 20 },
        didDrawPage: () => {
          doc.setFontSize(10);
          doc.text(`Page ${page}`, doc.internal.pageSize.getWidth() - 30, 10);
        },
      });
      start += pageSize;
      if (start < data.length) {
        doc.addPage();
        page++;
      }
    }

    doc.save('UserManagement.pdf');
  };

  return (
    <div className="p-4 mx-auto max-w-[1260px] md:p-6">
      <h2 className="text-2xl font-bold mb-4 text-left text-[#103944]">
        User Management
      </h2>

      <div className="mb-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex gap-2 mb-4 md:mb-0">
          <button
            onClick={exportToPDF}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
          >
            Export PDF
          </button>
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
          >
            Export Excel
          </button>
        </div>
        <div className="flex items-center w-full md:w-auto">
          <input
            placeholder="Search..."
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
          />
          <button className="ml-2 bg-[#103944] text-white px-4 py-2 rounded hover:bg-[#0e9d52] text-sm">
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200 p-4">
        <table className="min-w-[1800px] w-full text-sm border">
          <thead className="sticky top-0 z-10 bg-[#103944] text-white">
            <tr className="text-left">
              <th className="p-2 border sticky left-0 z-20 bg-[#103944] whitespace-nowrap">S.No.</th>
              <th className="p-2 border whitespace-nowrap">Sponsor ID</th>
              <th className="p-2 border whitespace-nowrap">User ID</th>
              <th className="p-2 border whitespace-nowrap">Password</th>
              <th className="p-2 border whitespace-nowrap">My Wallet</th>
              <th className="p-2 border whitespace-nowrap">E Wallet</th>
              <th className="p-2 border whitespace-nowrap">Trade Profit Wallet</th>
              <th className="p-2 border whitespace-nowrap">Reward</th>
              <th className="p-2 border whitespace-nowrap">Email ID</th>
              <th className="p-2 border whitespace-nowrap">Wallet Address</th>
              <th className="p-2 border whitespace-nowrap">Investment Package</th>
              <th className="p-2 border whitespace-nowrap">Total Earnings (USD/EMGT)</th>
              <th className="p-2 border whitespace-nowrap">Registration Date</th>
              <th className="p-2 border whitespace-nowrap">Paid Status</th>
              <th className="p-2 border whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="p-2 border sticky left-0 bg-white z-10">{user.id}</td>
                <td className="p-2 border">{user.sponsorId}</td>
                <td className="p-2 border">{user.userId}</td>
                <td className="p-2 border">********</td>
                <td className="p-2 border">{user.myWallet}</td>
                <td className="p-2 border">{user.eWallet}</td>
                <td className="p-2 border">{user.tradeProfitWallet}</td>
                <td className="p-2 border">{user.reward}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.walletAddress}</td>
                <td className="p-2 border">{user.investmentPackage}</td>
                <td className="p-2 border">{user.totalEarnings}</td>
                <td className="p-2 border">{user.registrationDate}</td>
                <td className="p-2 border">{user.paidStatus}</td>
                <td className="p-2 border">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4">
        <span className="text-sm text-gray-600 mr-4">
          Page {pageIndex + 1} of {totalPages}
        </span>
        <div>
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
  );
};

export default UserManagement;
