const express = require("express");
const {
  registerUser,
  findUser,
  getUsers,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);

module.exports = router;
