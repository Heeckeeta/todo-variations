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

  state = { label: '' };

  onChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.label.trim());
    this.setState({ label: '' });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onChange}
          value={this.state.label}
        />
      </form>
    );
  }
}
