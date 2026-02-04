const StatsCards = ({ stats }) => {
  const totalRevenue = Math.round(stats?.totalRevenue || 0);
  const coupon = Math.round(stats?.couponRevenue || 0);
  const totalOrders = stats?.totalOrders || 0;

  return (
    <div className="state-page page-width">
      <div className="welcome">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="card">
          <b>Revenue</b>
          <div>₹ {totalRevenue.toLocaleString()}</div>
        </div>

        <div className="card">
          <b>Saved Amount</b>
          <div>₹ {coupon.toLocaleString()}</div>
        </div>

        <div className="card">
          <b>Orders</b>
          <div>{totalOrders}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
