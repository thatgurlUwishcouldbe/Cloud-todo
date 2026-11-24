import { useState } from "react";

export default function SignUpPage({ onSignUp, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    onSignUp(name, email, password);
  }

  return (
    <div className="login-card">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Full name" value={name}
          onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm password" value={confirm}
          onChange={(e) => setConfirm(e.target.value)} />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p className="switch-text">
        Already have an account?{" "}
        <button type="button" className="link-btn" onClick={onBack}>Login</button>
      </p>
    </div>
  );
}