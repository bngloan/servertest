module.exports = (sequelize, Sequelize) => {
    const bank = sequelize.define("bank", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          bankname: {
            type: Sequelize.STRING
          }
    },{timestamps: false});
    return bank;
  };