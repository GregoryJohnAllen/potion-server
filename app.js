require('dotenv').config();

var express = require("express");
var app = express();
var sequelize = require("./db");
var bodyParser = require("body-parser")
var user = require("./controllers/usercontroller");
var potion = require("./controllers/potioncontroller");
var shop = require("./controllers/shopcontroller");



sequelize.sync();
app.use(bodyParser.json());
app.use(require("./middleware/headers"));

//non-authenticated routes
app.use("/user", user);
app.use("/potion", potion);

app.use(require("./middleware/validate-session"));

//authenticated routes
app.use("/shop", shop);

// If your using express to listen on a port it will be app.listen. 
// If your using node http to listen on a port it will be http.listen.  
app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`)
})
