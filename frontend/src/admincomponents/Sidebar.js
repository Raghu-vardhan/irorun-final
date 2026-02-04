import React from "react";

const Sidebar = ({ user, active, setActive, open, setOpen }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {open && <div className="drawer-overlay" onClick={() => setOpen(false)} />}

      <div className={`drawer ${open ? "open" : ""}`}>
        <h3>Dashboard</h3>

        <button
          className={active === "orders" ? "active" : ""}
          onClick={() => {
            setActive("orders");
            setOpen(false);
          }}
        >
          📦 Orders
        </button>

        {user.role === "admin" && (
          <>
            <button
              className={active === "users" ? "active" : ""}
              onClick={() => {
                setActive("users");
                setOpen(false);
              }}
            >
              👥 Users
            </button>

            <button
              className={active === "create" ? "active" : ""}
              onClick={() => {
                setActive("create");
                setOpen(false);
              }}
            >
              🏪 Create Store
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
