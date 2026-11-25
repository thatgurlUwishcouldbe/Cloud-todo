import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import TaskForm from "./TaskForm";

export default function TaskList({ user, onLogout, authError }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.uid) {
      setTasks([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    const tasksRef = collection(db, "users", user.uid, "tasks");
    return onSnapshot(tasksRef, (snapshot) => {
      setTasks(snapshot.docs.map((taskDoc) => ({ id: taskDoc.id, ...taskDoc.data() })));
      setLoading(false);
      setError("");
    }, () => {
      setError("Could not load your tasks. Check your Firestore rules and connection.");
      setLoading(false);
    });
  }, [user?.uid]);

  async function toggleTask(task) {
    setError("");
    try {
      await updateDoc(doc(db, "users", user.uid, "tasks", task.id), {
        completed: !task.completed,
      });
    } catch {
      setError("Could not update this task. Please try again.");
    }
  }

  async function deleteTask(task) {
    setError("");
    try {
      await deleteDoc(doc(db, "users", user.uid, "tasks", task.id));
    } catch {
      setError("Could not delete this task. Please try again.");
    }
  }

  async function saveTask(data) {
    setError("");
    try {
      const tasksRef = collection(db, "users", user.uid, "tasks");
      if (editing === "new") {
        await addDoc(tasksRef, {
          ...data,
          completed: false,
          createdAt: serverTimestamp(),
        });
      } else {
        await updateDoc(doc(db, "users", user.uid, "tasks", editing.id), data);
      }
      setEditing(null);
    } catch {
      setError("Could not save this task. Check your Firestore rules and try again.");
    }
  }

  const visible = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => filter === "All" || task.priority === filter)
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

  return (
    <main className="task-page">
      <header className="task-header">
        <div>
          <p className="eyebrow">To Do Tasks</p>
          <h2>My Tasks</h2>
          <p className="auth-subtitle">{user.displayName ? `Hi, ${user.displayName}` : user.email}</p>
        </div>
        <div className="header-actions">
          <button className="add-btn" onClick={() => { setError(""); setEditing("new"); }}>+ Add Task</button>
          <button className="logout-btn" onClick={onLogout}>Sign out</button>
        </div>
      </header>
      <div className="toolbar">
        <input aria-label="Search tasks" placeholder="Search tasks..." value={search}
          onChange={(event) => setSearch(event.target.value)} />
        <select aria-label="Filter tasks by priority" value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option>All</option><option>High</option><option>Medium</option><option>Low</option>
        </select>
      </div>
      {authError && <p className="error-text task-error" role="alert">{authError}</p>}
      {error && <p className="error-text task-error" role="alert">{error}</p>}
      {loading ? <p className="empty-state">Loading your tasks...</p> : visible.length === 0 ? (
        <div className="empty-state">
          <strong>{tasks.length === 0 ? "Your list is ready." : "No matching tasks."}</strong>
          <span>{tasks.length === 0 ? "Add your first task to get started." : "Try another search or filter."}</span>
        </div>
      ) : (
        <ul className="task-list">
          {visible.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? "done" : ""}`}>
              <input type="checkbox" aria-label={`Mark ${task.title} complete`} checked={Boolean(task.completed)} onChange={() => toggleTask(task)} />
              <div className="task-info">
                <span className="task-title">{task.title}</span>
                <small>{task.dueDate ? `Due: ${task.dueDate}` : "No due date"}</small>
              </div>
              <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
              <button className="edit-btn" onClick={() => { setError(""); setEditing(task); }}>Edit</button>
              <button className="delete-btn" aria-label={`Delete ${task.title}`} onClick={() => deleteTask(task)}>×</button>
            </li>
          ))}
        </ul>
      )}
      {editing && <TaskForm key={editing === "new" ? "new" : editing.id} task={editing === "new" ? null : editing}
        onSave={saveTask} onCancel={() => setEditing(null)} />}
    </main>
  );
}
