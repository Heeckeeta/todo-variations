import './Footer.css';

import TasksFilter from './TasksFilter.js';

export default function Footer({ itemsLeft, onFilter, selected, cleared }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter onFilter={(select) => onFilter(select)} selected={selected} />
      <button className="clear-completed" onClick={() => cleared()}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  itemsLeft: (props, propsName, componentName) => {
    const val = props[propsName];
    if (typeof val === 'number' && !isNaN(val)) return null;
    return new TypeError(`${componentName}: ${propsName} must be a number`);
  },
  selected: (props, propsName, componentName) => {
    const val = props[propsName];
    if (typeof val === 'string') return null;
    return new TypeError(`${componentName}: ${propsName} must be a string`);
  },
  onFilter: (props, propsName, componentName) => {
    const val = props[propsName];
    if (typeof val === 'function') return null;
    return new TypeError(`${componentName}: ${propsName} must be a function`);
  },
  cleared: (props, propsName, componentName) => {
    const val = props[propsName];
    if (typeof val === 'function') return null;
    return new TypeError(`${componentName}: ${propsName} must be a function`);
  },
};
