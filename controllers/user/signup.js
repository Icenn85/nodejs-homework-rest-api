const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/index");
const bcrypt = require("bcrypt");

async function signup(req, res, next) {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);
        const savedUser = await User.create({ email, password: hashedPass });
    return res.status(201).json({
      user: {
        email,
        subscription: savedUser.subscription,
      },
    });
  } catch (error) {
      if (error.message.includes("E11000 duplicate key error")) {
        return next(HttpError(409, "User with this email already exists"));
      }
    next(error);
  }
}

module.exports = {
  signup,
};