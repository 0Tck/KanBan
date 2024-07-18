import React from 'react';
import { useDrag } from 'react-dnd';

const TaskCard = ({ task }) => {
  const [{ isDragging }, ref] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={ref} className="task-card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;
