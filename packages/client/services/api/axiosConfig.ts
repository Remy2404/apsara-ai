import axios from 'axios';
// Add necessary interceptors for auth tokens, base URL etc.
// Example:
// axios.defaults.baseURL = 'YOUR_API_BASE_URL'; 

const apiClient = axios.create({
  // baseURL: 'YOUR_API_BASE_URL', // Or set globally
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(async (config) => {
  // const token = await getAuthToken(); // Function to retrieve token
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default apiClient; // Ensure there is a default export
