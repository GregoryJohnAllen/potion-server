var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Potion = sequelize.import("../models/potion");

router.post("/create", function(req, res) {
  var name = req.body.definition.name;
  var description = req.body.definition.description;
  var cost = req.body.definition.cost;
  var rarity = req.body.definition.rarity;
  var tags = req.body.definition.tags;
  var spell = req.body.definition.spell;

  Potion.create({
    name: name,
    description: description,
    cost: cost,
    rarity: rarity,
    tags: tags,
    spell: spell
  }).then(function createSuccess(name, description, cost, rarity, tags, spell) {
    res.json({
      name: name,
      description: description,
      cost: cost,
      rarity: rarity,
      tags: tags,
      spell: spell
    });
  },
  function createError(err) {
    res.send(500, err.message)
  }
  );
});

module.exports = router;
