import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';

const NewTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ id: Date.now(), title, description, status: 'To Do' }));
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <input 
        type="text" 
        placeholder="Task Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Task Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default NewTaskForm;
