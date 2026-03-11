const db = require("../db/prismaOperations");


async function getAllFiles() {
    const folders = await db.listFolders();
    return folders
}

async function loadFilesPage(req, res) {
    const folderId = req.params.folderId ? Number(req.params.folderId) : null;
    const folderInfo = await db.getFolderInfo(folderId);
    const {folders, files} = await db.getFolderContents(folderId);
    res.render("filesPage", {
        folderId, 
        folderInfo,
        folders, 
        files
    })
}

async function uploadFile(req, res, next) {
    const folderId = req.params.folderId ? Number(req.params.folderId) : null;
    const fileName = req.file.originalname;
    console.log(fileName);
    await db.createFile(fileName, folderId);
    res.redirect("/filesPage/1")

    // try {
    //     console.log(req.file, req.body);
    //     res.status(200).json({
    //         message: "File received",
    //         file: req.file,
    //         body: req.body,
    //     });
    // } catch (err) {
    //     next(err)
    // }
}
    

module.exports = {
        uploadFile,
        getAllFiles,
        loadFilesPage
    };