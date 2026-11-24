import { useState } from "react";

export default function LoginPage({ onLogin, onShowSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p className="switch-text">
        Don't have an account?{" "}
        <button type="button" className="link-btn" onClick={onShowSignUp}>Create account</button>
      </p>
    </div>
  );
}