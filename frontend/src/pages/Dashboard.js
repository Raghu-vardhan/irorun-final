import { useEffect, useState } from "react";
import { fetchDashboardData } from "../api";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import OrdersTable from "../components/OrdersTable";
import DateFilter from "../components/DateFilter";
import Sidebar from "../admincomponents/Sidebar";
import UsersList from "../admincomponents/UserList";
import CreateStore from "../admincomponents/CreateStore";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // ✅ drawer state
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // ✅ user
  const [activeTab, setActiveTab] = useState("orders"); // ✅ tab state

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchDashboardData().then((res) => {
      setOrders(res.data.orders || []);
    });
  }, []);

  if (!user) return <p>Please login</p>;

  const filteredOrders = orders.filter((o) => {
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

  const filteredStats = {
    totalOrders: filteredOrders.length,
    totalRevenue: filteredOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
    couponRevenue: filteredOrders.reduce((sum, o) => sum + (o.discountAmount || 0), 0),
  };
console.log("drawerOpen:", drawerOpen);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Drawer */}
      
      <Sidebar
        user={user}
        active={activeTab}
        setActive={setActiveTab}
        open={drawerOpen}
        setOpen={setDrawerOpen}
      />

      {/* Main content */}
      <div style={{ flex: 1 }} className="dashboard-bg">
        <Header onMenuClick={() => setDrawerOpen(true)} />

        <div style={{ padding: "20px" }}>
          {/* ORDERS TAB (Admin + Store) */}
          {activeTab === "orders" && (
            <>
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
            </>
          )}

          {/* USERS TAB (Admin only) */}
          {activeTab === "users" && user.role === "admin" && <UsersList />}

          {/* CREATE STORE TAB (Admin only) */}
          {activeTab === "create" && user.role === "admin" && <CreateStore />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
