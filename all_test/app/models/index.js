const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+07:00', // for writing to database
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/roles.model.js")(sequelize, Sequelize);
// db.setstatus = require("../models/setstatus.model.js")(sequelize, Sequelize);
db.bank = require("../models/bank.model.js")(sequelize, Sequelize);
db.bankuser = require("../models/bankuser.model.js")(sequelize, Sequelize);

db.people = require("../models/people.model.js")(sequelize, Sequelize);
db.loan = require("../models/loan.model.js")(sequelize, Sequelize);
db.loanstate = require("../models/loanstate.model.js")(sequelize, Sequelize);
db.weburl = require("../models/weburl.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.people.belongsToMany(db.loan,{
  through:{
  model:db.loanstate,
  as: "loan",
  unique: false,
  // onDelete:'restrict'
  },foreignKey:"peopleId",
})
db.loan.belongsToMany(db.people,{
  through:{
  model:db.loanstate,
  as: "people",
  unique: false,
  // onDelete:'restrict'
  },foreignKey:"loanId",
})

// db.people.belongsToMany(db.loanstate,{
//   through:{
//   model:db.loanstate,
//   as: "loanstate",

//   },foreignKey:"peopleId",
// })
// db.loanstate.belongsToMany(db.people,{
//   through:{
//   model:db.loanstate,
//   as: "people",

//   }
// })

// db.loan.belongsToMany(db.loanstate,{
//   through:{
//   model:db.loanstate,
//   as: "loanstate",
//   // unique: false,
//   // onDelete:'restrict'
//   },foreignKey:"loanId",
// })
// db.loanstate.belongsToMany(db.loan,{
//   through:{
//   model:db.loanstate,
//   as: "loan",
//   // unique: false,
//   // onDelete:'restrict'
//   }
// })

db.people.hasMany(db.loanstate,{as:"loanstates"});
db.loanstate.belongsTo(db.people,{foreignKey: "peopleId",
as: "people",});

db.loan.hasMany(db.loanstate,{as:"loans"});
db.loanstate.belongsTo(db.loan,{foreignKey: "loanId",
as: "loans",});

db.ROLES = ["user", "admin", "mod"];

// db.setstatus.hasMany(db.people,{as:"peoples"});
// db.people.belongsTo(db.setstatus,{foreignKey: "setstatusId",
// as: "setstatuses",});

// db.people.hasMany(db.bankuser,{as:"bankusers",allowNull:false});
// db.bankuser.belongsTo(db.people,{foreignKey: "peopleId",allowNull:false,
// as: "peoples",});

db.people.hasMany(db.bankuser,{foreignKey:{name:'peopleId',allowNull:false},onDelete:'CASCADE'});
db.bankuser.belongsTo(db.people,{foreignKey:{name:'peopleId',allowNull:false},onDelete:'CASCADE'})

db.bank.hasMany(db.bankuser,{as:"bankusers"});
db.bankuser.belongsTo(db.bank,{foreignKey: "bankId",
as: "banks",});


module.exports = db;