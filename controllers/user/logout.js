const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

async function logout(req, res, next) {
  try {
    const id = req.user._id;
    const user = await User.findById(id);

    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }

    const logoutUser = await User.findByIdAndUpdate(id, { token: null });
    return res.status(204).json(logoutUser);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  logout,
};
