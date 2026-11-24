import { useState } from "react";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage.jsx";
import TaskList from "./components/TaskList";

export default function App() {
  const [view, setView] = useState("login");

  if (view === "tasks") {
    return <TaskList onLogout={() => setView("login")} />;
  }
  if (view === "signup") {
    return (
      <SignUpPage
        onSignUp={() => setView("tasks")}
        onBack={() => setView("login")}
      />
    );
  }
  return (
    <LoginPage
      onLogin={() => setView("tasks")}
      onShowSignUp={() => setView("signup")}
    />
  );
}