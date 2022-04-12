import axios from "axios";

export default {
  getProjectUser: () => axios.get(`/projectUser`),

  getUserByIdProject: (projectId) => axios.get(`/projectUser/${projectId}`),

  getProjectByIdUser: (userId) => axios.get(`/userProject/${userId}`),

  createProjectUser: (projectUser) => axios.post(`/projectUser`, projectUser),

  deleteProjectUserAll: (projectId) =>
    axios.delete(`/projectUser/${projectId}`),

  deleteUserProjectAll: (userId) => axios.delete(`/userProject/${userId}`),
};
