const { storage } = require("../config/supabase.js");
const {prisma} = require("../lib/prisma.js");

async function signupUser(name, email, password) {
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password
    }
  });
}

async function createFolder(folderName, folderParentId){
    const folder = await prisma.folders.create({
        data: {
            name: folderName,
            parentId: folderParentId
        }
    })
}

async function createFile(fileName, folderId, bucket, storagePath, mimeType, size) {
    const file = await prisma.files.create({
        data:{
            filename: fileName,
            folder: {
                connect: {
                    id: folderId
                }
            },
            bucket: bucket,
            storagePath: storagePath,
            mimeType: mimeType,
            size: size
        }
    })
}

async function listFolders() {
    const folders = await prisma.folders.findMany();
    return folders
}

async function getFolderContents(folderId) {
    const folders = await prisma.folders.findMany({
        where: {parentId: folderId},
        orderBy: {name: "asc"},
    })

    const files = await prisma.files.findMany({
        where: {folderId: folderId},
        orderBy: {filename: "asc"},
    });

    return {folders, files}
}

async function getFolderInfo(folderId) {
    const folder = await prisma.folders.findUnique({
        where: {id: folderId}
    })
    return folder
}

async function getFileById(fileId) {
    const file = await prisma.files.findUnique({
        where: {id: fileId}
    })
    return file
}


module.exports={
    signupUser,
    createFolder,
    createFile,
    listFolders,
    getFolderContents,
    getFolderInfo,
    getFileById
}