const StatsCards = ({ stats }) => {
  
  
  return (
    
   <div className="page-width">
    <div className="welcome">
      <h1>WELCOME BACK TO IRORUN</h1>
    </div>
     <div className="stats-grid ">
      <h1 className="card"><b>Revenue</b> ₹{stats.totalRevenue}</h1>
      <h1 className="card"><b>Coupens Revenue</b> ₹{stats.couponRevenue}</h1>
      <h1 className="card"><b>Orders : </b>{stats.totalOrders}</h1>
    </div>
   </div>
  );
};

export default StatsCards;
