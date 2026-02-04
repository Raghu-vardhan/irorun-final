const DateFilter = ({
  filterType,
  setFilterType,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <div className="page-width">
    

      <div
        className="filter"
        style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}
      >
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

        {/* Search input */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ minWidth: "260px" }}
        />
      </div>
    </div>
  );
};

export default DateFilter;
