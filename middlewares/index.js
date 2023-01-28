const { auth } = require("./auth");
const { validateBody } = require("./validateBody");
const { upload }  = require("./upload");

module.exports = {
  validateBody,
  auth,
  upload,
};
