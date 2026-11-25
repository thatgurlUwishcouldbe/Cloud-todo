import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";

import {
collection,
addDoc,
updateDoc,
deleteDoc,
doc,
onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase.js";

export default function TaskList({ user, onLogout }) {
const [tasks, setTasks] = useState([]);
const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");
const [editing, setEditing] = useState(null);
const [error, setError] = useState("");

// Load tasks belonging to the signed-in user
useEffect(() => {
if (!user?.uid) return;

const tasksRef = collection(db, "users", user.uid, "tasks");

const unsubscribe = onSnapshot(
  tasksRef,
  (snapshot) => {
    setTasks(
      snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }))
    );
    setError("");
  },
  (err) => setError(err.message)
);

return unsubscribe;
}, [user?.uid]);

// Add or update a task
async function saveTask(data) {
try {
const tasksRef = collection(db, "users", user.uid, "tasks");

  if (editing === "new") {
    await addDoc(tasksRef, {
      ...data,
      completed: false,
    });
  } else {
    const taskRef = doc(
      db,
      "users",
      user.uid,
      "tasks",
      editing.id
    );

    await updateDoc(taskRef, data);
  }

  setEditing(null);
  setError("");
} catch (err) {
  setError(err.message);
}
}

// Toggle task completion
async function toggleTask(id, completed) {
try {
const taskRef = doc(db, "users", user.uid, "tasks", id);
await updateDoc(taskRef, { completed: !completed });
} catch (err) {
setError(err.message);
}
}

// Delete a task
async function deleteTask(id) {
try {
const taskRef = doc(db, "users", user.uid, "tasks", id);
await deleteDoc(taskRef);
} catch (err) {
setError(err.message);
}
}

const visible = tasks.filter(
(t) =>
t.title.toLowerCase().includes(search.toLowerCase()) &&
(filter === "All" || t.priority === filter)
);

return (
<div className="task-page">
<header className="task-header">
<h2>My Tasks</h2>

    <div className="header-actions">
      <button
        className="add-btn"
        onClick={() => setEditing("new")}
      >
        + Add Task
      </button>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  </header>

  {error && <p className="error-text">{error}</p>}

  <div className="toolbar">
    <input
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option>All</option>
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
    </select>
  </div>

  <ul className="task-list">
    {visible.map((t) => (
      <li
        key={t.id}
        className={`task-item ${t.completed ? "done" : ""}`}
      >
        <input
          type="checkbox"
          checked={t.completed}
          onChange={() => toggleTask(t.id, t.completed)}
        />

        <div className="task-info">
          <span className="task-title">{t.title}</span>
          <small>Due: {t.dueDate}</small>
        </div>

        <span className={`badge ${t.priority.toLowerCase()}`}>
          {t.priority}
        </span>

        <button
          className="edit-btn"
          onClick={() => setEditing(t)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTask(t.id)}
        >
          ✕
        </button>
      </li>
    ))}
  </ul>

  {editing && (
    <TaskForm
      task={editing === "new" ? null : editing}
      onSave={saveTask}
      onCancel={() => setEditing(null)}
    />
  )}
</div>
);
}