
### Full Source Code

Here is the full source code for the project:

#### `src/redux/store.js`

```js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});