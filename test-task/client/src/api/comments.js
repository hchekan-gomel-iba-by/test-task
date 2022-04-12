import axios from "axios";

export default {
  getComments: () => axios.get(`/comments`),

  getCommentsByIdProject: (projectId) => axios.get(`/comments/${projectId}`),

  createComments: (comment) => axios.post(`/comments`, comment),

  deleteCommentsByIdProject: (projectId) =>
    axios.delete(`/comments/${projectId}`),

  deleteCommentsByIdUser: (userId) => axios.delete(`/commentsUser/${userId}`),
};
