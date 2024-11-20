import PropTypes from 'prop-types';

const Statistics = ({ statistics, month }) => {
  return (
    <div className="bg-gray-800 p-4 rounded mb-4 text-white border border-gray-1000">
      <h2 className="text-xl font-bold">Statistics - {month}</h2>
      <p>Total sales: ${statistics.totalSalesAmount}</p>
      <p>Total sold items: {statistics.totalSoldItems}</p>
      <p>Total unsold items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

Statistics.propTypes = {
  statistics: PropTypes.shape({
    totalSalesAmount: PropTypes.number.isRequired,
    totalSoldItems: PropTypes.number.isRequired,
    totalNotSoldItems: PropTypes.number.isRequired,
  }).isRequired,
  month: PropTypes.string.isRequired,
};

export default Statistics;
