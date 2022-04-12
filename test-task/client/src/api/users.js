import axios from 'axios';

export default {
  getUsers: () => axios.get("/users"),
  getUserById: (userId) => axios.get(`/users/${userId}`),
  createUser: (user) => axios.post(`/users`, user),
  deleteUser: (userId) => axios.delete(`/users/${userId}`),
};
