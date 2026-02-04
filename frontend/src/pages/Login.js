import { useState } from "react";
import { loginUser } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      // 🔍 Debug log
      console.log("📤 Sending login request...");
      
      const res = await loginUser({ email, password });
      
      
      // ✅ EXTRACT THE ACTUAL JWT STRING
      let tokenString = "";
      
      // Common patterns - check ALL possibilities
      if (typeof res.data === 'string' && res.data.includes('.')) {
        // If entire response is the token
        tokenString = res.data;
      } 
      else if (typeof res.data.token === 'string') {
        // Case 1: token is directly a string
        tokenString = res.data.token;
      }
      else if (res.data.token && res.data.token.accessToken) {
        // Case 2: token.accessToken
        tokenString = res.data.token.accessToken;
      }
      else if (res.data.token && typeof res.data.token === 'object') {
        // Case 3: token is an object, find any JWT-looking property
        const tokenObj = res.data.token;
        for (const key in tokenObj) {
          if (typeof tokenObj[key] === 'string' && tokenObj[key].includes('.')) {
            tokenString = tokenObj[key];
            console.log(`✅ Found JWT in token.${key}`);
            break;
          }
        }
      }
      else if (res.data.accessToken) {
        // Case 4: accessToken at root
        tokenString = res.data.accessToken;
      }
      else if (res.data.jwt) {
        // Case 5: jwt at root
        tokenString = res.data.jwt;
      }
      else if (res.data.data && res.data.data.token) {
        // Case 6: nested data.token
        tokenString = res.data.data.token;
      }
      
      // 🔴 If we still don't have a token, check if res.data.token exists at all
      if (!tokenString) {
        console.error("❌ NO TOKEN FOUND IN RESPONSE");
        console.error("Response data structure:", res.data);
        
        // If res.data.token exists but we couldn't extract string
        if (res.data.token) {
          console.error("res.data.token exists but is:", res.data.token);
          console.error("Type of res.data.token:", typeof res.data.token);
          
          // Last resort: stringify and try to find JWT pattern
          const stringified = JSON.stringify(res.data);
          const jwtMatch = stringified.match(/(eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*)/);
          if (jwtMatch) {
            tokenString = jwtMatch[0];
            console.log("✅ Found JWT pattern in stringified response");
          }
        }
        
        if (!tokenString) {
          throw new Error("No authentication token received from server");
        }
      }
      
      // ✅ VALIDATE IT'S A PROPER JWT
      if (!tokenString.includes('.') || tokenString.split('.').length !== 3) {
        console.warn("⚠️ Token doesn't look like a standard JWT");
        console.log("Token:", tokenString);
      }
      
      // ✅ STORE THE STRING TOKEN
      console.log("💾 Storing token...");
      console.log("Token (first 50 chars):", tokenString.substring(0, 50));
      console.log("Token length:", tokenString.length);
      
      // Clean the token (remove quotes if any)
      const cleanToken = tokenString.replace(/^['"]+|['"]+$/g, '');
      localStorage.setItem("token", cleanToken);
      
      // ✅ VERIFY STORAGE
      const stored = localStorage.getItem("token");
      console.log("✅ Stored token verified:", stored?.substring(0, 50) + "...");
      
      window.location.href = "/";
      
    } catch (err) {
      console.error("❌ Login error:", err);
      console.error("Error response:", err.response?.data);
      setError(err.response?.data?.message || err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="https://irorun.in/cdn/shop/files/338375715_2274413929407990_2262713576497268016_n.jpg?v=1769742573&width=280" alt="Irorun" className="login-logo" />

        <h2>Admin Login</h2>
        <p className="login-subtitle">
          Sign in to manage orders & revenue
        </p>

        {error && <div className="login-error">{error}</div>}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
        
        {/* Temporary debug button */}
      </div>
    </div>
  );
};

export default Login;