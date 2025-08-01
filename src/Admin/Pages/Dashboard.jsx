import React from 'react';

const DashboardCard = ({ title, value, link, gradient, icon }) => (
  <div className="w-full sm:w-1/2 p-2" >
    <article className={`rounded-2xl p-4 shadow-lg text-center text-white ${gradient}`}>
      <a href={link} className="block">
        <img src={icon} alt="icon" className="h-12 mx-auto mb-2 filter invert" />
        <p className="font-medium mb-1">{title}</p>
        <p className="font-semibold text-2xl">{value}</p>
      </a>
    </article>
  </div>
);

const Dashboard = () => {
  const statsLeft = [
    { title: "Today's Member", value: 0, link: "ManageClient.aspx", gradient: 'bg-gradient-to-tr from-[#F88691] to-[#FCD3BB]', icon: 'DashboardIcon/approved.png' },
    { title: 'Unpaid Member', value: 10, link: 'ManageClient.aspx', gradient: 'bg-gradient-to-tr from-[#2a57d7] to-[#9eeeff]', icon: 'DashboardIcon/approved.png' },
    { title: 'ROI Income', value: '$11.2', link: 'DailyProfitIncome.aspx', gradient: 'bg-gradient-to-tr from-[#e8962e] to-[#e45131]', icon: 'DashboardIcon/approved.png' },
    { title: 'Level Income', value: '$7.02', link: 'LevelIncome.aspx', gradient: 'bg-gradient-to-tr from-[#21d397] to-[#7450fe]', icon: 'DashboardIcon/approved.png' },
    { title: 'Referral Income', value: '$0', link: 'DirectIncome.aspx', gradient: 'bg-gradient-to-tr from-[#ffa726] to-[#fbde00]', icon: 'DashboardIcon/approved.png' },
    { title: 'Total Income', value: '$18.22', link: '#', gradient: 'bg-gradient-to-tr from-[#ffa726] to-[#fb8c00]', icon: 'DashboardIcon/approved.png' },
  ];

  const statsRight = [
    { title: 'Paid Member', value: 9, link: 'ManageClient.aspx', gradient: 'bg-gradient-to-tr from-[#7bead0] to-[#4BC39D]', icon: 'DashboardIcon/approved.png' },
    { title: 'Total Members', value: 19, link: 'ManageClient.aspx', gradient: 'bg-gradient-to-tr from-[#b960e0] to-[#a890f5]', icon: 'DashboardIcon/totalFund.png' },
    { title: "Today's Pending Withdraw", value: 0, link: 'CommissionWithdrawRequests_USDT.aspx', gradient: 'bg-gradient-to-tr from-[#7bead0] to-[#4BC39D]', icon: 'DashboardIcon/approved.png' },
    { title: 'Total Pending Withdraw', value: 50, link: 'CommissionWithdrawRequests_USDT.aspx', gradient: 'bg-gradient-to-tr from-[#b960e0] to-[#a890f5]', icon: 'DashboardIcon/totalFund.png' },
    { title: "Today's Business", value: '$0', link: 'InvestmentReportAdmin.aspx', gradient: 'bg-gradient-to-br from-[#e9870b] to-[#78261494]', icon: 'DashboardIcon/totalFund.png' },
    { title: 'Total Business', value: '$8800', link: 'InvestmentReportAdmin.aspx', gradient: 'bg-gradient-to-br from-[#e9870b] to-[#78261494]', icon: 'DashboardIcon/totalFund.png' },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap">
        <div className="w-full xl:w-1/2 flex flex-wrap">
          {statsLeft.map((item, index) => (
            <DashboardCard key={index} {...item} />
          ))}
        </div>
        <div className="w-full xl:w-1/2 flex flex-wrap">
          {statsRight.map((item, index) => (
            <DashboardCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Latest Sign Ups */}
      {/* <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-4">
        <section className="bg-white rounded shadow p-4 overflow-auto">
          <header className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Latest Sign Ups</h3>
          </header>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Joining Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Name</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-2">07/30/25 11:16:42 AM</td><td className="p-2 text-blue-600">Member</td><td className="p-2">TEST</td><td className="p-2"><button className="btn btn-info">Profile</button></td></tr>
              <tr className="border-b"><td className="p-2">07/30/25 10:48:10 AM</td><td className="p-2 text-blue-600">Member</td><td className="p-2">Abhay</td><td className="p-2"><button className="btn btn-info">Profile</button></td></tr>
              <tr className="border-b"><td className="p-2">07/26/25 12:33:40 PM</td><td className="p-2 text-blue-600">Member</td><td className="p-2">K.S.Muralikrishna</td><td className="p-2"><button className="btn btn-info">Profile</button></td></tr>
              <tr className="border-b"><td className="p-2">07/25/25 6:10:44 PM</td><td className="p-2 text-blue-600">Member</td><td className="p-2">Rajasekaran</td><td className="p-2"><button className="btn btn-info">Profile</button></td></tr>
              <tr><td className="p-2">07/25/25 5:14:17 PM</td><td className="p-2 text-blue-600">Member</td><td className="p-2">SATHIYA</td><td className="p-2"><button className="btn btn-info">Profile</button></td></tr>
            </tbody>
          </table>
        </section>

        <section className="bg-white rounded shadow p-4 overflow-auto">
          <header className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Tickets</h3>
          </header>
          <table className="w-full text-sm text-left">
            <thead><tr></tr></thead>
          </table>
        </section>
      </div> */}
    </div>
  );
};

export default Dashboard;


 