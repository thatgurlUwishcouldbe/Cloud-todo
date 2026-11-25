import { useState } from "react";

export default function LoginPage({ onLogin, onShowSignUp, error, submitting }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await onLogin(email, password);
  }

  return (
    <div className="login-card">
      <p className="eyebrow">To Do Tasks</p>
      <h2>Welcome back</h2>
      <p className="auth-subtitle">Sign in to keep your tasks in sync.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" placeholder="you@example.com" autoComplete="email" required
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" placeholder="Your password" autoComplete="current-password" required
          value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error-text" role="alert">{error}</p>}
        <button type="submit" disabled={submitting}>{submitting ? "Signing in..." : "Sign in"}</button>
      </form>
      <p className="switch-text">
        Don't have an account?{" "}
        <button type="button" className="link-btn" onClick={onShowSignUp}>Create account</button>
      </p>
    </div>
  );
}

