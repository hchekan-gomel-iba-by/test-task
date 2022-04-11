module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      date_start: Date,
      date_finish: Date,
      list_users: String
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Project = mongoose.model("project", schema);
  return Project;
};
