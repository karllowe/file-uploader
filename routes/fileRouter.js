const {Router} = require("express");
const fileRouter = Router();
const upload = require("../config/upload");
const fileController = require("../controllers/fileController");
const isAuth = require("../config/authMiddleware").isAuth;

fileRouter.get("/", isAuth, fileController.loadFilesPage);
fileRouter.get("/:folderId", isAuth, fileController.loadFilesPage);
fileRouter.post("/:folderId", upload.single("file"), fileController.uploadFile);
fileRouter.get("/download/:fileId", isAuth, fileController.downloadFile);
fileRouter.get("/newFolder/:folderId", fileController.newFolder);

module.exports = fileRouter;