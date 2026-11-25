import { useState } from "react";

export default function SignUpPage({ onSignUp, onBack, error, submitting }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      setConfirmError("Passwords do not match.");
      return;
    }
    setConfirmError("");
    onSignUp(name, email, password);
  }

  return (
    <div className="login-card">
      <p className="eyebrow">To Do Tasks</p>
      <h2>Create your account</h2>
      <p className="auth-subtitle">Your tasks, ready on every device.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="signup-name">Full name</label>
        <input id="signup-name" placeholder="Your name" autoComplete="name" required value={name}
          onChange={(e) => setName(e.target.value)} />
        <label htmlFor="signup-email">Email</label>
        <input id="signup-email" type="email" placeholder="you@example.com" autoComplete="email" required value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="signup-password">Password</label>
        <input id="signup-password" type="password" placeholder="At least 6 characters" autoComplete="new-password" minLength={6} required value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="signup-confirm">Confirm password</label>
        <input id="signup-confirm" type="password" placeholder="Type your password again" autoComplete="new-password" required value={confirm}
          onChange={(e) => { setConfirm(e.target.value); setConfirmError(""); }} />
        {(error || confirmError) && <p className="error-text" role="alert">{error || confirmError}</p>}
        <button type="submit" disabled={submitting}>{submitting ? "Creating account..." : "Create account"}</button>
      </form>
      <p className="switch-text">
        Already have an account?{" "}
        <button type="button" className="link-btn" onClick={onBack}>Login</button>
      </p>
    </div>
  );
}

