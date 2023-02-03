const { User } = require("../../models/user");
const { HttpError, sendMail } = require("../../helpers");

async function reVerifyEmail(req, res, next) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return next(HttpError(404, "User not found"));
        }

        if (user.verify) {
            return next(HttpError(400, "Verification has already been passed"));
        }

        const { verificationToken } = user;
        await sendMail({
            to: email,
            subject: "Please confirm your email",
            html: `<a target="_blank" href="localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
        });
        return res.status(200).json({
            message: "Verification email sent",
        });
    } catch (error) {
        next(error);
    }
} 

module.exports = { reVerifyEmail };
