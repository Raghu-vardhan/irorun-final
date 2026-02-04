import { useState } from "react";

const CreateStore = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeCode, setStoreCode] = useState("");
  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:10000/api/auth/register-store-owner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password, storeCode }),
    });

    const data = await res.json();
    alert(data.message || "Store created");

    setEmail("");
    setPassword("");
    setStoreCode("");
  };

  return (
  <div className="create-store-container">
    <form className="create-store-box" onSubmit={submit}>
      <h2>Create Store Owner</h2>
      <p className="create-store-subtitle">Add a new store and login credentials</p>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        placeholder="Store Code"
        value={storeCode}
        onChange={(e) => setStoreCode(e.target.value.toUpperCase())}
        required
      />

      <button type="submit">Create Store</button>
    </form>
  </div>
);

};

export default CreateStore;
