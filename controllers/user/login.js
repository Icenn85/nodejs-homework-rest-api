const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/index");
const bcrypt = require("bcrypt");

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
      
        const storedUser = await User.findOne({
            email,
        });
    
        if (!storedUser) {
            return next(HttpError(401, "Email or password is wrong"));
        }
    
        const isPasswordValid = await bcrypt.compare(password, storedUser.password);

        if (!isPasswordValid) {
            return next(HttpError(401, "Email or password is wrong"));
        }
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
  login,
};