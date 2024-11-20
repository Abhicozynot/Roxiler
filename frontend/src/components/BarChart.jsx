import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, month }) => {
  const chartData = {
    labels: data.map((d) => {
      const start = Math.floor(d._id / 100) * 100 + 1;
      const end = start + 99;
      return d._id >= 901 ? `${start} - above` : `${start - 1} - ${end}`;
    }),
    datasets: [
      {
        label: 'Number of Items',
        data: data.map((d) => d.count),
        backgroundColor: [
          //'#2B2D42', // Dark gray
          '#8D99AE', // Soft gray-blue
          '#EF233C', // Deep red
          '#D90429', // Crimson
          '#3A0CA3', // Indigo
        ],
        borderColor: '#000', // Black borders
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker tooltip background
        titleFont: { size: 16, weight: 'bold' },
        bodyFont: { size: 14 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFF', // White text for x-axis
        },
        grid: {
          display: false, // No grid lines
        },
      },
      y: {
        ticks: {
          color: '#FFF', // White text for y-axis
        },
        grid: {
          color: '#444', // Light grid lines
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-1 text-center">
        Bar Chart Stats - {month}
      </h2>
      <div style={{ height: '400px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  month: PropTypes.string.isRequired,
};

export default BarChart;
