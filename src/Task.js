import './Task.css';

import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  static propTypes = {
    onEdit: (props, propsName, componentName) => {
      const val = props[propsName];
      if (typeof val === 'function') return null;
      return new TypeError(`${componentName}: ${propsName} must be a function`);
    },
    onDeleted: (props, propsName, componentName) => {
      const val = props[propsName];
      if (typeof val === 'function') return null;
      return new TypeError(`${componentName}: ${propsName} must be a function`);
    },
    onComplete: (props, propsName, componentName) => {
      const val = props[propsName];
      if (typeof val === 'function') return null;
      return new TypeError(`${componentName}: ${propsName} must be a function`);
    },
    label: (props, propsName, componentName) => {
      const val = props[propsName];
      if (typeof val === 'string') return null;
      return new TypeError(`${componentName}: ${propsName} must be a string`);
    },
    completed: (props, propsName, componentName) => {
      const val = props[propsName];
      if (typeof val === 'boolean') return null;
      return new TypeError(`${componentName}: ${propsName} must be a boolean`);
    },
  };

  state = {
    label: this.props.label,
    editing: false,
    date: new Date(),
    distance: 'less than a minute',
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.setState({ distance: formatDistanceToNow(this.state.date) }), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onEdit(this.state.label.trim());
    this.setState({ editing: false });
  };

  render() {
    const { label, completed, onDeleted, onComplete } = this.props;
    let classes = completed ? 'completed' : '';
    if (this.state.editing) classes += ' editing';
    return (
      <li className={classes}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={() => onComplete()} />
          <label>
            <span className="description">{label}</span>
            <span className="created">created {this.state.distance} ago</span>
          </label>
          <button className="icon icon-edit" onClick={() => this.setState({ editing: true })} />
          <button className="icon icon-destroy" onClick={() => onDeleted()} />
        </div>
        <form onSubmit={this.onSubmit}>
          {this.state.editing && (
            <input type="text" className="edit" value={this.state.label} autoFocus onChange={this.onChange} />
          )}
        </form>
      </li>
    );
  }
}
