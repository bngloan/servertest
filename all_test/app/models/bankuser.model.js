module.exports = (sequelize, Sequelize) => {
    const bankuser = sequelize.define("bankuser", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: Sequelize.STRING
          },
          idbank:{
            type: Sequelize.STRING,
          }
    },{timestamps: false});
    return bankuser;
  };