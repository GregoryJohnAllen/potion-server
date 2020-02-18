const Sequelize = require("sequelize");

// const sequelize = new Sequelize("potionshop", "postgres", "password", {
//   host: "localhost",
//   dialect: "postgres"
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
})

sequelize.authenticate().then(
  function() {
    console.log("Connected to potionshop postgres database");
  },
  function(err) {
    console.log(err);
  }
);

module.exports = sequelize;
