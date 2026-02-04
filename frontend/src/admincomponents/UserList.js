import { useEffect, useState, useCallback } from "react";
import API from "../api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [storeFilter, setStoreFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("all"); // today | 7 | 30 | all

  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    if (!token) return;

    try {
      const [usersRes, ordersRes] = await Promise.all([
        API.get("api/auth/admin/users"),
        API.get("api/dashboard"), // assuming admin gets ALL orders here
      ]);

      setUsers(usersRes.data.users || []);
      setOrders(ordersRes.data.orders || []);
    } catch (err) {
      console.error("❌ Admin data fetch error:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchData();

    const handler = () => fetchData();
    window.addEventListener("users:refresh", handler);
    return () => window.removeEventListener("users:refresh", handler);
  }, [fetchData]);

  // 📅 Date filter logic
  const filterOrdersByDate = (ordersList) => {
    if (dateFilter === "all") return ordersList;

    const now = new Date();
    let start;

    if (dateFilter === "today") {
      start = new Date();
      start.setHours(0, 0, 0, 0);
    } else if (dateFilter === "7") {
      start = new Date();
      start.setDate(now.getDate() - 7);
    } else if (dateFilter === "30") {
      start = new Date();
      start.setDate(now.getDate() - 30);
    }

    return ordersList.filter((o) => new Date(o.createdAt) >= start);
  };

  // 🧮 Compute stats per store
  const getStoreStats = (storeCode) => {
    const storeOrders = filterOrdersByDate(
      orders.filter((o) => o.storeCode === storeCode)
    );

    const totalOrders = storeOrders.length;
    const totalRevenue = storeOrders.reduce(
      (sum, o) => sum + (o.totalPrice || 0),
      0
    );
    const totalSavings = storeOrders.reduce(
      (sum, o) => sum + (o.discountAmount || 0),
      0
    );

    return { totalOrders, totalRevenue, totalSavings };
  };

  // 🔍 Filter users by store code/name
  const filteredUsers = users.filter((u) => {
    if (!storeFilter) return true;
    return (
      u.storeCode?.toLowerCase().includes(storeFilter.toLowerCase()) ||
      u.email?.toLowerCase().includes(storeFilter.toLowerCase())
    );
  });

  return (
    <div>
      <h2>All Stores / Users</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        <input
          placeholder="Filter by store code or email"
          value={storeFilter}
          onChange={(e) => setStoreFilter(e.target.value)}
          style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Store Code</th>
                <th>Mobile</th>
                <th>Total Orders</th>
                <th>Total Revenue</th>
                <th>Saved by Coupons</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                const stats = getStoreStats(u.storeCode);

                return (
                  <tr key={u._id}>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>{u.storeCode || "-"}</td>
                    <td>{u.mobile || "-"}</td>
                    <td>{stats.totalOrders}</td>
                    <td>₹ {stats.totalRevenue.toFixed(2)}</td>
                    <td>₹ {stats.totalSavings.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
