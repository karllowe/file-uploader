const multer = require("multer");
const path = require("node:path");

const upload = multer({
  dest: path.join(__dirname, "..", "public", "data", "uploads"),
});

module.exports = upload;
