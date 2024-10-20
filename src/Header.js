import './Header.css';

import NewTaskForm from './NewTaskForm.js';

export default function Header({ onAdd }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAdd={(text, time) => onAdd(text, time)} />
    </header>
  );
}

Header.propTypes = {
  onAdd: (props, propsName, componentName) => {
    const val = props[propsName];
    if (typeof val === 'function') return null;
    return new TypeError(`${componentName}: ${propsName} must be a function`);
  },
};
