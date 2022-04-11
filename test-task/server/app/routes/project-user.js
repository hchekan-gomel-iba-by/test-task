module.exports = function(app) {
    const projectsUsers = require("../controllers/project-user-controller.js");
    
    app.post("/project/:id", projectsUsers.create);
    app.delete("/project/:idProject/user/:idUser", projectsUsers.delete);
};