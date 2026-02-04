const StatsCards = ({ stats }) => {
  
  
  return (
    
   <div className="state-page page-width">
    <div className="welcome">
      <h1>Admin Dashboard </h1>
    </div>
     <div className="stats-grid ">
      <h1 className="card"><b>Revenue</b> ₹ {stats.totalRevenue}</h1>
      <h1 className="card"><b>Saved Amout</b> ₹ {stats.couponRevenue}</h1>
      <h1 className="card"><b>Orders : </b>{stats.totalOrders}</h1>
    </div>
   </div>
  );
};

export default StatsCards;
