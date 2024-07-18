import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, moveTask, removeTask, updateTask } from './redux/tasksSlice';
import './styles.css';

function App() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); 
  const [editingTask, setEditingTask] = useState(null); 

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      const task = { ...newTask, id: Date.now(), status: 'To Do' };
      dispatch(addTask(task));
      setNewTask({ title: '', description: '' });
      setIsFormVisible(false); // Hide the form after adding the task
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description });
    setIsFormVisible(true);
  };

  const handleUpdateTask = () => {
    if (editingTask) {
      dispatch(updateTask({ ...editingTask, title: newTask.title, description: newTask.description }));
      setEditingTask(null);
      setNewTask({ title: '', description: '' });
      setIsFormVisible(false); // Hide the form after updating the task
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeTask(taskId));
    if (editingTask && editingTask.id === taskId) {
      setEditingTask(null);
      setNewTask({ title: '', description: '' });
      setIsFormVisible(false); // Hide the form when the editing task is deleted
    }
  };

  // eslint-disable-next-line
  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEditingTask(null); // Reset editing task
    setNewTask({ title: '', description: '' }); // Reset form fields
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData('taskId');
    dispatch(moveTask({ id: taskId, newStatus }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-task-btn" onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? 'Close' : 'Add Task'}
        </button>
      </div>
      <div className="kanban-board">
        {['To Do', 'In Progress', 'Peer Review', 'Done'].map((status) => (
          <div
            key={status}
            className="column"
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={handleDragOver}
          >
            <h2>{status}</h2>
            {filteredTasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div
                  key={task.id}
                  className="task"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                >
                  <div className="task-content">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </div>
                  <div className="task-actions">
                    <button
                      className="edit-task-btn"
                      onClick={() => handleEditTask(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-task-btn"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      {isFormVisible && (
        <div className="add-task-form">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          {editingTask ? (
            <button onClick={handleUpdateTask}>Update Task</button>
          ) : (
            <button onClick={handleAddTask}>Add Task</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
