const { User } = require("../../models/user");
const { HttpError, sendMail } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    await sendMail({
      to: email,
      subject: "Please confirm your email",
      html: `<a target="_blank" href="localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
    });

    return res.status(201).json({
      user: {
        email,
        subscription: savedUser.subscription,
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return next(HttpError(409, "Email in use"));
    }
    next(error);
  }
}

module.exports = {
  signup,
};
