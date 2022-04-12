const db = require("../models");
const Comment = db.comments;

exports.create = (req, res) => {
  const comment = new Comment({
    id_project: req.body.id_project,
    id_user: req.body.id_user,
    comment: req.body.comment,
  });

  Comment.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment.",
      });
    });
};

exports.delete = (req, res) => {
  const idProject = req.params.idProject;

  Comment.deleteMany({ id_project: idProject })
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
  console.log(idUser);
  Comment.deleteMany({ id_user: idUser })
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
  Comment.find({})
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

  Comment.find({ id_project: idProject })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};
