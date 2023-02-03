const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

async function verifyEmail(req, res, next) {
    try {
        const { verificationToken } = req.params;
        const user = await User.findOne({ verificationToken });
        if (!user) {
        return next(HttpError(404, "User not found"));
        }
        await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: null,
        });
        return res.status(200).json({ message: "Verification successful" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
  verifyEmail,
};
