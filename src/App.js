import './App.css';

import { useState } from 'react';

import Header from './Header.js';
import TaskList from './TaskList.js';
import Footer from './Footer.js';

let key = 100;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [selected, setSelected] = useState('All');

  const deleteTodo = (id) => {
    setTodos((todos) => todos.filter((el) => el.id != id));
  };

  const editTodo = (id, text) => {
    if (text === '') return;
    const idx = todos.findIndex((el) => el.id === id);
    const newTodo = { ...todos[idx], label: text };
    setTodos((todos) => todos.toSpliced(idx, 1, newTodo));
  };

  const onTimer = (timerState, id) => {
    const idx = todos.findIndex((el) => el.id === id);
    const newTodo = { ...todos[idx], timerState };
    setTodos((todos) => todos.toSpliced(idx, 1, newTodo));
  };

  const changeComplete = (id) => {
    setTodos((todos) => todos.map((el) => (el.id === id ? { ...el, completed: !el.completed } : el)));
  };

  const addItem = (text, time) => {
    if (text === '') return;
    const newTodo = {
      label: text,
      completed: false,
      id: key++,
      time,
      timerState: 'play',
      date: new Date(),
      pauses: [],
    };
    setTodos((todos) => [...todos, newTodo]);
  };

  const onPauses = (id, text) => {
    const idx = todos.findIndex((el) => el.id === id);
    if ((text === 'pause' && todos[idx].pauses.length % 2 === 0) || (text === 'play' && todos[idx].pauses % 2 === 1)) {
      todos[idx].pauses.push(new Date());
    }
  };

  const cleared = () => {
    setTodos((todos) => todos.filter((el) => !el.completed));
  };

  const onFilter = (select) => setSelected(select);

  const itemsLeft = todos.filter((el) => !el.completed).length;
  let taskList = todos;
  if (selected === 'Completed') taskList = todos.filter((el) => el.completed);
  if (selected === 'Active') taskList = todos.filter((el) => !el.completed);
  return (
    <section className="todoapp">
      <Header onAdd={addItem} />
      <section className="main">
        <TaskList
          todos={taskList}
          onDeleted={deleteTodo}
          onEdit={editTodo}
          onComplete={changeComplete}
          onTimer={onTimer}
          onPauses={onPauses}
        />
        <Footer itemsLeft={itemsLeft} cleared={cleared} selected={selected} onFilter={onFilter} />
      </section>
    </section>
  );
}
