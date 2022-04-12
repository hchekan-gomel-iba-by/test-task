module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    id_project: String,
    id_user: String,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const ProjectUser = mongoose.model("projectUser", schema);
  return ProjectUser;
};
