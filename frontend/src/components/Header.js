import React from "react";

const Header = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="header ">
      <div className="brand">
        <a href="/"><img src="https://irorun.in/cdn/shop/files/338375715_2274413929407990_2262713576497268016_n.jpg?v=1769742573&width=280" alt="logo" /></a>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Header;
