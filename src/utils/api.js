import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'https://restaurant-pos-service.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('token'),
  },
});
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response.status === 401) {
//       window.localStorage.clear();
//     }
//     return Promise.reject(err);
//   }
// );

export default api;
