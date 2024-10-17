import './App.css';

import { Component } from 'react';

import Header from './Header.js';
import TaskList from './TaskList.js';
import Footer from './Footer.js';

let key = 100;

export default class App extends Component {
  state = {
    todos: [],
    selected: 'All',
  };

  deleteTodo = (id) => {
    this.setState(({ todos }) => {
      return { todos: todos.filter((el) => el.id != id) };
    });
  };

  editTodo = (id, text) => {
    if (text === '') return;
    const idx = this.state.todos.findIndex((el) => el.id === id);
    const newTodo = { ...this.state.todos[idx], label: text };
    this.setState(({ todos }) => {
      return { todos: todos.toSpliced(idx, 1, newTodo) };
    });
  };

  changeComplete = (id) => {
    this.setState(({ todos }) => {
      return { todos: todos.map((el) => (el.id === id ? { ...el, completed: !el.completed } : el)) };
    });
  };

  addItem = (text) => {
    if (text === '') return;
    const newTodo = {
      label: text,
      completed: false,
      id: key++,
    };
    this.setState(({ todos }) => {
      return { todos: [...todos, newTodo] };
    });
  };

  cleared = () => {
    this.setState(({ todos }) => {
      return { todos: todos.filter((el) => !el.completed) };
    });
  };

  onFilter = (select) => this.setState({ selected: select });

  render() {
    const itemsLeft = this.state.todos.filter((el) => !el.completed).length;
    let taskList = this.state.todos;
    if (this.state.selected === 'Completed') taskList = this.state.todos.filter((el) => el.completed);
    if (this.state.selected === 'Active') taskList = this.state.todos.filter((el) => !el.completed);
    return (
      <section className="todoapp">
        <Header onAdd={this.addItem} />
        <section className="main">
          <TaskList
            todos={taskList}
            onDeleted={this.deleteTodo}
            onEdit={this.editTodo}
            onComplete={this.changeComplete}
          />
          <Footer
            itemsLeft={itemsLeft}
            cleared={this.cleared}
            selected={this.state.selected}
            onFilter={this.onFilter}
          />
        </section>
      </section>
    );
  }
}
