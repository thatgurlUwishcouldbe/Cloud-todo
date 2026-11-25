import { useState } from "react";

export default function TaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");
  const [priority, setPriority] = useState(task ? task.priority : "Medium");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await onSave({ title: title.trim(), dueDate, priority });
    setSaving(false);
  }

  return (
    <div className="modal-overlay">
      <form className="task-form" onSubmit={handleSubmit}>
        <h3>{task ? "Edit Task" : "Add Task"}</h3>
        <label>Title</label>
        <input value={title} placeholder="Task title"
          onChange={(e) => setTitle(e.target.value)} />
        <label>Due date</label>
        <input type="date" value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} />
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel} disabled={saving}>Cancel</button>
          <button type="submit" className="save-btn" disabled={saving}>{saving ? "Saving..." : "Save task"}</button>
        </div>
      </form>
    </div>
  );
}
