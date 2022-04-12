module.exports = function (app) {
  const projects = require("../controllers/project-controller.js");

  app.get("/projects", projects.findAll);
  app.get("/projects/:id", projects.findOne);
  app.post("/projects", projects.create);
  app.put("/projects/:id", projects.update);
  app.delete("/projects/:id", projects.delete);
};
