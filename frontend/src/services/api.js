import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // wajib, supaya cookie refresh token ikut terkirim
});

let accessToken = null;
let unauthorizedHandler = () => {};

export function setAccessToken(token) {
  accessToken = token;
}

export function setUnauthorizedHandler(fn) {
  unauthorizedHandler = fn;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    if (status === 401 && original && !original._retry && !original.url.includes('/auth/')) {
      original._retry = true;
      try {
        if (!refreshPromise) {
          refreshPromise = api
            .post('/auth/refresh')
            .then((res) => {
              const newToken = res.data.data.accessToken;
              setAccessToken(newToken);
              return newToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }
        const newToken = await refreshPromise;
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (refreshErr) {
        unauthorizedHandler();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
