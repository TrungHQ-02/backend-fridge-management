const auth = require("./auth/check-auth.js");
const authority = require("./auth/check-authority.js");
const imageUpload = require("./image_upload.js");

module.exports = {
  auth,
  imageUpload,
  authority,
};
