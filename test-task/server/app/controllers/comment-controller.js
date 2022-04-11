const db = require("../models");
const Comment = db.comments;

exports.create = (req, res) => {
  const Comment = new Comment({
    id_project: req.body.id_project,
    id_user: req.body.id_user,
    comment: req.body.comment
  });

  Comment
    .save(Comment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    });
};

exports.delete = (req, res) => {
  const idComment = req.params.idComment;

  Comment.findByIdAndRemove(idComment, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
        });
      } else {
        res.send({
          message: "Comment was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id
      });
    });
};
