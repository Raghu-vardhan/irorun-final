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
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchDashboardData().then(res => {
      setOrders(res.data.orders);
      setStats(res.data.stats);
    });
  }, []);

  const filteredOrders = orders.filter(o => {
    const d = new Date(o.createdAt);
    const now = new Date();

    // Quick filters
    if (filterType === "today") {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      return d >= start;
    }

    if (filterType === "7") {
      const start = new Date();
      start.setDate(now.getDate() - 7);
      return d >= start;
    }

    if (filterType === "30") {
      const start = new Date();
      start.setDate(now.getDate() - 30);
      return d >= start;
    }

    // Custom date range
    if (filterType === "custom") {
      if (fromDate && d < new Date(fromDate)) return false;
      if (toDate) {
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999);
        if (d > to) return false;
      }
      return true;
    }

    // Default: all
    return true;
  });

  // ✅ MOVE THIS OUTSIDE filter()
  const filteredStats = {
    totalOrders: filteredOrders.length,
    totalRevenue: filteredOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
    couponRevenue: filteredOrders.reduce((sum, o) => sum + (o.discountAmount || 0), 0)
  };

  return (
    <div className="dashboard-bg">
      <Header />
      <StatsCards stats={filteredStats} />
      <DateFilter
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        filterType={filterType}
        setFilterType={setFilterType}
      />
      <OrdersTable orders={filteredOrders} />
    </div>
  );
};

export default Dashboard;
