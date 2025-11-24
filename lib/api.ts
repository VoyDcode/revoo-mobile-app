import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Configure the Axios instance with a base URL. Adjust the `baseURL`
 * constant to point at your running Java backend. For example,
 * http://192.168.0.100:8080 or https://revoo-api.azurewebsites.net/api.
 */
// Create a preconfigured Axios instance with the base URL pointing at
// the Java backend.  The `/api` segment here means all requests made
// using this client will be prefixed with `/api` (e.g. `api.get('/habitos')`
// becomes `GET http://localhost:8080/api/habitos`).  Adjust the
// protocol/host/port below to match your own backend environment.
export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the token (if present) on every request.
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Persists the JWT token returned from the backend. The token is stored
 * using AsyncStorage so it persists across app restarts.
 * @param token JWT token returned from the login endpoint
 */
export async function setAuthToken(token: string) {
  await AsyncStorage.setItem('token', token);
}

/**
 * Clears the stored JWT token. This can be used during logout.
 */
export async function clearAuthToken() {
  await AsyncStorage.removeItem('token');
}