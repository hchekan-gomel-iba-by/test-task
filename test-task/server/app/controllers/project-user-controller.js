const db = require("../models");
const ProjectUser = db.projectsUsers;

exports.create = (req, res) => {
  const projectUser = new ProjectUser({
    id_project: req.body.id_project,
    id_user: req.body.id_user,
  });

  ProjectUser.create(projectUser)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ProjectUser.",
      });
    });
};

exports.delete = (req, res) => {
  const idProject = req.params.idProject;

  ProjectUser.deleteMany({ id_project: idProject })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with idProject=${idProject}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with idProject=" + idProject,
      });
    });
};
exports.deleteByUser = (req, res) => {
  const idUser = req.params.idUser;

  ProjectUser.deleteMany({ id_user: idUser })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with idProject=${idUser}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with idProject=" + idUser,
      });
    });
};

exports.findAll = (req, res) => {
  ProjectUser.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

exports.findAllByIdProject = (req, res) => {
  const idProject = req.params.idProject;

  ProjectUser.find({ id_project: idProject })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

exports.findAllByIdUser = (req, res) => {
  const idUser = req.params.idUser;

  ProjectUser.find({ id_user: idUser })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};
