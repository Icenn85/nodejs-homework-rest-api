const { HttpError } = require("../../helpers");

async function current(req, res, next) {
  try {
    const { user } = req;
    const { email, subscription } = user;

    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }

    return res.status(200).json({
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  current,
};
