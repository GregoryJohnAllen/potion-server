module.exports = function(sequelize, DataTypes) {
  return sequelize.define('potion',{
    name: DataTypes.STRING,
    description: DataTypes.STRING(1000),
    cost: DataTypes.INTEGER,
    rarity: DataTypes.STRING,
    tags: DataTypes.STRING,
    spell: DataTypes.STRING
  })
}