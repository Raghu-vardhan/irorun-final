const DateFilter = ({ fromDate, toDate, setFromDate, setToDate }) => {
  return (
   <div className="page-width">
   
   <div className="heading">
      <h2>Order History</h2>
   </div>
     <div className="filter page-width">
      <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
      <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
    </div>
   </div>
  );
};

export default DateFilter;
