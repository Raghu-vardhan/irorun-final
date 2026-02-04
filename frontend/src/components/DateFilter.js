const DateFilter = ({
  filterType,
  setFilterType,
  fromDate,
  toDate,
  setFromDate,
  setToDate
}) => {
  return (
    <div className="page-width">
      <div className="heading">
        <h2>Order History</h2>
      </div>

      <div className="filter" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {/* Quick filter dropdown */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Sales</option>
          <option value="today">Today</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
        </select>

        {/* Custom date range */}
        <input
          type="date"
          value={fromDate}
          onChange={e => {
            setFilterType("custom");
            setFromDate(e.target.value);
          }}
        />

        <input
          type="date"
          value={toDate}
          onChange={e => {
            setFilterType("custom");
            setToDate(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default DateFilter;
