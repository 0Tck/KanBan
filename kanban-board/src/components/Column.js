import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import { useDispatch } from 'react-redux';
import { moveTask } from '../redux/tasksSlice';

const Column = ({ status, tasks }) => {
  const dispatch = useDispatch();

  const [, ref] = useDrop({
    accept: 'TASK',
    drop: (item) => dispatch(moveTask({ id: item.id, newStatus: status })),
  });

  return (
    <div ref={ref} className="column">
      <h2>{status}</h2>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
