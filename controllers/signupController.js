const prisma = require("../db/prismaOperations");
const bcrypt = require("bcryptjs");

async function signupForm(req, res) {
    res.render("signup", {errors: [], values: {}})
}

async function signUpUser(req, res) {
    const name = `${req.body.first_name} ${req.body.last_name}`;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password,10);

    await prisma.signupUser(name, email, password);
    res.redirect("/")
}

module.exports ={
    signupForm,
    signUpUser
}