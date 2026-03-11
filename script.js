import { prisma } from "./lib/prisma.js";
import {createFile}  from "./db/prismaOperations.js";
import {createFolder}  from "./db/prismaOperations.js";

createFolder("Default")
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })

createFile("test", 1)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })