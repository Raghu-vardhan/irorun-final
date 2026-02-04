import { useEffect, useState } from "react";
import { fetchDashboardData } from "../api";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import OrdersTable from "../components/OrdersTable";
import DateFilter from "../components/DateFilter";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    couponRevenue: 0
  });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchDashboardData().then(res => {
      setOrders(res.data.orders);
      setStats(res.data.stats); // 👈 THIS must include couponRevenue
    });
  }, []);

  const filteredOrders = orders.filter(o => {
    const d = new Date(o.createdAt);
    return (
      (!fromDate || d >= new Date(fromDate)) &&
      (!toDate || d <= new Date(toDate))
    );
  });

  return (
    <>
      <Header />
      <StatsCards stats={stats} />
      <DateFilter
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
      <OrdersTable orders={filteredOrders} />
    </>
  );
};

export default Dashboard;
