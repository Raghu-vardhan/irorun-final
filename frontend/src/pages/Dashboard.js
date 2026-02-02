import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { fetchDashboardData } from "../api/dashboardApi";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchDashboardData();
      setStats(res.data.stats);
      setOrders(res.data.orders);
    };
    loadData();
  }, []);

  if (!stats) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <h1 style={{ marginBottom: "1.5rem" }}>Dashboard</h1>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹ {stats.totalRevenue}</p>
        </div>

        <div className="stat-card">
          <h3>Coupons Used</h3>
          <p>{stats.totalCouponsUsed}</p>
        </div>

        <div className="stat-card">
          <h3>Coupon Amount Saved</h3>
          <p>₹ {stats.totalCouponAmount}</p>
        </div>
      </div>

      {/* ORDER HISTORY */}
      <h2 style={{ margin: "2rem 0 1rem" }}>Order History</h2>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Coupon</th>
              <th>Final Amount</th>
              <th>Coupon Saved</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.shopifyOrderId}>
                <td>{o.shopifyOrderId}</td>
                <td>{o.customerName || "-"}</td>
                <td>{o.discountCode || "-"}</td>
                <td>₹ {o.totalPrice}</td>
                <td>₹ {o.discountAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Dashboard;
