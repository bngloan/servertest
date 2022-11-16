module.exports = (sequelize, Sequelize) => {
    const loan = sequelize.define("loan", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          amountmin: {
            type: Sequelize.FLOAT(11,2),
          },
          amountmax:{
            type: Sequelize.FLOAT(11,2),
          },
          interest:{
            type: Sequelize.FLOAT(11,2),
          },
          longtime:{
            type: Sequelize.INTEGER,
          }
    },{timestamps: false});
    return loan;
  };