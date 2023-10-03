const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const createToken = (_id) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  const { strNickname } = req.body;

  try {
    let user = await userModel.findOne({ strNickname });

    if (user) {
      if (!strNickname) return res.status(400).json("Debe existir un nickname");

      const token = createToken(strNickname);

      res.status(200).json({ _id: user._id, strNickname, token });
    } else {
      user = new userModel({ strNickname });

      if (!strNickname) return res.status(400).json("El nicknamen o es valido");

      await user.save();

      const token = createToken(user._id);

      res.status(200).json({ _id: user._id, strNickname, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { registerUser, findUser, getUsers };
