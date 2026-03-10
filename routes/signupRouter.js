const {Router} = require("express");
const signupRouter = Router();
const signupController = require("../controllers/signupController")

signupRouter.get("/", signupController.signupForm);
signupRouter.post("/", signupController.signUpUser);

module.exports = signupRouter;