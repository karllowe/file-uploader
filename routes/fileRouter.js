const {Router} = require("express");
const fileRouter = Router();

const upload = require("../config/upload");
const fileController = require("../controllers/fileController")

fileRouter.post("/", upload.single("file"), fileController.uploadFile);

module.exports = fileRouter;