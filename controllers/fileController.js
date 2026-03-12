const path = require("node:path");
const crypto = require("node:crypto");
const supabase = require("../config/supabase");
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
    try {
        const folderId = req.params.folderId ? Number(req.params.folderId) : null;

        if (!req.file) {
            return res.status(400).send("No file uploaded")
        };

        const fileName = req.file.originalname;
        const ext = path.extname(fileName);
        const mimeType = req.file.mimetype;

        const unique = crypto.randomUUID();
        const bucket = process.env.SUPABASE_BUCKET;
        const objectPath = `${req.user.id}/${folderId ?? "root"}/${unique}${ext}`;

        // supabase upload
        const {data, error} = await supabase.storage
            .from(bucket)
            .upload(objectPath, req.file.buffer, {
                contentType: mimeType,
                upsert: false,
            });
        if (error) throw error;

        // prisma update
        await db.createFile(
            fileName,
            folderId,
            bucket,
            data.path,
            mimeType,
            req.file.size
        )

        res.redirect(folderId? `/filesPage/${folderId}` : "/filesPage");
    } catch (err) {
        next (err)
    }
}

async function downloadFile(req, res, next) {
    try{
        const fileId = Number(req.params.fileId);
        const file = await db.getFileById(fileId);

        if (!file) return res.status(400).send("Not found");

        const {data, error} = await supabase.storage
            .from(file.bucket)
            .createSignedUrl(file.storagePath, 60, {
                download: file.filename || true
            });

        if (error) throw error;

        return res.redirect(data.signedUrl)
    } catch (err) {
        next(err)
    }
}


async function newFolder(req, res) {
    const folderId = req.params.folderId ? Number(req.params.folderId) : null;
    await db.createFolder("New folder", folderId);
    res.redirect(`/filesPage/${folderId}`)
}
    
module.exports = {
        uploadFile,
        getAllFiles,
        loadFilesPage,
        newFolder,
        downloadFile
    };