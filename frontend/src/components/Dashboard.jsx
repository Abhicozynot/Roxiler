import { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from './BarChart';
import Statistics from './Statistics';
import TransactionsTable from './TransactionsTable';
import PieChart from './PieChart';

const Dashboard = () => {
  const [month, setMonth] = useState('march');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [transactionsRes, statisticsRes, barChartRes, pieChartRes] = await Promise.all([
          axios.get(`http://localhost:6060/api/transactions?month=${month}`),
          axios.get(`http://localhost:6060/api/statistics/${month}`),
          axios.get(`http://localhost:6060/api/sales/price-range/${month}`),
          axios.get(`http://localhost:6060/api/sales/category-items/${month}`),
        ]);

        setTransactions(transactionsRes.data);
        setStatistics(statisticsRes.data);
        setBarChartData(barChartRes.data);
        setPieChartData(pieChartRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  if (loading) {
    return <div className="text-center text-gray-400 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-1/5 p-4 bg-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Dashboard Menu</h2>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border rounded w-full mb-4 bg-gray-700 text-white border-gray-600"
        >
          {[
            'january',
            'february',
            'march',
            'april',
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december',
          ].map((m) => (
            <option key={m} value={m}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </option>
          ))}
        </select>
        <Statistics statistics={statistics} month={month} />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Transaction Dashboard</h1>

        {/* Transactions Table */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6 overflow-auto max-h-[600px]">
          <h2 className="text-xl font-semibold text-white mb-4">Transactions</h2>
          <TransactionsTable transactions={transactions} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-white">Price Range Distribution</h2>
            <BarChart data={barChartData} month={month} />
          </div>

          {/* Pie Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-white">Category Sales Distribution</h2>
            <PieChart data={pieChartData} month={month} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
