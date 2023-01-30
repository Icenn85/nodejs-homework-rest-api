const express = require("express");
const {
  signup,
  login,
  logout,
  current,
  updateAvatar,
} = require("../../controllers");
const { validateBody, auth, upload } = require("../../middlewares");
const { addUserSchema } = require("../../schemas/userSchemas");

const authRouter = express.Router();

authRouter.post("/signup", validateBody(addUserSchema), signup);
authRouter.post("/login", validateBody(addUserSchema), login);
authRouter.get("/logout", auth, logout);
authRouter.get("/current", auth, current);
authRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = {
  authRouter,
};