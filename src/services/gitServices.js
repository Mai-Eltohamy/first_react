import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.x:3000', 
  timeout: 10000,
  headers: { 'Accept': 'application/json' },
});

export const apiService = {
  getUserByUsername: async (username) => {
    try {
      const response = await api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message || 'ERROR RESPONSE');
      else if (error.request) throw new Error('NO RESPONSE');
      else throw new Error(error.message);
    }
  },

  getTasks: async () => {
    const res = await api.get('/tasks');
    return res.data;
  },

  addTask: async (task) => {
    const res = await api.post('/tasks', task);
    return res.data;
  },

  updateTask: async (task) => {
    const res = await api.put(`/tasks/${task.id}`, task);
    return res.data;
  },

  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
  },
};
