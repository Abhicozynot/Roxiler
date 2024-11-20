import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, month }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500">Loading data...</div>;
  }

  // Prepare data for the chart
  const categories = data.map((item) => item.category);
  const counts = data.map((item) => item.count);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: `Items Sold in ${month}`,
        data: counts,
        backgroundColor: [
          '#2B2D42', // Dark gray
          '#8D99AE', // Soft gray-blue
          '#EF233C', // Deep red
          '#D90429', // Dark crimson
          '#3A0CA3', // Indigo
        ],
        hoverBackgroundColor: [
          '#1A1C30', // Darker gray
          '#6C758B', // Darker gray-blue
          '#D71F36', // Darker red
          '#B00321', // Darker crimson
          '#29097E', // Darker indigo
        ],
        borderWidth: 1,
        borderColor: '#000', // Black border for contrast
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFF', // White text for legend
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark tooltip background
        titleFont: { size: 16, weight: 'bold' },
        bodyFont: { size: 14 },
        footerFont: { size: 12 },
        footerColor: '#FFF', // White text in tooltip footer
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">
        Sales by Category ({month})
      </h2>
      <div style={{ height: '400px', width: '400px', margin: '0 auto' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  month: PropTypes.string.isRequired,
};

export default PieChart;
