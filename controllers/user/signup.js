const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/index");
const bcrypt = require("bcrypt");

async function signup(req, res, next) {
  try {
      const { email, password } = req.body;
      const salt = await bcrypt.genSalt();

  
    return res.status(201).json(updatedStatusContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
};