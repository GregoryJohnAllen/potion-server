module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop',{
    shopname: DataTypes.STRING,
    ownername: DataTypes.STRING,
    description: DataTypes.STRING(1000),
    location: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    playerNum: DataTypes.INTEGER,
    levelNum: DataTypes.INTEGER,
    stockName: DataTypes.ARRAY(DataTypes.INTEGER),
    stockNum: DataTypes.ARRAY(DataTypes.INTEGER)
  })
}