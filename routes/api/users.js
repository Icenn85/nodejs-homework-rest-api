const express = require("express");
const { signup, login, logout, current } = require("../../controllers");
const {
    validateBody,
    auth,
} = require("../../middlewares");
const { addUserSchema } = require("../../schemas/userSchemas");

const authRouter = express.Router();

authRouter.post("/signup", validateBody(addUserSchema), signup);
authRouter.post("/login", validateBody(addUserSchema), login);
authRouter.get("/logout", auth, logout);
authRouter.get("/current", auth, current);

module.exports = {
  authRouter,
};