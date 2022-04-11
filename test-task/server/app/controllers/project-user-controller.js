const db = require("../models");
const ProjectUser = db.projectsUsers;

exports.create = (req, res) => {
  const ProjectUser = new ProjectUser({
    id_project: req.body.id_project,
    id_user: req.body.id_user,
  });

  ProjectUser
    .save(ProjectUser)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ProjectUser."
      });
    });
};

exports.delete = (req, res) => {
  const idUser = req.params.idUser;
  const idProject = req.params.idProject;

  
};
