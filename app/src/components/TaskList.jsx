import { useState } from "react";
import TaskForm from "./TaskForm";

const sampleTasks = [
  { id: 1, title: "Finish report", dueDate: "2026-12-01", priority: "High", completed: false },
  { id: 2, title: "Study for exam", dueDate: "2026-12-03", priority: "Medium", completed: false },
  { id: 3, title: "Buy groceries", dueDate: "2026-11-28", priority: "Low", completed: true },
];

export default function TaskList({ onLogout }) {
  const [tasks, setTasks] = useState(sampleTasks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState(null);

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }
  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }
  function saveTask(data) {
    if (editing === "new") {
      setTasks([...tasks, { id: Date.now(), completed: false, ...data }]);
    } else {
      setTasks(tasks.map((t) => (t.id === editing.id ? { ...t, ...data } : t)));
    }
    setEditing(null);
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
          <button className="add-btn" onClick={() => setEditing("new")}>+ Add Task</button>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>
      <div className="toolbar">
        <input placeholder="Search tasks..." value={search}
          onChange={(e) => setSearch(e.target.value)} />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option><option>High</option>
          <option>Medium</option><option>Low</option>
        </select>
      </div>
      <ul className="task-list">
        {visible.map((t) => (
          <li key={t.id} className={`task-item ${t.completed ? "done" : ""}`}>
            <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t.id)} />
            <div className="task-info">
              <span className="task-title">{t.title}</span>
              <small>Due: {t.dueDate}</small>
            </div>
            <span className={`badge ${t.priority.toLowerCase()}`}>{t.priority}</span>
            <button className="edit-btn" onClick={() => setEditing(t)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteTask(t.id)}>✕</button>
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