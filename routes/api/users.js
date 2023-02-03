const express = require("express");
const {
  signup,
  login,
  logout,
  current,
  updateAvatar,
  verifyEmail,
  reVerifyEmail,
} = require("../../controllers");
const { validateBody, auth, upload } = require("../../middlewares");
const {
  addUserSchema,
  userVerifyEmailSchema,
} = require("../../schemas/userSchemas");

const authRouter = express.Router();

authRouter.post("/signup", validateBody(addUserSchema), signup);
authRouter.get("/verify/:verificationToken", verifyEmail);
authRouter.post("/verify", validateBody(userVerifyEmailSchema), reVerifyEmail);
authRouter.post("/login", validateBody(addUserSchema), login);
authRouter.get("/logout", auth, logout);
authRouter.get("/current", auth, current);
authRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = {
  authRouter,
};