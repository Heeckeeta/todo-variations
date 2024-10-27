import './NewTaskForm.css';

import { useState } from 'react';

export default function NewTaskForm({ onAdd }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const mins = Number(min);
    const secs = Number(sec);
    if (mins >= 0 && secs >= 0 && (mins > 0 || secs > 0) && secs < 60) {
      onAdd(label.trim(), 60 * mins + secs);
    }
    setLabel('');
    setMin('');
    setSec('');
  };

  const onKey = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) onSubmit(e);
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="Task"
        autoFocus
        required
        onChange={(e) => setLabel(e.target.value)}
        value={label}
        onKeyDown={onKey}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        required
        onChange={(e) => setMin(e.target.value)}
        value={min}
        onKeyDown={onKey}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        required
        onChange={(e) => setSec(e.target.value)}
        value={sec}
        onKeyDown={onKey}
      />
    </form>
  );
}
