import './Task.css';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function Task({
  label,
  completed,
  pauses,
  date,
  onDeleted,
  onComplete,
  time,
  timerState,
  onEdit,
  onTimer,
  onPauses,
}) {
  const [stateLabel, setLabel] = useState(label);
  const [stateEditing, setEditing] = useState(false);
  const [stateDistance, setDistance] = useState(formatDistanceToNow(date));
  let sumPauses = 0;
  for (let i = 1; i < pauses.length; i += 2) {
    sumPauses = sumPauses + Number(pauses[i]) - Number(pauses[i - 1]);
  }
  if (pauses.length % 2 === 1) {
    sumPauses = sumPauses + Number(Date.now()) - Number(pauses[pauses.length - 1]);
  }
  let restTime = time - ((Number(Date.now()) - Number(date) - sumPauses) / 1000).toFixed(0);
  if (restTime < 0) restTime = 0;
  const [stateTime, setTime] = useState(restTime);
  const [stateTimer, setTimer] = useState(
    `${Math.floor(restTime / 60)}:${restTime % 60 < 10 ? '0' : ''}${restTime % 60}`
  );
  const [stateTimerState, setTimerState] = useState(timerState);

  useEffect(() => {
    const distanceID = setInterval(() => setDistance(formatDistanceToNow(date)), 1000);
    const timerID = setTimeout(
      () =>
        setTime((t) => {
          if (stateTimerState === 'pause' || t === 0) return t;
          t--;
          const timer = `${Math.floor(t / 60)}:${t % 60 < 10 ? '0' : ''}${t % 60}`;
          setTimer(timer);
          return t;
        }),
      1000
    );
    return () => {
      clearInterval(distanceID);
      clearTimeout(timerID);
    };
  }, [stateTime, stateTimerState]);

  const onSubmit = (e) => {
    e.preventDefault();
    onEdit(stateLabel.trim());
    setEditing(false);
  };

  const playTimerState = () => {
    setTimerState('play');
    onTimer('play');
    onPauses('play');
  };

  const pauseTimerState = () => {
    setTimerState('pause');
    onTimer('pause');
    onPauses('pause');
  };

  let classes = completed ? 'completed' : '';
  if (stateEditing) classes += ' editing';
  return (
    <li className={classes}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={() => onComplete()} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={playTimerState} />
            <button className="icon icon-pause" onClick={pauseTimerState} />
            <span className="timer">{stateTimer}</span>
          </span>
          <span className="description">created {stateDistance} ago</span>
        </label>
        <button className="icon icon-edit" onClick={() => setEditing(true)} />
        <button className="icon icon-destroy" onClick={() => onDeleted()} />
      </div>
      <form onSubmit={onSubmit}>
        {stateEditing && (
          <input type="text" className="edit" value={stateLabel} autoFocus onChange={(e) => setLabel(e.target.value)} />
        )}
      </form>
    </li>
  );
}
