module.exports = function (app) {
  const projectsUsers = require("../controllers/project-user-controller.js");

  app.get("/projectUser", projectsUsers.findAll);
  app.get("/projectUser/:idProject", projectsUsers.findAllByIdProject);
  app.get("/userProject/:idUser", projectsUsers.findAllByIdUser);
  app.post("/projectUser", projectsUsers.create);
  app.delete("/projectUser/:idProject", projectsUsers.delete);
  app.delete("/userProject/:idUser", projectsUsers.deleteByUser);
};
