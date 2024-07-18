/*
This file describes search bar to search any specific task by the task name.
*/

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTasks } from '../redux/tasksSlice';

const SearchBar = ({ originalTasks }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const filteredTasks = originalTasks.filter(task =>
      task.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    dispatch(setTasks(filteredTasks));
  };

  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={query}
      onChange={handleSearch}
      className="search-bar"
    />
  );
};

export default SearchBar;
