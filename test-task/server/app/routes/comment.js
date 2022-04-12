module.exports = function (app) {
  const comments = require("../controllers/comment-controller.js");

  app.get("/comments", comments.findAll);
  app.get("/comments/:idProject", comments.findAllByIdProject);
  app.post("/comments", comments.create);
  app.delete("/comments/:idProject", comments.delete);
  app.delete("/commentsUser/:idUser", comments.deleteByUser);
};
