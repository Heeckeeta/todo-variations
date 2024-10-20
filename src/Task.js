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
    time: this.props.time,
    timer: `${Math.floor(this.props.time / 60)}:${this.props.time % 60 < 10 ? '0' : ''}${this.props.time % 60}`,
    timerState: this.props.timerState,
  };

  componentDidMount() {
    this.distanceID = setInterval(() => this.setState({ distance: formatDistanceToNow(this.state.date) }), 30000);
    this.timerID = setInterval(
      () =>
        this.setState(({ time }) => {
          if (this.state.timerState === 'pause') return;
          time--;
          if (!time) clearInterval(this.timerID);
          const timer = `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;
          return {
            time,
            timer,
          };
        }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.distanceID);
    if (this.state.time) clearInterval(this.timerID);
  }

  onChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onEdit(this.state.label.trim());
    this.setState({ editing: false });
  };

  playTimerState = () => {
    this.setState({ timerState: 'play' });
    this.props.onTimer('play');
  };

  pauseTimerState = () => {
    this.setState({ timerState: 'pause' });
    this.props.onTimer('pause');
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
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.playTimerState} />
              <button className="icon icon-pause" onClick={this.pauseTimerState} />
              <span className="timer">{this.state.timer}</span>
            </span>
            <span className="description">created {this.state.distance} ago</span>
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
