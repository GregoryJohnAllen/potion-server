var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Shop = sequelize.import("../models/shop");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

//complete list of all shops created by the logged in user
router.get("/getall", function(req, res) {
  var userid = req.user.id;
  Shop.findAll({
    where: {
      owner: userid
    }
  }).then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAll(err) {
      res.send(500, err.message);
    }
  );
});

//user creating a new shop
router.post("/create", function(req, res) {
  var owner = req.user.id;
  var shopNameText = req.body.definition.shopname;
  var ownerNameText = req.body.definition.ownername;
  var descriptionText = req.body.definition.description;
  var locationText = req.body.definition.location;
  var playerNumText = req.body.definition.playerNum;
  var levelNumText = req.body.definition.levelNum;

  Shop.create({
    shopname: shopNameText,
    ownername: ownerNameText,
    description: descriptionText,
    location: locationText,
    playerNum: playerNumText,
    levelNum: levelNumText,
    owner: owner
  }).then(
    function createSuccess(
      shopname,
      ownername,
      description,
      location,
      playerNum,
      levelNum
    ) {
      res.json({
        shopname: shopname,
        ownername: ownername,
        description: description,
        location: location,
        playerNum: playerNum,
        levelNum: levelNum
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

//viewing 1 shop
router.get("/:id", function(req, res) {
  var primarykey = req.params.id;
  var userid = req.user.id;
  Shop.findOne({
    where: { id: primarykey, owner: userid }
  }).then(data => {
    return data
      ? res.json(data)
      : res.send(
          "Not authorized to access this shop, please login to correct user"
        );
  }),
    err => res.send(500, err.message);
});

//updating by 1 shop (can only edit text fields, not numPlayer or numLevel may add this later)
router.put("/updatetext/:id", function(req, res) {
  var primaryKey = req.params.id;
  var userid = req.user.id;
  var shopNameText = req.body.definition.shopname;
  var ownerNameText = req.body.definition.ownername;
  var descriptionText = req.body.definition.description;
  var locationText = req.body.definition.location;

  Shop.update(
    {
      shopname: shopNameText,
      ownername: ownerNameText,
      description: descriptionText,
      location: locationText
    },
    { where: { id: primaryKey, owner: userid } }
  ).then(data => {
    return data > 0
      ? res.json(data)
      : res.send(
          "Not authorized to access this shop, please login to correct user"
        );
  }),
    err => res.send(500, err.message);
});

//delete 1 shop
router.delete("/delete/:id", function(req, res) {
  var primaryKey = req.params.id;
  var userid = req.user.id;

  Shop.destroy({
    where: { id: primaryKey, owner: userid }
  }).then(data => {
    return res.json(data);
  }),
    err => res.send(500, err.message);
});

module.exports = router;
