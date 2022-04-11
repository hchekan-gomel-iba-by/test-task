import axios from 'axios';

export default {
  getProjects: () => axios.get(`/projects`),

  getProjectById: (projectId) => axios.get(`/projects/${projectId}`),

  createProject: (project) => axios.post(`/projects/`, project),

  updateProject: (projectId, project) =>
    axios.post(`/project/${projectId}`, project),

  deleteProject: (projectId) =>
    axios.delete(`/project/${projectId}`),
};
