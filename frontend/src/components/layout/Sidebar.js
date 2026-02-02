import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT
    navigate("/login");               // redirect
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">IRORUN</h2>

      <nav>
        <a href="/">Dashboard</a>
        <a href="/coupons">Coupons</a>
        <a href="/orders">Orders</a>
      </nav>

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
