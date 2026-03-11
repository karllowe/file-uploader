const {Router} = require("express");
const loginRouter = Router();
const loginController = require("../controllers/loginController");

loginRouter.post("/", loginController.loginUser);
loginRouter.get("/logout", loginController.logoutUser);

module.exports = loginRouter;