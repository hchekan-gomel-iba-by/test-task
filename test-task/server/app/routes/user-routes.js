module.exports = function(app) {
    const users = require("../controllers/user-controller.js");
    
    app.get("/users", users.findAll);
    app.get("/users/:id", users.findOne);
    app.post("/users", users.create);
    app.put("/users/:id", users.update);
    app.delete("/users/:id", users.delete);
};