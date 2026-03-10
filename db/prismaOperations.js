// import { prisma } from "../lib/prisma.js";
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

module.exports={
    signupUser
}