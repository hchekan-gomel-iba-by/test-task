import axios from 'axios';

export default {
  getUsers: () => axios.get("/users"),
  createUser: (user) => axios.post(`/users`, user),
  deleteUser: (userId) => axios.delete(`/users/${userId}`),
};
