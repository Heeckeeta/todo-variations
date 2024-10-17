import './TasksFilter.css';

export default function TasksFilter({ onFilter, selected }) {
  const arraySelected = ['', '', ''];
  if (selected === 'All') arraySelected[0] = 'selected';
  if (selected === 'Active') arraySelected[1] = 'selected';
  if (selected === 'Completed') arraySelected[2] = 'selected';
  return (
    <ul className="filters">
      <li>
        <button className={arraySelected[0]} onClick={() => onFilter('All')}>
          All
        </button>
      </li>
      <li>
        <button className={arraySelected[1]} onClick={() => onFilter('Active')}>
          Active
        </button>
      </li>
      <li>
        <button className={arraySelected[2]} onClick={() => onFilter('Completed')}>
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
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
};
