var jwt = require("jsonwebtoken");
var sequelize = require("../db");
var User = sequelize.import("../models/user");

module.exports = function(req, res, next) {
  if (req.method == "OPTIONS") {
    next();
  } else {
    var sessionToken = req.headers.authorization;
    console.log(sessionToken); //Will need to remove this when uploading final code due to security
    sessionToken
      ? verifyToken()
      : res
          .status(403)
          .send({ auth: false, message: "No Token Has Been Provided" });

    function verifyToken() {
      jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
        decoded
          ? findUser(decoded)
          : res.status(401).send({ error: "You Are Not Authorized" });
      });
    }

    function findUser(decoded) {
      User.findOne({ where: { id: decoded.id } }).then(user => {
        req.user = user;
        next();
      });
    }
  }
};
