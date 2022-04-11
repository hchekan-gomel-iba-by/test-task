const userRoutes = require('./user-routes');
const projectRoutes = require('./project-routes');
const projectUserRoutes = require('./project-user');
const comment = require('./comment');

module.exports = function(app) {
  userRoutes(app);
  projectRoutes(app);
  projectUserRoutes(app);
  comment(app);
};