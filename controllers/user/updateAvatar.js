const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

async function updateAvatar(req, res, next) {
    const { _id: id } = req.user;
    const { path: tempName, originalname } = req.file;
    const fileName = `${id}_${originalname}`;

    const resultUpload = path.join(avatarDir, fileName);

    try {
        await fs.rename(tempName, resultUpload);
    } catch (error) {
        await fs.unlink(tmpPath);
        return next(error);
    }

    const file = await Jimp.read(resultUpload);
    await file.resize(250, 250).writeAsync(resultUpload);

    const avatarURL = path.join("public", "avatars", fileName);
    await User.findByIdAndUpdate(id, { avatarURL }, { new: true });

  return res.json({
    user: {
      avatarURL,
    },
  });
}

module.exports = {
  updateAvatar,
};
