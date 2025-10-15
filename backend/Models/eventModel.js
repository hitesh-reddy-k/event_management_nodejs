const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Event = sequelize.define("Event", {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    dateTime: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    capacity: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        validate: { min: 1, max: 1000 }
     }
  });
  return Event;
};
