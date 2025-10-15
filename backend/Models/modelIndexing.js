const sequelize = require("../Database/Connectdb");
const UserModel = require("../Models/userModel");
const EventModel = require("../Models/eventModel");
const RegistrationModel = require("../Models/registrationModel");

const User = UserModel(sequelize);

const Event = EventModel(sequelize);

const Registration = RegistrationModel(sequelize);

User.belongsToMany(Event,
     { 
        through: Registration 
    });

Event.belongsToMany(User, 
    { 
        through: Registration 
    });

sequelize.sync({ alter: true })
  .then(() => console.log("synced"))
  .catch((err) => console.error("Sync error:", err));

module.exports = { sequelize, User, Event, Registration };
