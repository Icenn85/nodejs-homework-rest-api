const { HttpError } = require("../helpers/index");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const { JWT_SECRET } = process.env;

function validateBody(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(HttpError(400, error.message));
        }
    return next();
  };
}

async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
      return next(HttpError(401, "Not authorized"));
    }

    if (!token) {
      return next(HttpError(401, "Not authorized"));
    }

    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next(HttpError(401, "Not authorized"));
    }
    return next(error);
  }
  next();
    
}

module.exports = {
  validateBody,
  auth,
};
