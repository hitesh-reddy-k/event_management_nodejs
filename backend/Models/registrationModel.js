const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Registration = sequelize.define("Registration", {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
  });
  return Registration;
};
