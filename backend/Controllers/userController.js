const { User } = require("../Models/modelIndexing"); 
const { createUserSchema } = require("../Utitles/userValadation");

exports.createUser = async (req, res) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existingUser = await User.findOne({ where: { email: value.email } });
    if (existingUser) return res.status(400).json({ message: "email have already registered" });

    const user = await User.create(value);
    res.status(201).json({ message: "account created successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error ", error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email } = req.body;
    if (email) {
      const emailExists = await User.findOne({ where: { email, id: { [User.sequelize.Op.ne]: user.id } } });
      if (emailExists) return res.status(400).json({ message: "Email already in use" });
    }

    await user.update({ name, email });
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};
