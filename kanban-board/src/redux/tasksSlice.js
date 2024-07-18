import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: []
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    moveTask: (state, action) => {
      const { id, newStatus } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.status = newStatus;
      }
    }
  }
});

export const { addTask, removeTask, updateTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
