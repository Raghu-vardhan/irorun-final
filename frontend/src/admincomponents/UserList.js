import { useEffect, useState, useCallback } from "react";
import API from "../api"; // use same API as Orders

const UserList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = useCallback(() => {
    if (!token) return;

    API.get("/api/auth/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUsers(res.data.users || []))
      .catch((err) => console.error("❌ Users fetch error:", err));
  }, [token]);

  useEffect(() => {
    fetchUsers();

    // 🔄 Listen for refresh event
    const handler = () => fetchUsers();
    window.addEventListener("users:refresh", handler);

    return () => window.removeEventListener("users:refresh", handler);
  }, [fetchUsers]);

  return (
    <div>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Store Code</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.storeCode || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
