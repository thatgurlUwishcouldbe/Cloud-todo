import { useEffect, useState } from "react";
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut,
updateProfile,
} from "firebase/auth";

import { auth } from "./firebase.js";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage.jsx";
import TaskList from "./components/TaskList";

export default function App() {
const [user, setUser] = useState(null);
const [view, setView] = useState("login");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
return onAuthStateChanged(auth, (currentUser) => {
setUser(currentUser);
setLoading(false);
});
}, []);

async function handleSignUp(name, email, password) {
setError("");
try {
const result = await createUserWithEmailAndPassword(
auth, email, password
);
await updateProfile(result.user, { displayName: name });
} catch (err) {
setError(err.message);
}
}

async function handleLogin(email, password) {
setError("");
try {
await signInWithEmailAndPassword(auth, email, password);
} catch (err) {
setError(err.message);
}
}

async function handleLogout() {
await signOut(auth);
setView("login");
}

if (loading) return <p>Loading...</p>;

if (user) {
return <TaskList user={user} onLogout={handleLogout} />;
}

return (
<>
{error && <p className="error-text">{error}</p>}

  {view === "signup" ? (
    <SignUpPage
      onSignUp={handleSignUp}
      onBack={() => {
        setError("");
        setView("login");
      }}
    />
  ) : (
    <LoginPage
      onLogin={handleLogin}
      onShowSignUp={() => {
        setError("");
        setView("signup");
      }}
    />
  )}
</>
);
}