module.exports = function(app) {
    const comments = require("../controllers/comment-controller.js");
    
    app.post("/comment", comments.create);
    app.delete("/project/:idComment", comments.delete);
};