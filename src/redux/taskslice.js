import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../services/gitServices';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const data = await apiService.getTasks();
  return data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const data = await apiService.addTask(task);
  return data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await apiService.deleteTask(id);
  return id;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const data = await apiService.updateTask(task);
  return data;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default tasksSlice.reducer;
