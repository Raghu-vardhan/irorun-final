import { useState } from "react";
import API from "../api";

const CreateStore = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storeCode, setStoreCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await API.post(
        "/api/auth/register-store-owner",
        { email, password, storeCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message || "Store created successfully!");

      // refresh users list
      window.dispatchEvent(new Event("users:refresh"));

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setStoreCode("");
      setShowPassword(false);

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Create store error:", err);
      setError(err.response?.data?.message || "Network error. Please try again.");
    }
  };

  return (
    <div className="create-store-container">
      <form className="create-store-box" onSubmit={submit}>
        <h2>Create Store Owner</h2>
        <p className="create-store-subtitle">Add a new store and login credentials</p>

        {error && <div className="form-error">{error}</div>}
        {success && <div className="toast-success">{success}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div style={{ textAlign: "left", marginBottom: "12px" }}>
          <label style={{ fontSize: "13px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              style={{ marginRight: "6px" }}
            />
            Show password
          </label>
        </div>

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
