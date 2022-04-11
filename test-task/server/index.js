const routes = require('./app/routes');
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test-task", { useNewUrlParser: true });

const PORT = process.env.PORT || 3001;
const app = express();

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

routes(app);

app.listen(PORT, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${PORT}`);
});
