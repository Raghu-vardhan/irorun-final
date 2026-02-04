import React from "react";

const Header = ({ onMenuClick }) => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="header">
      {/* Left: Menu + Logo */}
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>☰</button>

        <a href="/" className="brand">
          <img
            src="https://irorun.in/cdn/shop/files/338375715_2274413929407990_2262713576497268016_n.jpg?v=1769742573&width=140"
            alt="logo"
          />
        </a>
      </div>

      {/* Right: Logout */}
      <div className="header-right">
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
