require("dotenv").config();

var express = require("express");
var app = express();

var user = require("./controllers/usercontroller");
var potion = require("./controllers/potioncontroller");
var shop = require("./controllers/shopcontroller");

var sequelize = require("./db");

sequelize.sync();
app.use(express.json());
app.use(require("./middleware/headers"));

//non-authenticated routes
app.use("/user", user);
app.use("/potion", potion);

app.use(require("./middleware/validate-session"));

//authenticated routes
app.use("/shop", shop);

app.listen(4000, function() {
  console.log("App is listening on port 4000");
});
