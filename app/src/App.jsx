import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage.jsx";
import TaskList from "./components/TaskList";
import { auth } from "./firebase.js";

function getAuthError(error) {
  const messages = {
    "auth/email-already-in-use": "An account already exists for this email.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/weak-password": "Choose a password with at least 6 characters.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/operation-not-allowed": "Email and password sign-in is not enabled in Firebase yet.",
    "auth/network-request-failed": "Connection failed. Check your internet and try again.",
    "auth/too-many-requests": "Too many attempts. Please wait a little and try again.",
  };
  return messages[error.code] || "Something went wrong. Please try again.";
}

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setAuthLoading(false);
  }), []);

  async function handleSignUp(name, email, password) {
    setError("");
    setSubmitting(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      try {
        await updateProfile(credential.user, { displayName: name.trim() });
      } catch {
        // The account is still valid if saving the optional display name fails.
      }
      setUser(auth.currentUser);
    } catch (authError) {
      setError(getAuthError(authError));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogin(email, password) {
    setError("");
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (authError) {
      setError(getAuthError(authError));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    setError("");
    try {
      await signOut(auth);
      setView("login");
    } catch (authError) {
      setError(getAuthError(authError));
    }
  }

  if (authLoading) return <main className="auth-loading">Loading your account...</main>;
  if (user) return <TaskList user={user} onLogout={handleLogout} authError={error} />;

  if (view === "signup") {
    return (
      <SignUpPage
        onSignUp={handleSignUp}
        onBack={() => { setError(""); setView("login"); }}
        error={error}
        submitting={submitting}
      />
    );
  }

  return (
    <LoginPage
      onLogin={handleLogin}
      onShowSignUp={() => { setError(""); setView("signup"); }}
      error={error}
      submitting={submitting}
    />
  );
}
