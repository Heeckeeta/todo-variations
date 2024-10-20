import './NewTaskForm.css';

import { Component } from 'react';

export default class NewTaskForm extends Component {
  static propTypes = {
    onAdd: (props, propsName, componentName) => {
      const val = props[propsName];
      if (typeof val === 'function') return null;
      return new TypeError(`${componentName}: ${propsName} must be a function`);
    },
  };

  state = { label: '', min: '', sec: '' };

  onChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onChangeMin = (e) => {
    this.setState({ min: e.target.value });
  };

  onChangeSec = (e) => {
    this.setState({ sec: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const min = Number(this.state.min);
    const sec = Number(this.state.sec);
    if (min >= 0 && sec >= 0 && (min > 0 || sec > 0) && sec < 60) {
      this.props.onAdd(this.state.label.trim(), 60 * min + sec);
    }
    this.setState({ label: '', min: '', sec: '' });
  };

  onKey = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) this.onSubmit(e);
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          required
          onChange={this.onChange}
          value={this.state.label}
          onKeyDown={this.onKey}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          required
          onChange={this.onChangeMin}
          value={this.state.min}
          onKeyDown={this.onKey}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          required
          onChange={this.onChangeSec}
          value={this.state.sec}
          onKeyDown={this.onKey}
        />
      </form>
    );
  }
}
