const multer = require("multer");
const path = require("node:path");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 10* 1024 *1024} // 10mb
})

module.exports = upload;
