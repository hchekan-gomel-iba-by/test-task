const dbConfig = require("../config/db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.js")(mongoose);
db.projects = require("./project.js")(mongoose);
db.projectsUsers = require("./project-user.js")(mongoose);
db.comments = require("./comment.js")(mongoose);

module.exports = db;
