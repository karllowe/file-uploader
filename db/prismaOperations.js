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

async function createFile(fileName, folderId) {
    const file = await prisma.files.create({
        data:{
            filename: fileName,
            folder: {
                connect: {
                    id: folderId
                }
            }
        }
    })
}

async function listFolders() {
    const folders = await prisma.folders.findMany();
    return folders
}

module.exports={
    signupUser,
    createFolder,
    createFile,
    listFolders
}