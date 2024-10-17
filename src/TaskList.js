import './TaskList.css';

import Task from './Task.js';

export default function TaskList({ todos, onDeleted, onEdit, onComplete }) {
  const elems = todos.map((item) => (
    <Task
      {...item}
      key={item.id}
      onDeleted={() => onDeleted(item.id)}
      onEdit={(text) => onEdit(item.id, text)}
      onComplete={() => onComplete(item.id)}
    />
  ));
  return <ul className="todo-list">{elems}</ul>;
}

TaskList.propTypes = {
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
};
