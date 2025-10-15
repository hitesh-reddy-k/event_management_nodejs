const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/register", userController.createUser);

router.get("/getallusers", userController.getAllUsers);

router.get("/get/:id", userController.getUserById);

router.put("/update/:id", userController.updateUser);

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
