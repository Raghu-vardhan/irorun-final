import { useState } from "react";

const CreateStore = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storeCode, setStoreCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // for toast

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
      const res = await fetch("https://irorun-management.netlify.app/api/auth/register-store-owner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password, storeCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        // 🔴 Show backend error
        setError(data.message || "Failed to create store");
        return;
      }

      // ✅ Success toast
      setSuccess(data.message || "Store created successfully!");

      // 🔄 Tell UsersList to refresh
      window.dispatchEvent(new Event("users:refresh"));

      // Clear form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setStoreCode("");
      setShowPassword(false);

      // Auto-hide toast after 3s
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="create-store-container">
      <form className="create-store-box" onSubmit={submit}>
        <h2>Create Store Owner</h2>
        <p className="create-store-subtitle">Add a new store and login credentials</p>

        {/* Error message */}
        {error && <div className="form-error">{error}</div>}

        {/* Success toast */}
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
            <input style={{width:"20px"}}
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
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
