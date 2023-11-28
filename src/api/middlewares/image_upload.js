const multer = require("multer");
const { memoryStorage } = require("multer");

const storage = memoryStorage();
const fileFilter = function (_req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Please choose a valid image file."), false);
  }
};

const imageUpload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: fileFilter,
}).single("image");

module.exports = imageUpload;
