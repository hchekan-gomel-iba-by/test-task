import axios from 'axios';

export default {
  getProjects: () => axios.get(`/projects`),

  getProjectById: (projectId) => axios.get(`/projects/${projectId}`),

  createProject: (project) => axios.post(`/projects`, project),

  updateProject: (projectId, project) =>
    axios.put(`/projects/${projectId}`, project),

  deleteProject: (projectId) =>
    axios.delete(`/projects/${projectId}`),
};
