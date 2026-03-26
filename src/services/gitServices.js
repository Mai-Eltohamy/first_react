import axios from 'axios';

// إنشاء instance مخصص لـ GitHub API
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

export const githubService = {
  getUserById: async (userId) => {
    try {
      const response = await githubApi.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
    
        throw new Error(error.response.data.message || 'ERROR RESPONSE');
      } else if (error.request) {
        
        throw new Error('NO RESPONSE');
      } else {
        
        throw new Error(error.message);
      }
    }
  },
};